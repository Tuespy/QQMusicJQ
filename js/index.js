$(function(){
    // 0. 自定义滚动条
    $(".content_list").mCustomScrollbar(); 
    //1. 监听歌曲的移入移出事件
    $(".list_music").hover(function(){
        //显示子菜单
        // $(".list_menu").stop().fadeIn();
        $(this).find(".list_menu").stop().fadeIn(100);
        //隐藏时长
        $(this).find(".list_time span").stop().fadeOut(0);
        $(this).find(".list_time a").stop().fadeIn(100);
    },function(){
        //隐藏子菜单
        $(this).find(".list_menu").stop().fadeOut(100);
        // 显示时长
        $(this).find(".list_time span").stop().fadeIn(0);
        $(this).find(".list_time a").stop().fadeOut(100);
    });
    $(".list_check").click(function(){
        // alert("abc");
        $(this).toggleClass("list_checked");
    });
    getPlayerList();
    function getPlayerList(){
        $.ajax({
            url:'./source/musiclist.json',
            dataType:"json",
            success:function(data){
                //3.1 遍历获取到的数据,创建每一条音乐
                console.log(data);
            },
            error: function(e){
                console.log(e);
            }
        });
    }
});