"use strict";

function throttle(callback, limit) {
  let waiting = false;

  return function (...args) {
    if (!waiting) {
      callback.apply(this, args);
      waiting = true;

      setTimeout(() => {
        waiting = false;
      }, limit);
    }
  };
}

function displayForm(type) {
  const selectedForm = document.getElementById(type + "-form");
  const queryForm = document.getElementById("query-form");
  const structuredForm = document.getElementById("structured-form");

  selectedForm.style.display = "block";
  selectedForm.removeAttribute("disabled");

  if (type === "query") {
    structuredForm.setAttribute("disabled", "disabled");
  } else if (type === "structured") {
    queryForm.setAttribute("disabled", "disabled");
  }
}

window.onload = function () {
  const mainForm = document.getElementById("main-form");
  const mainSubmitButton = document.getElementById("main-submit");

  mainForm.addEventListener(
    "submit",
    throttle((event) => {
      mainSubmitButton.setAttribute("disabled", "disabled");
    }, 10000)
  );
};
