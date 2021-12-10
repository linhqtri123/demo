// Q&A by Zzbaivong (devs.forumvi.com)
(function ($) {
  var data = [{
    "question": "Số nào chia hết cho 2?",
    "options": ["4", "9", "7", "3"],
    "answer": "0"
  }, {
    "question": "Tác phẩm nào sau đây là của tác giả Ngô Tất Tổ?",
    "options": ["Tỏ Lòng", "Cảnh ngày hè", "Tắt đèn"],
    "answer": "2"
  }, {
    "question": "I am ____ video games with my friends at the moment",
    "options": ["to play", "played", "playing", "play"],
    "answer": "2"
  }, {
    "question": "Ngày nào là ngày thành lập Đảng?",
    "options": ["3/2/1930", "13/5/1955", "19/10/1980", "9/2/1945"],
    "answer": "0"
  }, {
    "question": "Việt Nam nằm ở vùng khí hậu nào?",
    "options": ["Nhiệt đới gió mùa ẩm", "Gió mùa", "Nhiệt đới gió mùa", "Nóng ẩm"],
    "answer": "0"
  }, {
    "question": "Tế bào là đơn vị tổ chức cơ bản của sự sống vì:",
    "options": ["Tất cả các loài sinh vật đều có cấu tạo từ tế bào.", "Mọi hoạt động sống của cơ thể đều diễn ra trong tế bào.", "Cơ sở sinh sản là sự phân bào.", "Tất cả các ý trên"],
    "answer": "3"
  }, {
    "questions": "Tác giả nào đã sáng tác bài Non nước hữu tình? ",
    "options": ["Thanh Sơn", "Anh Thư", "Kim Thư", "Cẩm Ly"],
    "answer": "0"
  }, {
    "questions": "Cầu thủ nào đang ghi bàn thắng nhiều nhất trong lịch sử bóng đá thế giới?",
    "options": ["Lionel Messi", "Jessie Lingard", "Cristiano Ronaldo", "Pele"],
    "answer": "2"
  }];

  var $form = $("#q_a"),
    $answers = $("#answers"),
    $result = $("#result"),
    $checkResult = $("#checkResult"),
    $showResult = $("#showResult"),
    $reset = $("#resetResult"),
    reset = true,
    $group, $item;

  // Tạo bảng trắc nghiệm
  $.each(data, function (index, value) {

    $group = $("<ul>", {
      "id": "q" + index,
      "class": "question"
    }).appendTo($answers);

    // Nội dung câu hỏi
    $group.before('<p class="qContent">' + value.question + '</p>');

    // Tạo danh sách các lựa chọn
    $item = [];
    $.each(value.options, function (sub_index, sub_value) {
      $item[sub_index] = '<li><input id="q' + index + 'a' + sub_index + '" class="items" type="radio" name="answer' + index + '" value="' + sub_index + '"><label for="q' + index + 'a' + sub_index + '">' + sub_value + '</label></li>';
    });
    $group.html($item.join(""));

  });

  // Hiển thị kết quả
  $form.on("submit", function (e) {
    var countCorrectAnswer = 0

    e.preventDefault();
    // Kiểm tra các đáp án đã chọn
    $.each($(this).serializeArray(), function (index, value) {

      var check = value.name.match(/\d/)[0],
        $q = $("#q" + check);

      $q.removeClass("wrong correct");
      if (data[check].answer !== value.value) {
        $q.addClass("wrong");
      } else {
        countCorrectAnswer++;
        $q.addClass("correct");
      }

    });

    // Hiển thị các thông số đánh giá kết quả
    var wrong = $(".wrong").length,
      correct = $(".correct").length,
      empty = $(".question:not(.wrong):not(.correct)").length;

    $result.html(wrong + ' câu sai<br>' + correct + ' câu đúng<br>' + empty + ' câu chưa làm');

    $checkResult.hide();

    if (!(wrong === 0 && empty === 0)) { // Nếu đúng hết thì không hiện nút Xem đáp án và nút Làm lại
      $showResult.show();

      if (reset) { // Cho phép làm lại 1 lần
        $reset.show();
      }
    }

    $form.find(":radio").prop("disabled", true);
    window.location.href = "result.html" + "?" + countCorrectAnswer + "&" + data.length;

  });

  // Làm lại (giữ lại câu đúng)
  $reset.on("click", function (e) {
    e.preventDefault();

    if (reset) { // Cho phép làm lại 1 lần
      reset = false;
      $result.empty();
      $showResult.hide();
      $reset.hide();
      $checkResult.show();
      $form.find("ul:not(.correct)").find(":radio").prop("disabled", false);
      $form.find(".wrong").removeClass("wrong");
    }

  });

  // Xem đáp án
  $showResult.on("click", function (e) {
    e.preventDefault();

    // Đánh dấu các đáp án
    $.each(data, function (index, value) {
      $("#q" + index + "a" + value.answer).addClass("key");
    });

    $reset.hide();
    $showResult.hide();

  });

})(jQuery);

