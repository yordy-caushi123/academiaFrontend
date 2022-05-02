$(document).ready(function(){
    $('li.menu').click(function(){
        $('ul.submenu').slideUp('normal');
        $(this).next().slideDown('normal');
    });
    $("ul.submenu").hide();
});