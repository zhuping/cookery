KISSY.add('components/custom_helper/index', function(S, Pagelet, Brick){
	var helper = {}, $ = S.all;

    helper.getCorner = function(content){
        var center = {};

        center.w = content.innerWidth();
        center.h = content.innerHeight();
        center.x = content.offset().left;
        center.y = content.offset().top;

        return center;
    }

    helper.randomPos = function(){
        var content = $('#J_pool');
        var center = helper.getCorner(content);
        var pos = {};
        var random = Math.random();

        pos.left = Math.floor(random*center.w + 1) + center.x;
        pos.top = Math.floor(random*center.h + 1) + center.y;

        // (100,100) is clone node size
        pos.left = pos.left + 100 > center.x + center.w ? center.x + center.w - 100 : pos.left;
        pos.top = pos.top + 100 > center.y + center.h ? center.y + center.h - 100 : pos.top;

        return pos;
    }

    helper.addAnim = function(startPlace, data){
        var sOffset = startPlace.offset();
        var pos = helper.randomPos();

        var src = data.avatar;
        var uid = data.uid;
        var cloneNode = S.one('<li class="src_node">' + 
        		'<span style="background:url(' + src + ') center center;background-size:100px 100px;" data-uid="' + uid + '" class="avatar"></span>' + 
        		'<i class="iconfont delete">&#356</i>' + 
        	'</li>');

        cloneNode.css({
            'position': 'absolute',
            'top': sOffset.top,
            'left': sOffset.left,
            'z-index': '99'
        });
        S.one('body').append(cloneNode);
        cloneNode.animate({
            'left': pos.left,
            'top': pos.top,
            'width': '100px',
            'height': '100px'
            }, 0.7, 'backOut', function(){
                cloneNode.remove();
            	$('#J_pool').append(cloneNode);
            }
        );
        
    };
    
    return helper;

},{requires:['brix/core/pagelet','brix/core/brick',]});