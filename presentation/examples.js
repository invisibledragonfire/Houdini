window.onkeyup = (event) => {
  if (event.key !== "n") {
    return;
  }

  let exampleNumber = window.location.href
    .split("/")
    .pop()
    .split(".")[0]
    .slice(-1);

  exampleNumber++;

  window.open(`/presentation/example${exampleNumber}`, "_self");
};
