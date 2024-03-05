// IMPORT BOOTSTRAP FROM MODULES
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

// IMPORT SWIPER JS FROM MODULES
// import Swiper from "../node_modules/swiper/swiper-bundle.min.mjs";

// 🔴@@@@@@@@@@@@@@@@ BOOTSTRAP JS BEGIN @@@@@@@@@@@@@@@@
// ✅TOOLTIP bs-Js
const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);
// ✅TOOLTIP bs-Js

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
const audio = new Audio("../public/audio/Podcast.mp3");
const canvas = document.querySelectorAll("canvas");
const btnAudioPlay = document.querySelectorAll(".btnAudioPlay");
const headphones_icon = document.querySelector(".fa-headphones");
const play_icon = document.querySelector(".fa-play");
const audioCtx = new AudioContext();
const canvasCtx = Array.from(canvas).map((canvas) => canvas.getContext("2d"));
let audioSource, audioAnalyzer, bufferLength, dataArray;

function playPaseBtn() {
  headphones_icon.classList.toggle("d-none");
  play_icon.classList.toggle("d-none");
}
// toggel button state fucntion end

// get extra info from audio file start
function audioInfo() {
  audioSource = audioCtx.createMediaElementSource(audio);
  // open analyzer method
  audioAnalyzer = audioCtx.createAnalyser();
  // connect analyzer to audio source
  audioSource.connect(audioAnalyzer);
  // connect analyzer to destination (speakers)
  audioAnalyzer.connect(audioCtx.destination);
  // get fft size (how much width the single audio wave )
  audioAnalyzer.fftSize = 2048;
  // bufferLength (half of fft size it'san read only property)
  bufferLength = audioAnalyzer.frequencyBinCount;
  // store frequency data a special type array (init it will be 0)
  dataArray = new Uint8Array(bufferLength);
}
// get extra info from audio file end

// canvas drawing start
function drawCanvas() {
  const barwidth = 2;
  const barGap = 5;
  let x, y, barHeight;

  function animate() {
    x = 0;
    audioAnalyzer.getByteFrequencyData(dataArray);
    console.log(dataArray);
    canvasCtx.map((ctx) =>
      ctx.clearRect(
        0,
        0,
        canvas.forEach((cnvs) => cnvs.width),
        canvas.forEach((cnvs) => cnvs.height)
      )
    );

    for (let index = 0; index < bufferLength; index++) {
      // data array update hoitcea na tai loop choltcea na
      barHeight = dataArray[index];
      y = canvas.forEach((cnvs) => cnvs.width) - barHeight;
      canvasCtx.map((ctx) => ctx.fillRect(x, y, barwidth, barHeight));

      x += barwidth + barGap;
    }
    requestAnimationFrame(animate);
  }
  animate();
}
// canvas drawing end

btnAudioPlay.forEach((button) => {
  button.addEventListener("click", () => {
    // 💥💥💥💥💥 button toggle function strat 💥💥💥💥💥💥💥
    playPaseBtn();
    // 💥💥💥💥💥 bytton toggle function end 💥💥💥💥💥💥💥

    // get info which icon are shown prcess start
    const btnAudioPlay_iTag = button.querySelectorAll("i");
    btnAudioPlay_iTag.forEach((iTag) => {
      if (!iTag.classList.contains("d-none")) {
        // start the audio
        audio.play();

        // 💥💥💥💥💥 audio analyzer function strat 💥💥💥💥💥💥💥
        audioInfo();
        // 💥💥💥💥💥 audio analyzer function end 💥💥💥💥💥💥💥💥

        // 💥💥💥💥💥 canvas draw function start 💥💥💥💥💥💥💥💥
        drawCanvas();
        // 💥💥💥💥💥 canvas draw function end 💥💥💥💥💥💥💥💥
      } else {
        // pause the audio
        audio.pause();
      }
    });
    // get info which icon are shown prcess end
  });
});

// ✅Audio Visualizer canvas draw end

//  @@@@@@@@@@@@@@@@ CUSTOM JS END @@@@@@@@@@@@@@@@
