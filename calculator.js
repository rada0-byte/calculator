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
    case "sqrt":
      return squareRoot(a);
    default:
      throw new Error("Invalid operator");
  }
}
