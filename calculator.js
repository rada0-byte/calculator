let firstOperand = null;
let secondOperand = null;
let operator = null;
let shouldStartNewNumber = true;

const buttons = document.querySelectorAll(".buttons button");
const display = document.querySelector(".display");

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}
function squareRoot(a) {
  if (a < 0) {
    throw new Error("Cannot take the square root of a negative number");
  }
  return Math.sqrt(a);
}
function calculate(a, b, operator) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    case "√":
      return squareRoot(a);
    default:
      throw new Error("Invalid operator");
  }
}

// this is  format the number and unnecessary decimal places
function formatNumber(num) {
  return String(Number(num.toFixed(10)));
}
// this is to handle the input of digits
function enterDigit(digit) {
  if (
    shouldStartNewNumber ||
    display.value === "0" ||
    display.value === "Error"
  ) {
    display.value = digit;
    shouldStartNewNumber = false;
  } else {
    display.value += digit;
  }
}
// this is to handle the input of decimal point
function enterDecimal() {
  if (
    shouldStartNewNumber ||
    display.value === "0" ||
    display.value === "Error"
  ) {
    display.value = "0.";
    shouldStartNewNumber = false;
  } else if (!display.value.includes(".")) {
    display.value += ".";
  }
}

function chooseOperator(nextOperator) {
  const value = Number(display.value);

  if (!Number.isFinite(value)) return;

  if (operator !== null && shouldStartNewNumber) {
    operator = nextOperator;
    return;
  }

  if (operator !== null) {
    calculateResult();
    if (display.value === "Error") return;
  }
  firstOperand = Number(display.value);
  operator = nextOperator;
  secondOperand = null;
  shouldStartNewNumber = true;
}

function calculateResult() {
  if (operator === null || firstOperand === null || shouldStartNewNumber) {
    return;
  }
  secondOperand = Number(display.value);

  try {
    const result = calculate(firstOperand, secondOperand, operator);
    if (!Number.isFinite(result)) {
      throw new Error("invalid number");
    }
    display.value = formatNumber(result);

    firstOperand = result;
    operator = null;
    secondOperand = null;
    shouldStartNewNumber = true;
  } catch (error) {
    display.value = "Error";
    firstOperand = null;
    secondOperand = null;
    operator = null;
    shouldStartNewNumber = true;
  }
}

function clearAll() {
  firstOperand = null;
  secondOperand = null;
  operator = null;
  display.value = "0";
  shouldStartNewNumber = true;
}

function backspace() {
  if (shouldStartNewNumber || display.value === "Error") {
    return;
  }
  display.value = display.value.slice(0, -1);
  if (display.value === "") {
    display.value = "0";
    shouldStartNewNumber = true;
  }
}
function calculatePercentage() {
  if (display.value === "Error") return;
  const value = Number(display.value);
  display.value = formatNumber(value / 100);
  shouldStartNewNumber = true;
}

function updateDisplay() {
  display.value = formatNumber(Number(display.value));
}
function applySquareRoot() {
  if (display.value === "Error") return;
  const value = Number(display.value);
  if (value < 0) {
    display.value = "Error";
    shouldStartNewNumber = true;
    return;
  }
  display.value = formatNumber(Math.sqrt(value));
  shouldStartNewNumber = true;
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;
    const value = button.dataset.value;

    switch (action) {
      case "digit":
        enterDigit(value);
        break;
      case "decimal":
        enterDecimal();
        break;
      case "operator":
        chooseOperator(value);
        break;
      case "equals":
        calculateResult();
        break;
      case "clear-all":
        clearAll();
        break;
      case "backspace":
        backspace();
        break;
      case "percent":
        calculatePercentage();
        break;
      default:
        break;
    }
  });
});
