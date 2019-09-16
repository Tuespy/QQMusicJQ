$(function(){
    // 0. 自定义滚动条
    $(".content_list").mCustomScrollbar(); 
    //1. 监听歌曲的移入移出事件
    $(".content_list").delegate(".list_music","mouseenter",function(){
        //显示子菜单
        // $(".list_menu").stop().fadeIn();
        $(this).find(".list_menu").stop().fadeIn(100);
        //隐藏时长
        $(this).find(".list_time span").stop().fadeOut(0);
        $(this).find(".list_time a").stop().fadeIn(100);
    });
    $(".content_list").delegate(".list_music","mouseleave",function(){
        //隐藏子菜单
        $(this).find(".list_menu").stop().fadeOut(100);
        // 显示时长
        $(this).find(".list_time span").stop().fadeIn(0);
        $(this).find(".list_time a").stop().fadeOut(100);
    });
    // $(".list_music").hover(function(){
        
    // },function(){
        
    // });
    // 2. 添加选框元素的事件代码
    $(".content_list").delegate(".list_check","click",function(){
        $(this).toggleClass("list_checked");
    });
    // $(".list_check").click(function(){
    //     // alert("abc");
    //     $(this).toggleClass("list_checked");
    // });
    // 3. 添加子菜单播放按钮的监听事件
    $(".content_list").delegate(".list_menu_play","click",function(){
        // 3.1 切换播放按钮的图标
        $(this).toggleClass("list_menu_play2");
        // 3.2 复原其他的播放图标
        $(this).parents(".list_music").siblings().find(".list_menu_play").removeClass("list_menu_play2");
    });
    getPlayerList();
    function getPlayerList(){
        $.ajax({
            url:'./source/musiclist.json',
            dataType:"json",
            success:function(data){
                //3.1 遍历获取到的数据,创建每一条音乐
                // console.log(data);
                var $musicList = $(".content_list ul");
                $.each(data, function(index,ele){
                    var $item = createMusicItem(index,ele);
                    $musicList.append($item);
                })
            },
            error: function(e){
                console.log(e);
            }
        });
    }
    //定义一个方法 创建一条音乐
    function createMusicItem(index,music){
        var $item = $("<li class=\"list_music\">"+
        "<div class=\"list_check\"><i></i></div>"+
        "<div class=\"list_number\">"+(index+1)+"</div>"+
        "<div class=\"list_name\">"+music.name+
            "<div class=\"list_menu\">"+
                "<a href=\"javascript:;\" title=\"播放\" class=\"list_menu_play\"></a>"+
                "<a href=\"javascript:;\" title=\"添加\"></a>"+
                "<a href=\"javascript:;\" title=\"下载\"></a>"+
                "<a href=\"javascript:;\" title=\"分享\"></a>"+
            "</div>"+
        "</div>"+
        "<div class=\"list_singer\">"+music.singer+"</div>"+
        "<div class=\"list_time\">"+
            "<span>"+music.time+"</span>"+
            "<a href=\"javascript:;\" title=\"删除\"></a>"+
        "</div>"+
    "</li>");
    return $item;
    }
});