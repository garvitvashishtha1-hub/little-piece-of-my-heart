
/* =========================================
   1. PERSONAL MESSAGES
   Replace these sample messages with yours.
========================================= */

const myLetter = `Hey, sweetheart.

I wanted to make something for you, something a little different from an ordinary message.

Sometimes, words on a screen don't feel like enough to say everything I want you to know.

So I made this little place for you.

Every part of it is a reminder that someone is thinking about you and wanted to make you smile.

And that someone is me. ♥`;


const messages = [
  "I just love the waye u talk to me, give importance to me, love me, and everything else jo still maine yaha likhi nhi h.",
  "The mere thought of you just makes me smile like I never did before, aur ye sab jo mei keheta hu kind of filmy lines lagti hongi apko but aise hai nhi, this is what all i think about you  ---YOU MAKE ME FEEL ALIVE---.",
  "Kitna blessed hu mei ke aaj ke aise time me I found you, kabhi kabhi lagta h yrr thoda time pehele he mil jate to kya he ho jata but ab mile ho to usse aacha kuch hai bhi nhi mere liye."
];


const myFinalMessage = `You can take this a one of my way to express my love to you , mujhe pta he ke kabhi-kabhi mei vo nhi krta jo mujhe krna chaiye, jaise apse aache se baat, but uska ye matlab nhi hai ke I don't love you, vo to bs ye aadat se pad gyi h but don't worry ise to theek kr lunga mei.

Thank you for being you.

And if this little surprise made you smile even a little, then it was worth every minute I spent making it.

You have a special place in my heart. Always. FROM YOUR CHOTAA SA BACCHA  ♥`;

/* =========================================
   2. SELECT HTML ELEMENTS
========================================= */

const screens = document.querySelectorAll(".screen");

const beginButton = document.querySelector("#beginButton");

const envelopeButton = document.querySelector("#openEnvelope");
const envelopeStage = document.querySelector("#envelopeStage");
const letterContent = document.querySelector("#letterContent");
const letterText = document.querySelector("#letterText");

const reasonsButton = document.querySelector("#reasonsButton");
const reasonText = document.querySelector("#reasonText");
const nextReasonButton = document.querySelector("#nextReasonButton");
const finalButton = document.querySelector("#finalButton");

const finalMessage = document.querySelector("#finalMessage");
const replayButton = document.querySelector("#replayButton");

const music = document.querySelector("#backgroundMusic");
const musicButton = document.querySelector("#musicButton");


/* =========================================
   3. VARIABLES
========================================= */

let messageIndex = 0;
let musicOn = false;
let typingTimer = null;


/* =========================================
   4. SWITCH BETWEEN SCREENS
========================================= */

