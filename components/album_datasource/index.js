KISSY.add('components/album_datasource/index', function(S, Pagelet, Brick, IO, XTemplate){
    var ds = {}, $ = S.all, info = [];

    ds.getUser = function() {
        // IO({
        //     dataType: 'jsonp',
        //     url: 'https://api.weibo.com/2/statuses/timeline_batch.json',
        //     data: {
        //         'source': '2866968258',
        //         'screen_names': user.join(','),
        //         'count': user.length
        //     },
        //     jsonpCallback: 'jsoncallback',
        //     success: function(result){
        //         var statuses = result.data.statuses;
        //         for(var i=0; i<statuses.length; i++) {
        //             info[i] = {
        //                 id: statuses[i].id,
        //                 nick: statuses[i].user.name,
        //                 avatar: statuses[i].user.avatar_large,
        //                 profile_url: statuses[i].user.profile_url
        //             }
        //         }
        //         ds.render(info);
        //     }
        // });
        for(var i=0; i<window.user.length; i++) {
            (function(i){
                IO({
                    dataType: 'jsonp',
                    url: 'https://api.weibo.com/2/users/show.json',
                    data: {
                        'source': '1362404091',
                        'screen_name': window.user[i].screen_name
                    },
                    success: function(result){
                        var data = result.data;
                        info[i] = {
                            avatar: data.avatar_hd,
                            profile_url: data.profile_url,
                            name: window.user[i].name
                        };
                        ds.render(info[i]);
                    }
                });
            })(i)
        }
    }

    ds.render = function(user) {
        var tpl = '{{#with data}}<li data-avatar="{{avatar}}" data-name="{{name}}">' + 
                '<div class="avatar" style="background: url({{avatar}}) center center">' + 
                    '<div class="ch-info-wrap">' + 
                        '<div class="ch-info">' + 
                            '<div class="ch-info-front" style="background: url({{avatar}}) center center #f9f9f9"></div>' + 
                                '<div class="ch-info-back">' + 
                                    '<h3>{{name}}</h3>' + 
                                '</div>' + 
                            '</div>' + 
                        '</div>' + 
                    '</div>' + 
                '</li>{{/with}}';

        var data = {
            data : user
        };
        var render = new XTemplate(tpl).render(data);
        $('#J_list').append(render);
    }
    
    return ds;

},{requires:['brix/core/pagelet','brix/core/brick','ajax','xtemplate']});