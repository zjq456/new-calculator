const state = {
  current: "0",
  previous: null,
  operator: null,
};

const display = document.getElementById("display");

function render() {
  display.textContent = state.current;
}

function inputNumber(char) {
  if (char === "." && state.current.includes(".")) return;
  if (state.current === "0" && char !== ".") {
    state.current = char;
  } else {
    state.current += char;
  }
}

function calculate(a, b, op) {
  a = Number(a);
  b = Number(b);
  switch (op) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return b === 0 ? "错误" : a / b;
    default: return b;
  }
}

function chooseOperator(op) {
  if (state.operator !== null && state.previous !== null) {
    const result = calculate(state.previous, state.current, state.operator);
    state.current = String(result);
  }
  state.previous = state.current;
  state.operator = op;
  state.current = "0";
}

function equals() {
  if (state.operator === null || state.previous === null) return;
  state.current = String(calculate(state.previous, state.current, state.operator));
  state.previous = null;
  state.operator = null;
}

function clearAll() {
  state.current = "0";
  state.previous = null;
  state.operator = null;
}

function deleteLast() {
  if (state.current.length <= 1) {
    state.current = "0";
  } else {
    state.current = state.current.slice(0, -1);
  }
}

document.querySelector(".buttons").addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  if (btn.dataset.num) {
    inputNumber(btn.dataset.num);
  } else if (btn.dataset.op) {
    chooseOperator(btn.dataset.op);
  } else if (btn.dataset.action === "clear") {
    clearAll();
  } else if (btn.dataset.action === "delete") {
    deleteLast();
  } else if (btn.dataset.action === "equals") {
    equals();
  }

  render();
});

render();
