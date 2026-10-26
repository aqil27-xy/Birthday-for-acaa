
const correctPIN = "271010";
let enteredPIN = "";

const $ = (id) => document.getElementById(id);

const passwordScreen = $("password-screen");
const giftScreen = $("gift-screen");
const birthdayContent = $("birthday-content");
const pinDisplay = $("pin-display");
const pinMessage = $("pin-message");

$("keypad").addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.dataset.digit !== undefined && enteredPIN.length < 6) {
    enteredPIN += button.dataset.digit;
  } else if (button.dataset.action === "clear") {
    enteredPIN = "";
  } else if (button.dataset.action === "delete") {
    enteredPIN = enteredPIN.slice(0, -1);
  }

  updatePIN();

  if (enteredPIN.length === 6) {
    if (enteredPIN === correctPIN) {
      pinMessage.textContent = "";
      passwordScreen.classList.add("hidden");
      giftScreen.classList.remove("hidden");
      startMusicOnInteraction();
    } else {
      pinMessage.textContent = "PIN salah, coba lagi ya 🌸";
      enteredPIN = "";
      setTimeout(updatePIN, 650);
    }
  }
});

function updatePIN() {
  pinDisplay.querySelectorAll("span").forEach((dot, index) => {
    dot.textContent = index < enteredPIN.length ? "●" : "○";
  });
}

let audioContext;
function startMusicOnInteraction() {
  // Musik dimulai lewat tombol Play Music.
}

$("gift-box").addEventListener("click", () => {
  $("gift-box").classList.add("opened");
  $("gift-hint").textContent = "A little gift, with all my love ❤️";
  $("enter-site").classList.remove("hidden");
});

$("enter-site").addEventListener("click", () => {
  giftScreen.classList.add("hidden");
  birthdayContent.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Flower popups
const modal = $("flower-modal");

document.querySelectorAll(".flower").forEach((flower) => {
  flower.addEventListener("click", () => {
    $("modal-title").textContent = flower.dataset.title;
    $("modal-message").textContent = flower.dataset.message;
    modal.classList.remove("hidden");
  });
});

function closeFlowerModal() {
  modal.classList.add("hidden");
}

$("close-modal").addEventListener("click", closeFlowerModal);
$("modal-ok").addEventListener("click", closeFlowerModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) closeFlowerModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeFlowerModal();
});

// Gratitude jar: avoid repeating a note until all have appeared
const notes = [
  "I love the way you make ordinary moments feel special. 💗",
  "Thank you for being someone I can share my little stories with. 🌷",
  "You deserve the same kindness you give to other people. 🤍",
  "Your smile is one of my favorite things in this world. ☀️",
  "I'm proud of you, including on the days you don't feel your best. 🫶",
  "Thank you for being part of my story. 💌",
  "I hope life surprises you with beautiful things. ✨",
  "You never have to be perfect to be loved. 🌸",
  "My favorite memories are the ones that include you. 📸",
  "I will always wish for your happiness, even in the smallest things. 💕",
  "You make my world a little softer and brighter. 🌼",
  "Today is your reminder that you are deeply appreciated. 🎀"
];

let remainingNotes = [];

function nextNote() {
  if (remainingNotes.length === 0) {
    remainingNotes = [...notes];
  }
  const index = Math.floor(Math.random() * remainingNotes.length);
  return remainingNotes.splice(index, 1)[0];
}

$("shake-jar").addEventListener("click", () => {
  const jar = $("shake-jar");
  jar.classList.remove("shaking");
  void jar.offsetWidth;
  jar.classList.add("shaking");
  $("jar-note").textContent = nextNote();
});

// Birthday cake
function makeWish() {
  $("cake").classList.add("blown");
  $("cake-hint").textContent = "Wish made! May beautiful things find you. ✨";
  $("final-message").classList.remove("hidden");
}

$("cake").addEventListener("click", makeWish);
$("cake").addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    makeWish();
  }
});

$("back-to-top").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const bgMusic = document.getElementById("bg-music");
const musicToggle = document.getElementById("music-toggle");

bgMusic.volume = 0.3;

async function playMusic() {
  try {
    await bgMusic.play();
    musicToggle.textContent = "⏸ Pause Music";
  } catch (error) {
    musicToggle.textContent = "🎵 Tap to Play";
  }
}

musicToggle.addEventListener("click", async () => {
  if (bgMusic.paused) {
    await playMusic();
  } else {
    bgMusic.pause();
    musicToggle.textContent = "🎵 Play Music";
  }
});

document.getElementById("enter-site").addEventListener("click", playMusic);
