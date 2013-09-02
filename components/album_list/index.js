 KISSY.add('components/album_list/index', function(S, Brick ,Helper){
    var $ = S.all;

    var View = Brick.extend({
        bindUI : function(){
            var self = this;

        }

    },{
        ATTRS : {
            
        },
        EVENTS : {
            '#J_list li' : {
                click : function(e){
                    var curNode = $(e.currentTarget);
                    curNode.animate({opacity:0}, 1, 'backOut', function(){
                        curNode.remove();
                    });
                }
            }
        }
    });

    return View;

 },{requires:['brix/core/brick','components/helper/']});