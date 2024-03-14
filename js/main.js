// IMPORT BOOTSTRAP FROM MODULES
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

// IMPORT SWIPER JS FROM MODULES
// import Swiper from "../node_modules/swiper/swiper-bundle.min.mjs";

// 🔴@@@@@@@@@@@@@@@@ BOOTSTRAP JS BEGIN @@@@@@@@@@@@@@@@
// ✅FORM VALIDATION bs-jS
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
// ✅FORM VALIDATION bs-jS
// @@@@@@@@@@@@@@@@ BOOTSTRAP JS END @@@@@@@@@@@@@@@@

// 🔴@@@@@@@@@@@@@@@@ SWIPER JS BEGIN @@@@@@@@@@@@@@@@
//  @@@@@@@@@@@@@@@@ SEIPER JS END @@@@@@@@@@@@@@@@

// 🔴@@@@@@@@@@@@@@@@ CUSTOM JS BEGIN @@@@@@@@@@@@@@@@

// ✅hamburger manu link's collapse  begin
const navBar = document.querySelectorAll(".nav-link, .dropdown-item");
const navbarCollapse = document.querySelector(".navbar-collapse");

navBar.forEach((vlu) => handleCollapse(vlu));
function handleCollapse(params) {
  if (params.getAttribute("class") === "nav-link dropdown-toggle") {
    return;
  }
  params.addEventListener("click", () => {
    navbarCollapse.classList.remove("show");
  });
}
// ✅hamburger manu link's collapse  end

// ✅Audio Visualizer canvas draw start
const btnAudio = document.querySelectorAll(".btnAudio");
const audioPlay = document.querySelectorAll(".fa-play");
const audioPause = document.querySelectorAll(".fa-headphones");
const audioSrc = [
  "../public/audio/Podcast.mp3",
  "../public/audio/Podcast2.mp3",
];
const audio = audioSrc.map((src) => new Audio(src));
const audioCtx = audioSrc.map(() => new AudioContext());
const audioAnalyzer = audioCtx.map((ctx) => ctx.createAnalyser());
const canvas = document.querySelectorAll("canvas");
const canvasCtx = Array.from(canvas).map((canvas) => canvas.getContext("2d"));
let audioSource, bufferLength, dataArray;

// audi button toggle
function handleBtnToggle(indx) {
  if (audioPause[indx].classList.contains("d-none")) {
    audioPause[indx].classList.remove("d-none");
    audioPlay[indx].classList.add("d-none");
    audio[indx].play();
  } else {
    audioPause[indx].classList.add("d-none");
    audioPlay[indx].classList.remove("d-none");
    audio[indx].pause();
  }
}

// audio src analazation
function handleAnalization(indx) {
  if (!audioSource) {
    audioSource = audioCtx[indx].createMediaElementSource(audio[indx]);
    audioSource.connect(audioAnalyzer[indx]);
    audioAnalyzer[indx].connect(audioCtx[indx].destination);
    audioAnalyzer[indx].fftSize = 2048;
    bufferLength = audioAnalyzer[indx].frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
    audioSource = undefined;
  }
}

function handleDraw(indx) {
  const barWidth = 2;
  const barGap = 5;
  let x, y, barHeight;

  function animate() {
    x = 0;
    audioAnalyzer[indx].getByteFrequencyData(dataArray);
    canvasCtx[indx].clearRect(0, 0, canvas[indx].width, canvas[indx].height);

    for (let index = 0; index < bufferLength; index++) {
      barHeight = dataArray[index];
      y = canvas[indx].height - barHeight / 2;

      canvasCtx[indx].fillStyle = `rgb(${dataArray[index]*0.8},8,179,1)`;
      canvasCtx[indx].fillRect(x, y, barWidth, barHeight);

      x += barWidth + barGap;
    }
    requestAnimationFrame(animate);
  }
  animate();
}

btnAudio.forEach((btn, indx) =>
  btn.addEventListener("click", () => {
    // play pause button toggle func
    handleBtnToggle(indx);

    // audio analization func
    handleAnalization(indx);

    // drawing on canvas
    handleDraw(indx);
  })
);

// ✅Audio Visualizer canvas draw end

//  @@@@@@@@@@@@@@@@ CUSTOM JS END @@@@@@@@@@@@@@@@
