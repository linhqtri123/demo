// Q&A by Zzbaivong (devs.forumvi.com)
(function($) {

    var data = [{
      "question": "q1q1q1q1q1q1q1",
      "options": ["aaaaaaaaaa", "bbbbbbbbbb", "cccccccccc", "1111111111"],
      "answer": "3"
    }, {
      "question": "q2q2q2q2q2q2q2",
      "options": ["2222222222", "bbbbbbbbbb", "cccccccccc"],
      "answer": "0"
    }, {
      "question": "q3q3q3q3q3q3q3",
      "options": ["aaaaaaaaaa", "3333333333", "cccccccccc", "dddddddddd"],
      "answer": "1"
    }, {
      "question": "q4q4q4q4q4q4q4",
      "options": ["aaaaaaaaaa", "bbbbbbbbbb", "4444444444", "dddddddddd"],
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
    $.each(data, function(index, value) {
  
      $group = $("<ul>", {
        "id": "q" + index,
        "class": "question"
      }).appendTo($answers);
  
      // Nội dung câu hỏi
      $group.before('<p class="qContent">' + value.question + '</p>');
  
      // Tạo danh sách các lựa chọn
      $item = [];
      $.each(value.options, function(sub_index, sub_value) {
        $item[sub_index] = '<li><input id="q' + index + 'a' + sub_index + '" class="items" type="radio" name="answer' + index + '" value="' + sub_index + '"><label for="q' + index + 'a' + sub_index + '">' + sub_value + '</label></li>';
      });
      $group.html($item.join(""));
  
    });
  
    // Hiển thị kết quả
    $form.on("submit", function(e) {
      e.preventDefault();
      // Kiểm tra các đáp án đã chọn
      $.each($(this).serializeArray(), function(index, value) {
  
        var check = value.name.match(/\d/)[0],
          $q = $("#q" + check);
  
        $q.removeClass("wrong correct");
        if (data[check].answer !== value.value) {
          $q.addClass("wrong");
        } else {
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
  
    });
  
    // Làm lại (giữ lại câu đúng)
    $reset.on("click", function(e) {
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
    $showResult.on("click", function(e) {
      e.preventDefault();
  
      // Đánh dấu các đáp án
      $.each(data, function(index, value) {
        $("#q" + index + "a" + value.answer).addClass("key");
      });
  
      $reset.hide();
      $showResult.hide();
  
    });
  
  })(jQuery);

  