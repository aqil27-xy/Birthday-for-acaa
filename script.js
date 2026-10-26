
const correctPIN = "271010";
let enteredPIN = "";

const keypad = document.getElementById("keypad");
const pinDisplay = document.getElementById("pin-display");
const pinMessage = document.getElementById("pin-message");

keypad.addEventListener("click", function(event) {
  const button = event.target.closest("button");

  if (!button) return;

  if (button.dataset.digit !== undefined) {
    if (enteredPIN.length < 6) {
      enteredPIN += button.dataset.digit;
    }
  }

  if (button.dataset.action === "clear") {
    enteredPIN = "";
  }

  if (button.dataset.action === "delete") {
    enteredPIN = enteredPIN.slice(0, -1);
  }

  updatePINDisplay();
});

function updatePINDisplay() {
  const dots = pinDisplay.querySelectorAll("span");

  dots.forEach(function(dot, index) {
    dot.textContent = index < enteredPIN.length ? "●" : "○";
  });

  pinMessage.textContent = "";
}
