/* 전체적인 수정사항이 반영된 JavaScript 코드 */

$(function () {
  // 이미지 전환 기능
  $('.product_color a').on('mouseover', function (e) {
    e.preventDefault(); // 기본 동작 막기

    const index = $(this).data('index'); // 클릭한 요소의 data-index 값 가져오기
    const productBox = $(this).closest('.product_box'); // 현재 상품 박스

    // 이미지 표시 업데이트
    productBox.find('.product_image li').removeClass('active');
    productBox.find('.product_image li').eq(index).addClass('active');
  });

  // 각 비교 가능 카테고리 설정
  const compareRules = {
    스타일러: ['스타일러', '드라이어', '스트레이트너'],
    드라이어: ['스타일러', '드라이어', '스트레이트너'],
    스트레이트너: ['스타일러', '드라이어', '스트레이트너'],
    악세서리: ['악세서리']
  };

  $('#popup').hide(); // 초기 팝업 숨김 설정

  // 선택된 상품 정보를 담을 배열
  const selectedProducts = [];

  // 체크박스 클릭 이벤트
  $('.compare_checkbox').on('change', function () {
    const productBox = $(this).closest('.product_box');
    const productClass = $(this).data('id');
    const productData = {
      id: productClass,
      title: productBox.find('.title').text().trim(),
      rating: productBox.find('.rating').text().trim(),
      price: productBox.find('.price').text().trim(),
      imageSrc: productBox.find('.product_image li.active img').attr('src')
    };

    if ($(this).is(':checked')) {
      // 최대 4개의 상품까지만 추가
      if (selectedProducts.length < 4) {
        selectedProducts.push(productData);
      } else {
        $(this).prop('checked', false);
        alert('최대 4개의 상품만 추가할 수 있습니다.');
      }
    } else {
      // 체크박스 해제 시 상품 제거
      const index = selectedProducts.findIndex((item) => item.id === productClass);
      if (index !== -1) selectedProducts.splice(index, 1);
    }

    // 팝업 모달 업데이트
    updatePopupModal();
  });

  // 팝업 모달 업데이트 함수
  function updatePopupModal() {
    const popup = $('#popup');
    const modalContainer = popup.find('.modal-container');
    modalContainer.empty(); // 기존 모달 내용을 지움

    // 선택된 상품을 모달에 추가
    selectedProducts.forEach((product) => {
      const modal = $(
        `<div class="modal" style="flex: ${100 / selectedProducts.length}%" data-id="${product.id}">
          <img src="${product.imageSrc}" alt="${product.title}" />
          <p>${product.title}</p>
          <button class="remove-btn" data-id="${product.id}">제거</button>
        </div>`
      );
      modalContainer.append(modal);
    });

    // 팝업 표시 여부 결정
    if (selectedProducts.length > 0) {
      popup.css('display', 'grid');
    } else {
      popup.hide();
    }
  }

  // 팝업 모달 안에서 제거 버튼 클릭 시 이벤트
  $(document).on('click', '.remove-btn', function () {
    const productId = $(this).data('id');
    const index = selectedProducts.findIndex((item) => item.id === productId);
    if (index !== -1) selectedProducts.splice(index, 1);

    // 체크박스 상태 해제
    $(`.compare_checkbox[data-id="${productId}"]`).prop('checked', false);

    // 팝업 모달 업데이트
    updatePopupModal();
  });

  //---------------------------------------------------------------> 필터링 데이터 설정
  const productFilter = {
    '멀티 스타일링': ['멀티스타일러'],
    '컬 또는 웨이브': ['오리진', '멀티스타일러'],
    '스트레이트': ['스트레이트', '슈퍼소닉뉴럴'],
    '볼륨 드라이': ['코랄스트레이트너', '슈퍼소닉'],
    'i.d. curl™': ['멀티스타일러'],
    '개인 맞춤 설정': ['멀티스타일러', '슈퍼소닉', '슈퍼소닉뉴럴'],
    '두피 보호': ['슈퍼소닉뉴럴', '슈퍼소닉'],
    '스마트 스타일링 툴': ['멀티스타일러', '슈퍼소닉뉴럴', '슈퍼소닉'],
    '앱 연결': ['멀티스타일러'],
    '열 손상 방지': ['멀티스타일러', '슈퍼소닉뉴럴', '슈퍼소닉', '스트레이트너', '오리진'],
    '음이온': ['멀티스타일러', '슈퍼소닉뉴럴', '슈퍼소닉', '스트레이트너', '오리진'],
    '일시 정지 감지': ['슈퍼소닉뉴럴', '슈퍼소닉'],
    '코안다 효과': ['멀티스타일러', '스트레이트너'],
    '무선 사용': ['스트레이트']
  };

  //-----------------------------------------------> 필터링 로직
  function filterProducts() {
    // 선택된 헤어 스타일 필터 값들 가져오기
    const selectedHairStyles = $('input[name="hair-style"]:checked').map(function () {
      return $(this).val().trim();
    }).get();

    // 선택된 기능 필터 값들 가져오기
    const selectedFunctions = $('input[name="function"]:checked').map(function () {
      return $(this).val().trim();
    }).get();

    let filteredProducts = [];

    // 필터가 둘 다 선택된 경우 교집합 계산
    if (selectedHairStyles.length > 0 && selectedFunctions.length > 0) {
      let hairStyleFilteredProducts = [];
      selectedHairStyles.forEach((style) => {
        if (productFilter[style]) {
          hairStyleFilteredProducts = hairStyleFilteredProducts.concat(productFilter[style]);
        }
      });

      let functionFilteredProducts = [];
      selectedFunctions.forEach((func) => {
        if (productFilter[func]) {
          functionFilteredProducts = functionFilteredProducts.concat(productFilter[func]);
        }
      });

      hairStyleFilteredProducts = [...new Set(hairStyleFilteredProducts)];
      functionFilteredProducts = [...new Set(functionFilteredProducts)];
      filteredProducts = hairStyleFilteredProducts.filter((product) =>
        functionFilteredProducts.includes(product)
      );
    } else if (selectedHairStyles.length > 0) {
      selectedHairStyles.forEach((style) => {
        if (productFilter[style]) {
          filteredProducts = filteredProducts.concat(productFilter[style]);
        }
      });
    } else if (selectedFunctions.length > 0) {
      selectedFunctions.forEach((func) => {
        if (productFilter[func]) {
          filteredProducts = filteredProducts.concat(productFilter[func]);
        }
      });
    }

    filteredProducts = [...new Set(filteredProducts)];

    // 상품 필터링 적용
    $('.product_box').each(function () {
      const productName = $(this).data('product');
      if ((selectedHairStyles.length === 0 && selectedFunctions.length === 0) || filteredProducts.includes(productName)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  }

  // 필터 변경 이벤트 연결
  $('input[name="hair-style"], input[name="function"]').on('change', function () {
    filterProducts();
  });

  // 초기화 버튼
  $('#clear-filters').on('click', function (e) {
    e.preventDefault();
    $('input[name="hair-style"], input[name="function"]').prop('checked', false);
    $('.product_box').show();
    $('.c_a1_select').empty();
    console.log('Filters cleared');
  });

  // c_b1, c_c1 안의 라디오 버튼 클릭 이벤트
  $('input[name="hair-style"], input[name="function"]').on('change', function () {
    const labelText = $(this).closest('label').text().trim();
    const filterBox = $('.c_a1_select');
    const existingFilter = filterBox.find(`.c_a1_select_box:contains('${labelText}')`);

    if (existingFilter.length === 0 && filterBox.children().length < 8) {
      filterBox.append(`
        <div class="c_a1_select_box">
          <p>${labelText}</p>
          <button></button>
        </div>
      `);

      let filterEachCloseBtn = $('.c_a1_select_box > button');
      filterEachCloseBtn.off('click').on('click', function () {
        let selectedBox = $(this).closest('.c_a1_select_box');
        let selectedBoxValue = selectedBox.find('p').text();
        selectedBox.remove();

        if ($('.c_a1_select_box').length === 0) {
          $('.product_box').show();
          $('input[name="hair-style"]:checked').prop('checked', false);
          $('input[name="function"]:checked').prop('checked', false);
        }
      });
    }
  });

  function handleResponsive() {
    if ($(window).width() <= 1440) {
      // 반응형 조건: 1440 이하

      // -------------- 초기화 
      $('.s2_c_left > h3').css('display', 'flex'); // 제목 보이기
      $('.s2_c_box1').css('display', 'none'); // 필터 숨기기
      $('.c_a1').css('display', 'none'); // 필터 숨기기

      // 화면 크기 변경 시 이전 필터링 초기화
      $("input[name='hair-style'], input[name='function']").prop("checked", false);
      $(".c_a1_select").empty(); // 선택 초기화
      $("[class='product_box']").show(); // 모든 박스 보이기

      // li 요소 숨기기 (초기화)
      $('.c_b1, .c_c1').stop().slideUp(0);
      $('.s2_c_box1').css('border', 'none');

      // -------------- 슬라이드 업, 다운 이벤트 실행

      // 클릭 이벤트를 중복으로 추가하지 않도록 기존 이벤트 제거 후 추가
      $('.s2_c_left > h3').off('click').on('click', function () {
        $('.c_b1, .c_c1').stop().slideToggle(100); // 슬라이드 토글
      });



      $("input[name='hair-style'], input[name='function']").on("change", function () {
        $('.s2_c_box1').css('display', 'block'); // 필터 숨기기
        $('.c_a1').css('display', 'flex'); // 필터 보이기

        let lastScrollTop = $(window).scrollTop(); // 초기 스크롤 위치
        let throttleTimeout; // Throttle timeout 변수
        let isScrolling = false; // 스크롤 상태를 추적하기 위한 변수

        // 스크롤 이벤트 최적화 (Throttling 적용)
        $(window).on("scroll", function () {
          if (throttleTimeout) return; // 이전에 처리 중이면 무시

          throttleTimeout = setTimeout(function () {
            let currentScrollTop = $(window).scrollTop(); // 현재 스크롤 위치

            if (!isScrolling) {
              if (currentScrollTop > lastScrollTop) {
                // 스크롤이 내려갈 때만 슬라이드업
                console.log("스크롤이 내려가고 있습니다.");
                $('.c_b1, .c_c1').stop().slideUp(100);
              }

              isScrolling = true; // 스크롤 상태를 true로 설정
            }

            // 스크롤이 끝나면 isScrolling을 다시 false로 설정하여 다시 동작하도록 함
            setTimeout(function () {
              isScrolling = false;
            }, 200); // 200ms 후 스크롤 상태를 초기화

            lastScrollTop = currentScrollTop; // 마지막 스크롤 위치 업데이트
            throttleTimeout = null; // 타임아웃 초기화
          }, 10); // 100ms 간격으로 스크롤 이벤트 처리
        });
      })

      // "모두 지우기" 버튼 클릭 시 삭제
      $('#clear-filters').off('click').on('click', function (e) {
        e.preventDefault();
        $('.s2_c_box1').css("display", "none");
        $(".c_a1_select").empty();
        $(".c_a1_select").css("display", "none");
        $("[class='product_box']").show(); // 모든 박스 보이기
        $("input[name='hair-style'], input[name='function']").prop("checked", false);
        $('.c_b1, .c_c1').stop().slideUp(500); // 초기 상태로 숨기기
      });
    } else {
      // PC 사이즈 조건: 1440 초과

      $('#clear-filters').off('click').on('click', function (e) {
        e.preventDefault();
        $(".c_a1_select").empty();
        $(".c_a1_select").css("display", "none");
        $("[class='product_box']").show(); // 모든 박스 보이기
        $("input[name='hair-style'], input[name='function']").prop("checked", false);
      })

      // 모든 li 보이기
      $('.c_b1, .c_c1').stop().slideDown(0);

      // 기본 스타일 복원
      $('.s2_c_box1').css('border', '');
      $('.s2_c_box1').css('display', 'block'); // 필터 숨기기

      // 클릭 이벤트 제거
      $('.s2_c_left > h3').off('click').css('display', 'none'); // 제목 숨기기
      $('.c_a1').css('display', 'block'); // 필터 숨기기
    }
  }

  // 초기 실행
  handleResponsive();

  // 창 크기 변경 시 실행
  $(window).resize(function () {
    handleResponsive();
  });


});