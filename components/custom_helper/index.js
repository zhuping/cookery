KISSY.add('components/custom_helper/index', function(S, Pagelet, Brick){
	var helper = {}, $ = S.all;

    helper.getCorner = function(content){
        var center = {};

        center.w = content.innerWidth();
        center.h = content.innerHeight();
        center.x = content.offset().left;
        center.y = content.offset().top;

        return center;
    };

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
    };

    helper.addAnim = function(startPlace, data){
        var sOffset = startPlace.offset();
        var pos = helper.randomPos();

        var name = data.name;
        var avatar = data.avatar;
        var cloneNode = S.one('<li class="src_node" data-avatar="' + avatar +'" data-name="' + name + '">' + 
        		'<span style="background:url(' + avatar + ') center center;background-size:100px 100px;" class="avatar"></span>' + 
        		'<i class="iconfont delete">&#356</i>' + 
        	'</li>');

        cloneNode.css({
            'position': 'absolute',
            'top': sOffset.top,
            'left': sOffset.left
        });
        S.one('body').append(cloneNode);
        cloneNode.animate({
            'left': pos.left,
            'top': pos.top
            }, 0.7, 'backOut', function(){
                helper.append(cloneNode, pos);
            }
        );
    };

    helper.append = function(node, pos) {
        var content = $('#J_pool');
        var center = helper.getCorner(content);
        node.css({'left':pos.left - center.x,'top':pos.top - center.y});
        $('#J_pool').append(node);
    };
    
    return helper;

},{requires:['brix/core/pagelet','brix/core/brick',]});