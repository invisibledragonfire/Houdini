init = function () {
  const box = document.getElementById("box");

  getElements = function (elementId) {
    return [...Array(4).keys()].map((n) =>
      document.getElementById(elementId + n)
    );
  };

  const borderRadiusSliders = getElements("borderRadiusSlider");
  const borderRadiusCheckboxes = getElements("borderRadiusCheckbox");

  const borderStyleCheckboxes = getElements("borderStyleCheckbox");
  const borderStyleDropdowns = getElements("borderStyleDropdown");

  let borderRadiusValuesActive = 0;
  let borderStyleValuesActive = 0;

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
};

window.onload = init;
