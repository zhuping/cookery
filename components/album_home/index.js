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
            }
            // ,
            // '#J_area li' : {
            //     mouseover : function(e){
            //         var curNode = $(e.currentTarget);
            //         curNode.one('.delete').css('display','block');
            //     },
            //     mouseout : function(e){
            //         var curNode = $(e.currentTarget);
            //         curNode.one('.delete').css('display','none');
            //     }
            // },
            // '.delete' : {
            //     click : function(e){

            //     }
            // }
        }
    });

    return View;

 },{requires:['brix/core/brick','components/custom_helper/','components/album_datasource/']});