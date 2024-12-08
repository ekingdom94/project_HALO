$(function () {

  // .submenu & .sub_box slideDown
  function handleMenuInteraction() {
    if (window.matchMedia("(min-width: 1440px)").matches) {
      // 화면 크기가 1440px 이상일 때 실행
      $('.menu>ul>li').mouseover(function () {
        $('.submenu').stop().slideDown(200);
        $('.sub_box').stop().slideDown(200);
      }).mouseout(function () {
        $('.submenu').stop().slideUp(200);
        $('.sub_box').stop().slideUp(200);
      });

    } else {
      // 1440px 미만일 경우 기존 이벤트 제거 (옵션)
      $('.menu>ul>li').off('mouseover mouseout');
    }
  }

  // 초기 로드 시 실행
  handleMenuInteraction();

  // 창 크기 변경 시 재실행
  $(window).resize(function () {
    handleMenuInteraction();
  });

  // 메인탑 이미지 변경
  $('#img_box>ul>li:nth-child(1)').click(function () {
    $('#main_top').css('background-image', $(this).css('background-image'));
  })
  $('#img_box>ul>li:nth-child(2)').click(function () {
    $('#main_top').css('background-image', $(this).css('background-image'));
  })
  $('#img_box>ul>li:nth-child(3)').click(function () {
    $('#main_top').css('background-image', $(this).css('background-image'));
  })
})


// 마우스 확대 박스 스크립트

function imgZoom() {
  const imgZoomBox = $('.img_zoom_box'); // 확대 박스
  const imgZoomImgBox = $('#main_top'); // 이미지 영역

  // #main_top에 마우스 이벤트 설정
  imgZoomImgBox.on('mousemove', function (e) {
    const imgZoomBackgroundImage = $('#main_top').css('background-image'); // #main_top의 배경 이미지 가져오기

    // 확대 박스 표시 및 스타일 업데이트
    imgZoomBox.css({
      display: 'block',
      backgroundImage: imgZoomBackgroundImage,
      backgroundSize: '5500px', // 확대 비율, 배경 이미지 크기
    });

    // 마우스 위치 계산
    const imgZoomOffsetX = e.pageX - imgZoomImgBox.offset().left - 16;
    const imgZoomOffsetY = e.pageY - imgZoomImgBox.offset().top - 30;

    // 확대 박스 위치 및 배경 이미지의 확대된 부분 위치 조정
    imgZoomBox.css({
      left: e.pageX + 16 + 'px', // 마우스 오른쪽 16px
      top: e.pageY - 170 + 'px',  // 마우스 아래쪽 16px
      backgroundPosition: `-${(imgZoomOffsetX / imgZoomImgBox.width()) * 5500}px -${((imgZoomOffsetY / imgZoomImgBox.height()) * 5500) - 600}px`, // 확대된 배경 이미지 위치
    });
  });

  // 마우스가 #main_top을 벗어나면 확대 박스 숨김
  imgZoomImgBox.on('mouseleave', function () {
    imgZoomBox.css('display', 'none');
  });

}

imgZoom();

$(window).on('resize', function () {
  if (window.matchMedia("(min-width: 1440px)").matches) {
    imgZoom();
  } else {
    $('#main_top').off('mousemove');
  }
});








$(function () {
  $("#product_img .button button").click(function () {
    const imgContainer = $("#product_img .img");
    const imgWrap = $("#product_img .img .img_wrap");

    if ($(this).text() === "상품 정보 접기") {
      // 원래 상태로 돌아가기
      imgContainer.css({
        height: "0",
        "padding-top": "112%",
        position: "relative",
      });
      imgWrap.css({
        height: "",
        position: "absolute",
      });
      $(this).text("상품 정보 더보기");
      $(this).css('box-shadow', '0 0 80px 100px #fff')
    } else {
      // 접힌 상태로 변경
      imgContainer.css({
        height: "fit-content",
        "padding-top": "0",
        position: "static",
      });
      imgWrap.css({
        height: "fit-content",
        position: "static",
      });
      $(this).text("상품 정보 접기");
      $(this).css('box-shadow', 'none')
    }
  });
});





// 질문 접기 펴기
$(function () {
  $('#question .box .button').click(function () {
    // 현재 클릭된 버튼과 연결된 요소
    const content = $(this).next('p'); // 바로 다음 p 태그
    const icon = $(this).find('img'); // 현재 버튼의 img 태그

    if (content.is(':visible')) {
      // 내용이 보이는 경우: 숨기기
      content.slideUp();
      icon.css('transform', 'rotate(180deg)'); // 화살표 반대방향
    } else {
      // 내용이 보이지 않는 경우: 열기
      content.slideDown();
      icon.css('transform', 'rotate(0deg)'); // 화살표 원래 방향
    }
  });
});





$(function () {
  // 탑메뉴 클릭하면 페이지 이동
  $('#top_menu a').click(function (event) {
    event.preventDefault(); // 기본 클릭 동작 방지
    let target = $(this).attr('href'); // 클릭된 링크의 href 값을 가져옴
    let offset = $(target).offset().top - 100; // 대상 위치에서 90px 위로 계산

    // 스크롤 이동
    $('html, body').animate({
      scrollTop: offset
    }, 500); // 500ms 동안 부드럽게 스크롤
  });
})





// 반응형
$(document).ready(function () {
  // 화면 크기가 479px 이하일 때
  function checkScreenSize() {
    if ($(window).width() <= 479) {
      $('.submenu2 > li').hide();
      $('#footer_top').css('height', '100px')
    }
    else {
      $('.submenu2 > li').show();
      $('#footer_top').css('height', '360px')
    }
  }

  $('#footer_top li').click(function () {
    if ($('.submenu2 > li').hide()) {
      $('#footer_top').css('height', '360px')
      $('.submenu2 li').stop().slideDown();
    }
    else if ($('.submenu2 > li').show()) {
      $('#footer_top').css('height', '0')
      $('.submenu2 li').stop().sliedUp();
    }


  })



  // 페이지 로드 시 크기 체크
  checkScreenSize();

  // 윈도우 크기 변경 시 체크
  $(window).resize(function () {
    checkScreenSize();
  });

  // .submenu & .sub_box slideDown
  function handleMenuInteraction() {
    if (window.matchMedia("(min-width: 1440px)").matches) {
      // 화면 크기가 1440px 이상일 때 실행
      $('.menu>ul>li').mouseover(function () {
        $('.submenu').stop().slideDown();
        $('.sub_box').stop().slideDown();
      }).mouseout(function () {
        $('.submenu').stop().slideUp();
        $('.sub_box').stop().slideUp();
      });
    } else {
      // 1440px 미만일 경우 기존 이벤트 제거 (옵션)
      $('.menu>ul>li').off('mouseover mouseout');
    }
  }


});
