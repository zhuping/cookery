KISSY.add('components/album_datasource/index', function(S, Pagelet, Brick, IO, XTemplate){
    var ds = {}, $ = S.all;
    
    var user = ['贾克斯L','sandy_猫猫','NatcolFeng','妖妖不怪','猫爱shu'];
    var info = [];

    ds.getUser = function() {
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
                for(var i=0; i<statuses.length; i++) {
                    info[i] = {
                        id: statuses[i].id,
                        nick: statuses[i].user.name,
                        avatar: statuses[i].user.avatar_large,
                        profile_url: statuses[i].user.profile_url
                    }
                }
                ds.render(info);
            }
        });
        // for(var i=0; i<user.length; i++) {
        //     (function(i){
        //         IO({
        //             dataType: 'jsonp',
        //             url: 'https://api.weibo.com/2/users/show.json',
        //             data: {
        //                 'source': '2866968258',
        //                 'screen_name': user[i]
        //             },
        //             success: function(result){
        //                 var data = result.data;
        //                 info[i] = {
        //                     id: data.id,
        //                     nick: data.name,
        //                     avatar: data.avatar_hd,
        //                     domain: data.domain ? data.domain : data.id
        //                 };
        //                 console.log(info);
        //             }
        //         });
        //     })(i)
        // }
    }

    ds.render = function(user) {
        var tpl = '{{#each data}}<li data-avatar="{{avatar}}" data-uid="{{id}}">' + 
                '<div class="avatar" style="background: url({{avatar}}) center center">' + 
                    '<div class="ch-info-wrap">' + 
                        '<div class="ch-info">' + 
                            '<div class="ch-info-front" style="background: url({{avatar}}) center center"></div>' + 
                                '<div class="ch-info-back">' + 
                                    '<h3><a href="http://weibo.com/{{profile_url}}" target="_blank">{{nick}}</a></h3>' + 
                                '</div>' + 
                            '</div>' + 
                        '</div>' + 
                    '</div>' + 
                '</li>{{/each}}';

        var data = {
            data : user
        };
        var render = new XTemplate(tpl).render(data);
        $('#J_list').html(render);
    }
    
    return ds;

},{requires:['brix/core/pagelet','brix/core/brick','ajax','xtemplate']});