
// -------------------------------------------- 고정 영역

//-------------- chat_bot
$(function () {

  $('#chat_bot_btn').on('click', function () {
    $(this).toggleClass('active')
    $('#chat_bot_list_container').toggleClass('active')
    $('#chat_bot_list').toggleClass('active')
  })

  $('#chat_bot > #ad_banner > button ').on('click', function () {
    $(this).closest('#ad_banner').css({ 'display': 'none' });
  })


  //---------------- blackfriday

  // 카운트 다운 설정
  const blkDayTarget = new Date('2025-01-01T00:00:00');


  const BlkDay = document.querySelector('#blf_count>.day>span');
  const BlkHour = document.querySelector('#blf_count>.hour>span');
  const BlkMinute = document.querySelector('#blf_count>.minute>span');
  const BlkSecond = document.querySelector('#blf_count>.second>span');

  function blkCount() {
    const now = new Date();
    const timeDifference = blkDayTarget - now;

    if (timeDifference <= 0) {
      BlkDay.textContent = '00';
      BlkHour.textContent = '00';
      BlkMinute.textContent = '00';
      BlkSecond.textContent = '00';
      clearInterval(countTimer);
      return;
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDifference / 1000) % 60);

    BlkDay.textContent = days.toString().padStart(2, '0');
    BlkHour.textContent = hours.toString().padStart(2, '0');
    BlkMinute.textContent = minutes.toString().padStart(2, '0');
    BlkSecond.textContent = seconds.toString().padStart(2, '0');
  }

  const countTimer = setInterval(blkCount, 1000);
  blkCount();




  // 스크롤 스크립트 - 1440 이상의 화면에서만 작동

  function blkScorll() {
    const $window = $(window);
    const $chatBot = $('#chat_bot');
    const $blkFixedBanner = $('#blk_fixed_banner');

    function handleScroll() {
      const scrollPosition = $window.scrollTop();
      const windowHeight = $window.height();

      const sliderTop = $('#slider').offset().top;
      const sliderBottom = sliderTop + $('#slider').outerHeight() / 2;

      const footerTop = $('footer').offset().top;
      const blkFridayTop = $('#blkfriday').offset().top;

      if (sliderBottom < scrollPosition) {
        $chatBot.show();
      } else {
        $chatBot.hide();
      }

      if (
        blkFridayTop + 200 < scrollPosition &&
        scrollPosition + windowHeight < footerTop
      ) {
        $blkFixedBanner.addClass('show');
      } else {
        $blkFixedBanner.removeClass('show');
      }
    }

    if ($window.width() >= 1440) {
      $blkFixedBanner.removeClass('show'); // 이전 상태 초기화
      $window.off('scroll', handleScroll).on('scroll', handleScroll);
      handleScroll(); // 초기 상태 확인
    } else {
      $blkFixedBanner.hide();
      $blkFixedBanner.removeClass('show'); // 화면 너비가 작아질 때도 클래스 제거
      $window.off('scroll', handleScroll);
    }
  }

  // 초기화 및 반응형 대응
  $(window).on('resize', blkScorll);
  blkScorll();






})
