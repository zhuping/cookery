KISSY.add('components/album_luck/index', function(S, Node, Brick, Helpers) {
    var $ = Node.all;

    function r(from, to) {
        from = from || 0;
        to = to || 1;
        return Math.floor(Math.random() * (to - from + 1) + from);
    }

    function getOffset(a, b) {
        return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
    }

    function isOverlap(a, b) {
        return getOffset(a, b) <= (a.width + b.width) / 2;
    }

    function hit(a, b) {
        var yOffset = b.y - a.y;
        var xOffset = b.x - a.x;

        var offset = getOffset(a, b);

        var power = Math.ceil(((a.width + b.width) / 2 - offset) / RIGIDITY);
        var yStep = yOffset > 0 ? Math.ceil(power * yOffset / offset) : Math.floor(power * yOffset / offset);
        var xStep = xOffset > 0 ? Math.ceil(power * xOffset / offset) : Math.floor(power * xOffset / offset);

        if (a.lucky) {
            b._xMove += xStep * 2;
            b._yMove += yStep * 2;
        } else if (b.lucky) {
            a._xMove += xStep * -2;
            a._yMove += yStep * -2;
        } else {
            a._yMove += -2 * yStep;
            b._yMove += yStep;

            a._xMove += -2 * xStep;
            b._xMove += xStep;
        }
    }


    var CANVAS_HEIGHT = 300;
    var CANVAS_WIDTH = 980;

    var BALL_WIDTH = 100;
    var BALL_HEIGHT = 100;
    var LUCKY_BALL_WIDTH = 180;
    var LUCKY_BALL_HEIGHT = 180;
    var MAX_ZINDEX = 3000;

    var DURATION_MIN = 100;
    var DURATION_MAX = 500;
    var ZOOM_DURATION = 0.5;
    var HIT_SPEED = 100;

    var RIGIDITY = 4; // 弹性系数：2 -钢球 4 - 橡胶球，越大越软，建议小于 10

    function User(el, options, i) {
        this.options = options;
        this.x = 0;
        this.y = 0;
        this.width = BALL_WIDTH;
        this.height = BALL_HEIGHT;
        this.moving = false;
        this.lucky = false;
        this.zooming = false;
        this.el = el;
        this.zIndex = r(0, MAX_ZINDEX);
        this.reflow();
    }

    User.prototype.move = function(callback) {
        this.left = r(0, CANVAS_WIDTH - BALL_WIDTH);
        this.top = r(0, CANVAS_HEIGHT - BALL_HEIGHT);
        this.zIndex = r(0, MAX_ZINDEX);
        this.reflow(callback);
    }

    User.prototype.reflow = function(callback, direct) {
        this.x = this.left + this.width / 2;
        this.y = this.top + this.height / 2;
        this.el.css('z-index', this.zIndex);
        this.el.animate({
            'left': this.left,
            'top': this.top
        }, r(DURATION_MIN, DURATION_MAX) / 1000, 'easeOutBack', callback);
    }

    User.prototype.start = function() {
        this.reset();
        this.moving = true;
        this.autoMove();
    }

    User.prototype.reset = function() {
        this.el.stop(true, true);
        this.zooming = false;
        this.lucky = false;

        this.el.removeClass('selected');
        // this.el.css({
        //     width: BALL_WIDTH,
        //     height: BALL_HEIGHT
        // });

        this._maxTop = CANVAS_HEIGHT - BALL_HEIGHT;
        this._maxLeft = CANVAS_WIDTH - BALL_WIDTH;
    }

    User.prototype.autoMove = function() {
        var that = this;
        if (this.moving) {
            this.move(function() {
                that.autoMove();
            });
        }
    }

    User.prototype.stop = function() {
        this.el.stop(true, true);
        this.moving = false;
    }

    User.prototype.bang = function() {
        var that = this;
        this.lucky = true;
        this.el.addClass('selected');
        this.el.one('span').css('background-size','180px');
        this.left = (CANVAS_WIDTH - LUCKY_BALL_WIDTH) / 2;
        this.top = (CANVAS_HEIGHT - LUCKY_BALL_HEIGHT) / 2;
        this.width = LUCKY_BALL_WIDTH;
        this.height = LUCKY_BALL_HEIGHT;

        this.zooming = true
        this.el.animate({
            'left': this.left,
            'top': this.top
        }, ZOOM_DURATION, function() {
            that.zooming = false;
        })
    }

    User.prototype.beginHit = function() {
        this._xMove = 0;
        this._yMove = 0;
    }

    User.prototype.hitMove = function() {
        this.left += this._xMove;
        this.top += this._yMove;
        this.top = this.top < 0 ? 0 : (this.top > this._maxTop ? this._maxTop : this.top);
        this.left = this.left < 0 ? 0 : (this.left > this._maxLeft ? this._maxLeft : this.left);
        this.reflow(null, false);
    }

    return Brick.extend({
        bindUI: function() {
            var self = this;

        },
        init: function() {
            var self = this;
            self.luckyUser = null;
            self.users = [];
            var balls = $('#J_pool').all('li');
            balls.each(function(el, i) {
                self.users.push(new User(el, balls[i], i));
            })
        },
        start: function() {
            this.init();
            this.timer && clearTimeout(this.timer);
            this.users.forEach(function(user) {
                user.start();
            })
        },
        _start: function() {
            var self = this;
            var ul = $('.animate-balls').one('ul');
            ul.animate({
                'left': -306
            }, 0.2, 'easeNone', function() {
                ul.one('li').appendTo('.balls');
                ul.css({
                    left: 0
                });
                var el = self.users[self.i].el;
                el.attr('style', '');
                el.appendTo(ul);
                self._start();
                if (self.i < self.users.length - 1) {
                    self.i += 1;
                } else {
                    self.i = 0;
                }
            });
        },
        stop: function() {
            var users = this.users;
            if (users.length < 1) {
                return;
            }
            var z = 0,
                lucky = users[0];

            users.forEach(function(user) {
                user.stop();
                if (z < user.zIndex) {
                    lucky = user;
                    z = user.zIndex;
                }
            });
            lucky.bang();
            this.hit();
            this.luckyUser = lucky;
        },
        removeItem: function(item) {
            for (var i = 0; i < this.users.length; i++) {
                var user = this.users[i];
                if (user === item) {
                    this.users.splice(i, 1);
                }
            }
        },
        moveLucky: function() {
            var luckyUser = this.luckyUser;
            if (luckyUser) {
                var el = luckyUser.el;
                var name = el.attr('data-name');
                var avatar = el.attr('data-avatar');
                var cloneNode = Node('<li>' + 
                    '<div class="avatar" style="background: url('+ avatar + ') center center">' + 
                        '<div class="ch-info-wrap">' + 
                            '<div class="ch-info">' + 
                                '<div class="ch-info-front" style="background: url(' + avatar + ') center center #f9f9f9"></div>' + 
                                    '<div class="ch-info-back">' + 
                                        '<h3>' + name + '</h3>' + 
                                    '</div>' + 
                                '</div>' + 
                            '</div>' + 
                        '</div>' + 
                    '</li>');

                luckyUser.el.remove();
                cloneNode.prependTo('#J_area');
                this.removeItem(luckyUser);

                this.luckyUser = null;
            }
        },
        hit: function() {
            var that = this;
            var hitCount = 0;
            var users = this.users;

            users.forEach(function(user) {
                user.beginHit();
            })

            for (var i = 0; i < users.length; i++) {
                for (var j = i + 1; j < users.length; j++) {
                    if (isOverlap(users[i], users[j])) {
                        hit(users[i], users[j]);
                        hitCount++;
                    }
                }
            }

            users.forEach(function(user) {
                user.hitMove();
            })

            if (hitCount > 0) {
                this.timer = setTimeout(function() {
                    that.hit();
                }, 500)
            }
        }
    }, {
        ATTRS: {
            
        }
    }, 'Luck');

}, {
    requires: ['node', 'brix/core/brick', 'components/custom_helper/']
});