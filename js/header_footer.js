$(function () {
  // .submenu & .sub_box slideDown
  $('.menu>ul>li').mouseover(function () {
    $('.submenu').stop().slideDown(200);
    $('.sub_box').stop().slideDown(200);
    $(this).find('a').addClass('active')
  }).mouseout(function () {
    $('.submenu').stop().slideUp(200);
    $('.sub_box').stop().slideUp(200);
    $(this).find('a').removeClass('active')
  })


  function handleMenuInteraction() {
    if (window.matchMedia("(min-width: 1440px)").matches) {
      // 1440px 이상: 이벤트 추가
      $('.menu>ul>li').off('mouseover mouseout').on('mouseover', function () {
        $('.submenu').stop().slideDown(200);
        $('.sub_box').stop().slideDown(200);
        $(this).find('a').addClass('active');
      }).on('mouseout', function () {
        $('.submenu').stop().slideUp(200);
        $('.sub_box').stop().slideUp(200);
        $(this).find('a').removeClass('active');
      });
    } else {
      // 1440px 미만: 이벤트 제거
      $('.menu>ul>li').off('mouseover mouseout');
      $('.nav .bottomnav .menu > .mainmenu > li > a').on('click', function () {
        $(this).addClass('active').closest('li').siblings().find('a').removeClass('active');
      });
    }
  }

  // 초기화 및 화면 크기 변경 시 호출
  $(window).on('resize', handleMenuInteraction);
  handleMenuInteraction(); // 초기화



}) 