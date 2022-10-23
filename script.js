let consentButtonClicked = false;

const output = document.getElementById("output");

const pokeballDiv = document.getElementById("pokeball");

const consentButton = document.getElementById("consent");

let startingA = 0;
let startingB = 0;
let startingG = 0;

consentButton.onclick = function () {
  if (!consentButtonClicked) {
    window.removeEventListener("deviceorientation", handleOrientation);
    if (typeof DeviceMotionEvent.requestPermission === "function") {
      // Handle iOS 13+ devices.
      DeviceMotionEvent.requestPermission()
        .then((state) => {
          if (state === "granted") {
            window.addEventListener("deviceorientation", handleOrientation);
          } else {
            console.error("Request to access the orientation was rejected");
          }
        })
        .catch(console.error);
    } else {
      // Handle regular non iOS 13+ devices.
      window.addEventListener("deviceorientation", handleOrientation);
    }
  }
};

function handleOrientation(event) {
  const a = Math.round(event.alpha);
  const b = Math.round(event.beta);
  const g = Math.round(event.gamma);
  if (!consentButtonClicked) {
    startingA = a;
    startingB = b;
    startingG = g;
    consentButtonClicked = true;
  }
  output.innerHTML = `Alpha: ${a} | Beta: ${b} | Gamma: ${g}`;
  pokeballDiv.style.transform = `rotateY(${a - startingA}deg) rotateZ(90deg)`;
}

// adapted from https://codepen.io/Sukk4/pen/VjNowW
const Pokeball = function () {
  this.create = function () {
    for (let i = 0; i < 18; i++) {
      for (let j = 0; j < 9; j++) {
        const d = document.createElement("div");
        if (i > 9) {
          d.className = "red";
        } else if (i === 0 || i === 9) {
          d.className = "black";
        } else {
          d.className = "white";
        }
        d.style.transform = "rotateX(" + j * 20 + "deg) rotateY(" + i * 20 + "deg) translateZ(57px) ";
        pokeballDiv.appendChild(d);
      }
    }
    const nappi = document.createElement("div");
    nappi.className = "nappi";
    pokeballDiv.appendChild(nappi);
  };
};
const pallo = new Pokeball();
pallo.create();
