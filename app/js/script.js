$(document).ready(function () {
  $('input[name="tip"]').change(function () {
    let value = get();
    $("#i_custom").val("");
    update(
      tipPP(value[0], value[1], value[2]),
      totalPP(value[0], value[1], value[2])
    );
  });

  $("#i_bill").on("input propertychange paste", function () {
    if ($(this).val() === "") {
      $(this).val("");
    }
    let value = get();
    if (isNaN(value[1])) {
      update(
        tipPP(value[0], value[3], value[2]),
        totalPP(value[0], value[3], value[2])
      );
    } else if (value[3] === 0) {
      update(
        tipPP(value[0], value[1], value[2]),
        totalPP(value[0], value[1], value[2])
      );
    }
  });

  $("#peoplenum").on("input propertychange paste", function () {
    if ($(this).val() === "") {
      $(this).val("");
      $(".error").css({ display: "none" });
      $("#peoplenum").css({border: 'none'});
    } else if ($(this).val() == 0) {
      $("#peoplenum").css({border: 'solid 2px var(--error)'});
      $(".error").css({ display: "inline" });
    } else if ($(this).val() != 0){
      $(".error").css({ display: "none" });
      $("#peoplenum").css({border: 'none'});
    }
    let value = get();
    if (isNaN(value[1])) {
      update(
        tipPP(value[0], value[3], value[2]),
        totalPP(value[0], value[3], value[2])
      );
    } else if (value[3] === 0) {
      update(
        tipPP(value[0], value[1], value[2]),
        totalPP(value[0], value[1], value[2])
      );
    }
  });

  $("#i_custom").on("input propertychange paste", function () {
    if ($(this).val() === "") {
      $(this).val("");
    }
    let value = get();
    $('input[name="tip"]:checked').prop("checked", false);
    update(
      tipPP(value[0], value[3], value[2]),
      totalPP(value[0], value[3], value[2])
    );
  });

  function update(tip, total) {
    $("#r_tip").text("$" + tip);
    $("#r_total").text("$" + total);
  }

  function get() {
    return [
      Number($("#i_bill").val()),
      Number($('input[name="tip"]:checked').val()),
      Number($("#peoplenum").val()),
      Number($("#i_custom").val()),
    ];
  }
});

function tipPP(bill, tip, person) {
  let result = Math.round(((bill * (tip / 100)) / person) * 100) / 100;
  if (!isNaN(result) && result !== Infinity) return result;
  else return 0.0;
}

function totalPP(bill, tip, person) {
  let result = Math.round(((bill + bill * (tip / 100)) / person) * 100) / 100;
  if (!isNaN(result) && result !== Infinity) return result;
  else return 0.0;
}