function showScreen(id) {
  screens.forEach(screen => {
    screen.classList.toggle("hidden", screen.id !== id);
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================================
   5. TYPING ANIMATION
========================================= */

function typeText(element, text, speed = 28) {
  // Stop any previous typing animation.
  if (typingTimer !== null) {
    clearInterval(typingTimer);
    typingTimer = null;
  }

  element.textContent = "";

  let index = 0;

  typingTimer = setInterval(() => {
    element.textContent += text[index];
    index++;

    if (index >= text.length) {
      clearInterval(typingTimer);
      typingTimer = null;
    }
  }, speed);
}


/* =========================================
   6. FLOATING HEARTS
========================================= */

function createHearts(amount = 10, originX = null, originY = null) {
  for (let i = 0; i < amount; i++) {
    const heart = document.createElement("span");

    heart.className = "heart-particle";

    heart.textContent =
      Math.random() > 0.5 ? "♥" : "♡";

    const x = originX ?? Math.random() * window.innerWidth;

    const y = originY ??
      window.innerHeight * (0.75 + Math.random() * 0.2);

    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;

    heart.style.fontSize =
      `${14 + Math.random() * 22}px`;

    heart.style.setProperty(
      "--duration",
      `${2.2 + Math.random() * 1.8}s`
    );

    heart.style.setProperty(
      "--drift",
      `${-70 + Math.random() * 140}px`
    );

    heart.style.setProperty(
      "--rotation",
      `${-50 + Math.random() * 100}deg`
    );

    document.body.appendChild(heart);

    heart.addEventListener("animationend", () => {
      heart.remove();
    }, { once: true });
  }
}


/* =========================================
   7. SPARKLES WHEN THE BACKGROUND IS TAPPED
========================================= */

function createSparkles(x, y) {
  const symbols = ["✦", "✧", "·", "✧", "♡"];
  const amount = 7;

  for (let i = 0; i < amount; i++) {
    const sparkle = document.createElement("span");

    sparkle.className = "sparkle-particle";

    sparkle.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    const angle = (Math.PI * 2 * i) / amount;
    const distance = 20 + Math.random() * 45;

    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;

    sparkle.style.setProperty(
      "--move-x",
      `${Math.cos(angle) * distance}px`
    );

    sparkle.style.setProperty(
      "--move-y",
      `${Math.sin(angle) * distance}px`
    );

    sparkle.style.setProperty(
      "--size",
      `${12 + Math.random() * 14}px`
    );

    document.body.appendChild(sparkle);

    sparkle.addEventListener("animationend", () => {
      sparkle.remove();
    }, { once: true });
  }
}


/* =========================================
   8. FIRST SCREEN: BEGIN THE EXPERIENCE
========================================= */

beginButton.addEventListener("click", () => {
  showScreen("letter");

  createHearts(16);
});


/* =========================================
   9. OPEN THE ANIMATED ENVELOPE
========================================= */

envelopeButton.addEventListener("click", () => {
  // Prevent opening the same envelope twice.
  if (envelopeButton.classList.contains("open")) {
    return;
  }

  envelopeButton.classList.add("open");

  envelopeButton.setAttribute(
    "aria-label",
    "Opening your love letter"
  );

  createHearts(12);

  // Wait for the envelope animation.
  setTimeout(() => {
    envelopeStage.classList.add("hidden");

    letterContent.classList.remove("hidden");

    letterContent.classList.add(
      "envelope-content-opening"
    );

    // Reveal the personal letter.
    typeText(letterText, myLetter, 28);

    createHearts(10);
  }, 1450);
});


/* =========================================
   10. MOVE TO PERSONAL MESSAGES
========================================= */

reasonsButton.addEventListener("click", () => {
  showScreen("reasons");

  messageIndex = 0;

  reasonText.textContent = messages[messageIndex];

  createHearts(8);
});


/* =========================================
   11. SHOW THE NEXT MESSAGE
========================================= */

nextReasonButton.addEventListener("click", () => {
  messageIndex = (messageIndex + 1) % messages.length;

  reasonText.textContent = messages[messageIndex];

  createHearts(5);
});


/* =========================================
   12. REVEAL THE FINAL MESSAGE
========================================= */

finalButton.addEventListener("click", () => {
  showScreen("final");

  typeText(finalMessage, myFinalMessage, 28);

  createHearts(24);
});


/* =========================================
   13. REPLAY THE WHOLE EXPERIENCE
========================================= */

replayButton.addEventListener("click", () => {
  // Stop typing if an animation is still running.
  if (typingTimer !== null) {
    clearInterval(typingTimer);
    typingTimer = null;
  }

  // Reset the envelope to its closed state.
  envelopeButton.classList.remove("open");

  envelopeButton.setAttribute(
    "aria-label",
    "Open your love letter"
  );

  envelopeStage.classList.remove("hidden");

  letterContent.classList.add("hidden");

  letterContent.classList.remove(
    "envelope-content-opening"
  );

  // Clear old text and reset the messages.
  letterText.textContent = "";
  finalMessage.textContent = "";

  reasonText.textContent = "Tap the button, sweetheart.";

  messageIndex = 0;

  showScreen("welcome");

  createHearts(8);
});


/* =========================================
   14. OPTIONAL BACKGROUND MUSIC
========================================= */

musicButton.addEventListener("click", async () => {
  // Music is optional. No audio file is included by default.
  if (!music.getAttribute("src")) {
    musicButton.textContent = "♫ Add a music file first";
    return;
  }

  if (!musicOn) {
    try {
      await music.play();

      musicOn = true;
      musicButton.textContent = "♫ Music: on";
    } catch (error) {
      musicButton.textContent = "♫ Tap to try again";
    }
  } else {
    music.pause();

    musicOn = false;
    musicButton.textContent = "♫ Music: off";
  }
});


/* =========================================
   15. BACKGROUND TAP SPARKLES
========================================= */

document.addEventListener("pointerdown", event => {
  // Buttons already have their own interactions.
  if (
    event.target.closest(
      "button, a, input, textarea, select"
    )
  ) {
    return;
  }

  // Ignore right-clicks.
  if (
    event.pointerType === "mouse" &&
    event.button !== 0
  ) {
    return;
  }

  createSparkles(event.clientX, event.clientY);
});
