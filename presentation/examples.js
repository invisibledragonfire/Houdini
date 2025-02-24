examplesAvailable = 3;
let exampleNumber = 0;

window.onkeyup = (event) => {
  if (event.key !== "n") {
    return;
  }

  if (exampleNumber > examplesAvailable) {
    window.open(`presentation.html`, "_self");
  } else {
    window.open(`example${exampleNumber}.html`, "_self");
  }
};

window.onload = function () {
  exampleNumber = window.location.href.split("/").pop().split(".")[0].slice(-1);

  exampleNumber++;

  const infoAction = document.getElementById("action");

  if (exampleNumber > examplesAvailable) {
    infoAction.textContent = "go back to the start";
  }

  const infoElement = document.getElementById("info");
  infoElement.classList.remove("info-hidden");
};
