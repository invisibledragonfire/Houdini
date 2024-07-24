class BorderPainter {
  static get inputProperties() {
    return [
      "--border-color",
      "--background-color",
      "--border-width",
      "--border-radius",
    ];
  }

  paint(ctx, geom, props) {
    // Use `ctx` as if it was a normal canvas
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, geom.height);
    ctx.lineTo(geom.width, geom.height);
    ctx.lineTo(geom.width, 0);
    ctx.lineTo(0, 0);
    ctx.lineWidth = 2;
    ctx.fillStyle = props.get("--background-color");
    ctx.fill();
    ctx.strokeStyle = props.get("--border-color");
    ctx.lineWidth = props.get("--border-width");
    ctx.stroke();
  }
}

registerPaint("fancy-border", BorderPainter);
