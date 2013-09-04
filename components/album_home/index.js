 KISSY.add('components/album_home/index', function(S, Brick ,Helper, DS){
    var $ = S.all;

    var View = Brick.extend({
        bindUI : function(){
            var self = this;

            DS.getUser();
        }

    },{
        ATTRS : {
            
        },
        EVENTS : {
            '#J_list li' : {
                click : function(e){
                    var curNode = $(e.currentTarget);
                    var data = {
                        avatar: curNode.attr('data-avatar'),
                        uid: curNode.attr('data-uid')
                    };
                    Helper.addAnim(curNode, data);
                    curNode.animate({opacity:0}, 1, 'backOut', function(){
                        curNode.remove();
                    });
                }
            },
            '.start' : {
                click : function(e){
                    e.preventDefault();
                    var self = this; 
                    var target = S.one(e.currentTarget);
                    if(!self.isChouJiang && !target.hasClass('btn-disabled')) {
                        var Luck = self.pagelet.getBrick('J_pool');
                        self.isChouJiang = true;
                        Luck.start();
                    }
                }
            }
        }
    });

    return View;

 },{requires:['brix/core/brick','components/custom_helper/','components/album_datasource/']});