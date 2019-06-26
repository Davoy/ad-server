$(()=>{
    $('.currentTab').text('Home');
    $('a.nav-link').on('click', onChangeTab);
    $('a.nav-link').css('cursor', 'pointer');

    // Functions 
    function onChangeTab(){
        $('a.nav-link').removeClass('active').addClass('text-light');
        $(this).addClass('active').removeClass('text-light');
        $('.currentTab').text($(this).text());
        activeTab = $(this).text().toLowerCase();
        $(`.${activeTab}`).hasClass('d-none') ? changeTabs(activeTab):null;
    }

    function changeTabs(activeTab){
        $('.tabs').addClass('d-none');
        $(`.${activeTab}`).removeClass('d-none');
    }
});
