KISSY.add('components/custom_helper/index', function(S, Pagelet, Brick){
	var helper = {}, $ = S.all;

    helper.addAnim = function(startPlace, data){
        var endPlace;
        var endPlaceLeft;
        var sOffset = startPlace.offset();

        if ($('#J_area').all('li').length > 0) {
        	endPlace = $('#J_area').last();
        	endPlaceLeft = endPlace.offset().left + 110;
        } else {
        	endPlace = $('#J_area');
        	endPlaceLeft = endPlace.offset().left;
        }

        var src = data.avatar;
        var uid = data.uid;
        var cloneNode = S.one('<li class="src_node">' + 
        		'<span style="background:url(' + src + ') center center;" data-uid="' + uid + '" class="avatar"></span>' + 
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
            'left': endPlaceLeft,
            'top': endPlace.offset().top,
            'width': '100px',
            'height': '100px'
            }, 0.7, 'backOut', function(){
                cloneNode.remove();
            	$('#J_area').append(cloneNode);
            }
        );
        // helper.addShoppingCar(startPlace);
        
    };
    
    return helper;

},{requires:['brix/core/pagelet','brix/core/brick',]});