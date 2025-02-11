init = function () {
  const box = document.getElementById("box");

  const getElements = function (elementId) {
    return [...Array(4).keys()].map((n) =>
      document.getElementById(elementId + n)
    );
  };

  const borderRadiusSliders = getElements("borderRadiusSlider");
  const borderRadiusCheckboxes = getElements("borderRadiusCheckbox");

  const borderStyleDropdowns = getElements("borderStyleDropdown");
  const borderStyleCheckboxes = getElements("borderStyleCheckbox");

  const sideInsetSliders = getElements("sideInsetSlider");
  const sideInsetCheckboxes = getElements("sideInsetCheckbox");

  const sideStyleDropdowns = getElements("sideStyleDropdown");
  const sideStyleCheckboxes = getElements("sideStyleCheckbox");

  let borderRadiusValuesActive = 0;
  let borderStyleValuesActive = 0;

  let sideInsetValuesActive = 0;
  let sideStyleValuesActive = 0;

  updateCorners = function () {
    box.attributeStyleMap.set(
      "--border-radius",
      [...borderRadiusSliders]
        .splice(0, borderRadiusValuesActive + 1)
        .map((slider) => CSS.px(slider.value).toString())
        .join(" ")
    );
  };
  for (const slider of borderRadiusSliders) {
    slider.oninput = updateCorners;
  }

  updateCornerStyles = function () {
    box.attributeStyleMap.set(
      "--corner-style",
      [...borderStyleDropdowns]
        .splice(0, borderStyleValuesActive + 1)
        .map((dropdown) => dropdown.value)
        .join(" ")
    );
  };
  for (const dropdown of borderStyleDropdowns) {
    dropdown.oninput = updateCornerStyles;
  }

  updateSides = function () {
    box.attributeStyleMap.set(
      "--side-inset",
      [...sideInsetSliders]
        .splice(0, sideInsetValuesActive + 1)
        .map((slider) => CSS.px(slider.value).toString())
        .join(" ")
    );
  };
  for (const slider of sideInsetSliders) {
    slider.oninput = updateSides;
  }

  updateSideStyles = function () {
    box.attributeStyleMap.set(
      "--side-style",
      [...sideStyleDropdowns]
        .splice(0, sideStyleValuesActive + 1)
        .map((dropdown) => dropdown.value)
        .join(" ")
    );
  };
  for (const dropdown of sideStyleDropdowns) {
    dropdown.oninput = updateSideStyles;
  }

  const updateBorderRadiusCheckboxes = (activeValue) => () => {
    borderRadiusValuesActive = activeValue;
    borderRadiusCheckboxes.forEach((checkbox, id) => {
      checkbox.checked = id > activeValue ? false : true;
    });
    updateCorners();
  };
  borderRadiusCheckboxes.forEach((checkbox, id) => {
    checkbox.oninput = updateBorderRadiusCheckboxes(id);
  });

  const updateBorderStyleCheckboxes = (activeValue) => () => {
    borderStyleValuesActive = activeValue;
    borderStyleCheckboxes.forEach((checkbox, id) => {
      checkbox.checked = id > activeValue ? false : true;
    });
    updateCornerStyles();
  };
  borderStyleCheckboxes.forEach((checkbox, id) => {
    checkbox.oninput = updateBorderStyleCheckboxes(id);
  });

  const updateSideInsetCheckboxes = (activeValue) => () => {
    sideInsetValuesActive = activeValue;
    sideInsetCheckboxes.forEach((checkbox, id) => {
      checkbox.checked = id > activeValue ? false : true;
    });
    updateSides();
  };
  sideInsetCheckboxes.forEach((checkbox, id) => {
    checkbox.oninput = updateSideInsetCheckboxes(id);
  });

  const updateSideStyleCheckboxes = (activeValue) => () => {
    sideStyleValuesActive = activeValue;
    sideStyleCheckboxes.forEach((checkbox, id) => {
      checkbox.checked = id > activeValue ? false : true;
    });
    updateSideStyles();
  };
  sideStyleCheckboxes.forEach((checkbox, id) => {
    checkbox.oninput = updateSideStyleCheckboxes(id);
  });

  updateCorners();
  updateCornerStyles();
  updateSides();
  updateSideStyles();
};

window.onload = init;

let revealStage = 0;
const reveal = function () {
  revealStage++;
  console.log("revealing", revealStage);

  const stageElements = document.getElementsByClassName(
    "reveal-" + revealStage
  );

  for (stageElement of stageElements) {
    stageElement.classList.remove("hidden");
  }
};

let stage = 0;
window.onkeyup = (event) => {
  if (event.key !== "n") {
    return;
  }
  stage++;

  const box = document.getElementById("box");

  switch (stage) {
    case 1:
      box.innerText = "A box";
      box.classList.remove("box-hidden");
      break;
    default:
      reveal();
  }
};
