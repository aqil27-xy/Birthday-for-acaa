
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

  if (enteredPIN.length === 6) {
  if (enteredPIN === correctPIN) {
  document.getElementById("password-screen").style.display = "none";
  document.getElementById("gift-screen").style.display = "flex";
} else {
      pinMessage.textContent = "PIN salah, coba lagi ya 🌸";
      enteredPIN = "";
      updatePINDisplay();
    }
  }
});

function updatePINDisplay() {
  const dots = pinDisplay.querySelectorAll("span");

  dots.forEach(function(dot, index) {
    dot.textContent = index < enteredPIN.length ? "●" : "○";
  });

  pinMessage.textContent = "";
}

const openGiftButton = document.getElementById("open-gift");
const giftMessage = document.getElementById("gift-message");

openGiftButton.addEventListener("click", function() {
  giftMessage.style.display = "block";
  openGiftButton.textContent = "A gift made with love 💖";
});
