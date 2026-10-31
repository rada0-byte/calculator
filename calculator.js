let firstOperand = null;
let secondOperand = null;
let operator = null;
let shouldStartNewNumber = true;

const buttons = document.querySelectorAll(".buttons button");
const display = document.querySelector(".display");

let currentInput = "0";
let expression = "";
display.value = "0";

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
    default:
      throw new Error("Invalid operator");
  }
}

// this is to  format the number and remove  unnecessary decimal places
function formatNumber(num) {
  return String(Number(num.toFixed(10)));
}
function updateDisplay() {
  if (operator === null) {
    expression = currentInput;
  } else if (shouldStartNewNumber) {
    expression = `${formatNumber(firstOperand)} ${operator}`;
  } else {
    expression = `${formatNumber(firstOperand)} ${operator} ${currentInput}`;
  }
  display.value = expression;
}
// this is to handle the input of digits
function enterDigit(digit) {
  if (shouldStartNewNumber || display.value === "Error") {
    currentInput = digit;
    shouldStartNewNumber = false;
  } else {
    currentInput += digit;
  }
  updateDisplay();
}
// this is to handle the input of decimal point
function enterDecimal() {
  if (shouldStartNewNumber || display.value === "Error") {
    currentInput = "0.";
    shouldStartNewNumber = false;
  } else if (!currentInput.includes(".")) {
    display.value += ".";
  }
}

function chooseOperator(nextOperator) {
  if (display.value === "Error") return;

  if (operator !== null && shouldStartNewNumber) {
    operator = nextOperator;
    updateDisplay();
    return;
  }

  if (operator !== null) {
    calculateResult();
    if (display.value === "Error") return;
  }
  firstOperand = Number(currentInput);
  operator = nextOperator;
  secondOperand = null;
  shouldStartNewNumber = true;
  updateDisplay();
}

function calculateResult() {
  if (operator === null || firstOperand === null || shouldStartNewNumber) {
    return;
  }
  secondOperand = Number(currentInput);

  try {
    const result = calculate(firstOperand, secondOperand, operator);
    if (!Number.isFinite(result)) {
      throw new Error("invalid number");
    }

    currentInput = formatNumber(result);
    firstOperand = null;
    operator = null;
    secondOperand = null;
    shouldStartNewNumber = true;
    updateDisplay();
  } catch (error) {
    display.value = "Error";
    currentInput = "0";
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
  currentInput = "0";
  expression = "";
  shouldStartNewNumber = true;
  updateDisplay();
}

function backspace() {
  if (shouldStartNewNumber || display.value === "Error") {
    return;
  }
  currentInput = currentInput.slice(0, -1);
  if (currentInput === "" || currentInput === "-") {
    currentInput = "0";
    shouldStartNewNumber = true;
  }
  updateDisplay();
}

function calculatePercentage() {
  if (display.value === "Error") return;
  currentInput = formatNumber(Number(currentInput) / 100);
  shouldStartNewNumber = false;

  updateDisplay();
}

function applySquareRoot() {
  if (display.value === "Error") return;

  try {
    currentInput = formatNumber(squareRoot(Number(currentInput)));

    firstOperand = null;
    secondOperand = null;
    operator = null;
    shouldStartNewNumber = true;

    updateDisplay();
  } catch (error) {
    display.value = "Error";
    currentInput = "0";
    firstOperand = null;
    secondOperand = null;
    operator = null;
    shouldStartNewNumber = true;
  }
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
      case "sqrt":
        applySquareRoot();
        break;
      default:
        break;
    }
  });
});
