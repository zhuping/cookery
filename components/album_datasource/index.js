KISSY.add('components/album_datasource/index', function(S, Pagelet, Brick, IO){
    var ds = {}, $ = S.all;
    
    var user = ['贾克斯L','sandy_猫猫','NatcolFeng','妖妖不怪','猫爱shu'];
    var info = {};

    ds.data = function(){
        IO({
            dataType: 'jsonp',
            url: 'https://api.weibo.com/2/statuses/timeline_batch.json',
            data: {
                'source': '2866968258',
                'screen_names': user.join(','),
                'count': user.length
            },
            jsonpCallback: 'jsoncallback',
            success: function(result){
                var statuses = result.data.statuses;
                // result.data.statuses[0].id
                // console.log(result.data.statuses[0].user.avatar_large);

            }
        });
    }
    
    return ds;

},{requires:['brix/core/pagelet','brix/core/brick','ajax']});