KISSY.add('components/album_list/index', function(S, Brick){
	var $ = S.all;

	var View = Brick.extend({
		bindUI : function(){
			
		}
	},{
    	ATTRS : {
            
        },
        EVENTS : {
        	'#J_list li' : {
        		click : function(e){
        			var curNode = $(e.currentTarget);
        			
        		}
        	}
        }
    });

	return View;
},{requires:['brix/core/brick']})