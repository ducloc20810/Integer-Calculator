let prevNum = 0;
let prevOp = null;
let display2Clear = false;
let init = 0;
document.getElementById("input-area").onclick = function (e) {
  if (e.target.nodeName == "BUTTON") {
    let value = e.target.value;
    let str = $("#display-one").val();
    let operators = ["+", "-", "x", "/", "=", "AC"];
    if (!operators.includes(value)) {
      updateDisplay1(str, value);
    } else {
      if (value === "=") {
        updateEquationMath(str, value);
      } else {
        if (value === "AC") {
          allClear();
        } else {
          oldStr2 = $("#display-two").val();

          if (init != 0 && display2Clear == false) {
            if (display2Clear == false) {
              $("#display-two").val(prevNum + " " + value);
              prevOp = value;
              return;
            }
          }
          updateOperatorMath(str, value);
        }
      }
    }
  }
};

function allClear() {
  prevOp = null;
  prevNum = 0;
  init = 0;
  display2Clear = false;
  $("#display-one").val("");
  $("#display-two").val("");
}
function updateEquationMath(str, value) {
  var oldStr = $("#display-two").val();

  if (prevOp != null && prevOp != "=") {
    if (oldStr.includes("=")) {
      let newStr = oldStr.substr(oldStr.indexOf(" "), oldStr.length);
      let temp = newStr;
      let oldPassiveNum = temp.slice(3, 4);
      console.log(oldPassiveNum);
      updateOperatorMath(oldPassiveNum, prevOp);
      $("#display-two").val(str + newStr);
    } else {
      updateOperatorMath(str, prevOp);
      $("#display-two").val(oldStr + " " + str + " " + value);
    }
    $("#display-one").val(prevNum);
  } else {
    prevNum = parseInt(str);
    $("#display-two").val(str + " " + "=");
    prevOp = value;
  }

  display2Clear = false;
}

function updateDisplay1(str, value) {
  if ($("#display-two").val() != "" && display2Clear === false) {
    $("#display-one").val(value);
    display2Clear = true;
  } else $("#display-one").val(str + value);
}

function updateOperatorMath(str, value) {
  if (prevOp === "=") {
    $("#display-one").val(prevNum);
    $("#display-two").val(prevNum + " " + value);
    prevOp = value;
    display2Clear = false;
    return prevNum;
  }

  if (init === 0) {
    prevNum = parseInt(str);
    init = 1;
    prevOp = value;
    $("#display-one").val(prevNum);
    $("#display-two").val(prevNum + " " + value);
    display2Clear = false;
    return prevNum;
  } else {
    switch (prevOp) {
      case "+":
        prevNum = prevNum + parseInt(str);
        break;

      case "-":
        prevNum = prevNum - parseInt(str);
        break;

      case "x":
        prevNum = prevNum * parseInt(str);
        break;

      case "/":
        prevNum = prevNum / parseInt(str);
        break;
    }
    prevOp = value;
    $("#display-one").val(prevNum);
    $("#display-two").val(prevNum + " " + value);
    display2Clear = false;
    return prevNum;
  }
}
