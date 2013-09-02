KISSY.add('components/custom_helper/index', function(S, Pagelet){
	var helper = {}, $ = S.all;

	var BlankView = function (){
        BlankView.superclass.constructor.apply(this, arguments);
    };

    S.extend(BlankView, Brick, {});
    
    
    return helper;

},{requires:['brix/core/pagelet']});