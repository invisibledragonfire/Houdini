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

    const borderRadius = 10;

    ctx.beginPath();
    ctx.moveTo(0, borderRadius);
    this.drawSide(
      ctx,
      { x: 0, y: 0 },
      { x: 0, y: geom.height },
      0,
      1,
      borderRadius
    );
    this.drawCorner(ctx, { x: 0, y: geom.height }, 1, -1, borderRadius);
    this.drawSide(
      ctx,
      { x: 0, y: geom.height },
      { x: geom.width, y: geom.height },
      -1,
      0,
      borderRadius
    );
    this.drawCorner(
      ctx,
      { x: geom.width, y: geom.height },
      -1,
      -1,
      borderRadius
    );
    this.drawSide(
      ctx,
      { x: geom.width, y: geom.height },
      { x: geom.width, y: 0 },
      0,
      -1,
      borderRadius
    );
    this.drawCorner(ctx, { x: geom.width, y: 0 }, -1, 1, borderRadius);
    this.drawSide(
      ctx,
      { x: geom.width, y: 0 },
      { x: 0, y: 0 },
      1,
      0,
      borderRadius
    );
    this.drawCorner(ctx, { x: 0, y: 0 }, 1, 1, borderRadius);

    ctx.lineWidth = 2;
    ctx.fillStyle = props.get("--background-color");
    ctx.fill();
    ctx.strokeStyle = props.get("--border-color");
    ctx.lineWidth = props.get("--border-width");
    ctx.stroke();
  }

  drawSide(ctx, start, end, dx, dy, borderRadius) {
    ctx.lineTo(start.x + dx * borderRadius, start.y + dy * borderRadius);
    ctx.lineTo(end.x - dx * borderRadius, end.y - dy * borderRadius);
  }

  drawCorner(ctx, corner, dx, dy, borderRadius) {
    ctx.lineTo(corner.x, corner.y);
    ctx.lineTo(
      corner.x + ((dx - dy) / 2) * borderRadius,
      corner.y + ((dx + dy) / 2) * borderRadius
    );
  }
}

registerPaint("fancy-border", BorderPainter);
