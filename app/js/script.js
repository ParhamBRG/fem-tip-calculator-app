$(document).ready(function () {
  reset();

  $('input[name="tip"]').change(function () {
    let value = get();
    $("#i_custom").val("");
    update(
      tipPP(value[0], value[1], value[2]),
      totalPP(value[0], value[1], value[2])
    );
  });

  $("#i_bill").on("input propertychange paste", function () {
    controlInputs($("#i_bill"));
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
    controlInputs($("#peoplenum"));
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
    controlInputs($("#i_custom"));
    let value = get();
    $('input[name="tip"]:checked').prop("checked", false);
    update(
      tipPP(value[0], value[3], value[2]),
      totalPP(value[0], value[3], value[2])
    );
  });

  $("#r_reset").click(function () {
    reset();
  });

  $(window).resize(function () { 
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

  function update(tip, total) {
    let r_tip = "$" + tip;
    let r_total = "$" + total;

    // -> handle big number
     if($(window).width() > 1440){
       console.log(r_tip.length);
      if(r_tip.length >= 8 || r_total.length >= 9){
        $('#r_tip , #r_total').width("100%");
        $('#r_tip , #r_total').css("font-size" , "1.68rem");
      }else{
        $('#r_tip , #r_total').width("");
        $('#r_tip , #r_total').css("font-size" , "3rem");
      }
    }else{
      if(r_tip.length >= 9 || r_total.length >= 11){
        $('#r_tip , #r_total').width("100%");
        $('#r_tip , #r_total').css("font-size" , "1.27rem");
      }else{
        $('#r_tip , #r_total').width("");
        $('#r_tip , #r_total').css("font-size" , "2rem");
      }
    }

    $('#r_tip').text(r_tip);
    $('#r_total').text(r_total);
    
  }

  function reset() {
    $("#r_tip").text("$" + 0);
    $("#r_total").text("$" + 0);
    $("#i_custom").val("");
    $("#peoplenum").val("");
    $("#i_bill").val("");
    $('input[name="tip"]').prop("checked", false);
  }

  function get() {
    return [
      Number($("#i_bill").val()),
      Number($('input[name="tip"]:checked').val()),
      Number($("#peoplenum").val()),
      Number($("#i_custom").val()),
    ];
  }

  function controlInputs(element) {
    if (element.val() === "") {
      element.val("");
    } else if (element.val() < 0) {
      element.val(0);
    }

    if (element.attr("id") === "peoplenum") {
      if (element.val() === "0") {
        $("#peoplenum").css({ border: "solid 2px var(--error)" });
        $(".error").css({ display: "inline" });
      } else if (element.val() !== "0" || element.val() === "") {
        $(".error").css({ display: "none" });
        $("#peoplenum").css({ border: "none" });
      }

      if (!Number.isInteger(Number(element.val()))) {
        element.val(Math.floor(Number(element.val())));
      }
    } else if (element.attr("id") === "i_bill") {
      if(element.val().length > 15){
        element.val(element.val().slice(0 , 15));
      }
    } else if (element.attr("id") === "i_custom") {
      if (element.val() > 100) {
        element.val(100);
      }
      if (!Number.isInteger(Number(element.val()))) {
        element.val(Math.floor(Number(element.val())));
      }
    }
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
