class BorderPainter {
  static get inputProperties() {
    return [
      "--border-color",
      "--background-color",
      "--border-width",
      "--border-radius",
      "--corner-style",
    ];
  }

  paint(ctx, geom, props) {
    // Use `ctx` as if it was a normal canvas

    const borderRadius = props.get("--border-radius");
    const cornerStyle = "scoop";

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
    this.drawCorner(
      ctx,
      { x: 0, y: geom.height },
      1,
      -1,
      borderRadius,
      cornerStyle
    );
    this.drawSide(
      ctx,
      { x: 0, y: geom.height },
      { x: geom.width, y: geom.height },
      1,
      0,
      borderRadius
    );
    this.drawCorner(
      ctx,
      { x: geom.width, y: geom.height },
      -1,
      -1,
      borderRadius,
      cornerStyle
    );
    this.drawSide(
      ctx,
      { x: geom.width, y: geom.height },
      { x: geom.width, y: 0 },
      0,
      -1,
      borderRadius
    );
    this.drawCorner(
      ctx,
      { x: geom.width, y: 0 },
      -1,
      1,
      borderRadius,
      cornerStyle
    );
    this.drawSide(
      ctx,
      { x: geom.width, y: 0 },
      { x: 0, y: 0 },
      -1,
      0,
      borderRadius
    );
    this.drawCorner(ctx, { x: 0, y: 0 }, 1, 1, borderRadius, cornerStyle);

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

  drawCorner(ctx, corner, dx, dy, borderRadius, cornerStyle) {
    const mid = {
      x: corner.x + dx * borderRadius,
      y: corner.y + dy * borderRadius,
    };
    const end = {
      x: corner.x + ((dx - dy) / 2) * borderRadius,
      y: corner.y + ((dx + dy) / 2) * borderRadius,
    };
    const n = Math.abs(dx + dy) / 2 + (dx + 1);

    switch (cornerStyle) {
      case "rounded":
        ctx.arc(
          mid.x,
          mid.y,
          borderRadius,
          (n * Math.PI) / 2,
          ((n - 1) * Math.PI) / 2,
          true
        );
        break;

      case "scoop":
        ctx.arc(
          corner.x,
          corner.y,
          borderRadius,
          (((n + 1) % 4) * Math.PI) / 2,
          (((n + 2) % 4) * Math.PI) / 2
        );
        break;

      case "notch":
        ctx.lineTo(mid.x, mid.y);
        ctx.lineTo(end.x, end.y);
        break;

      case "bevel":
        ctx.lineTo(end.x, end.y);
        break;

      default:
        ctx.lineTo(corner.x, corner.y);
        ctx.lineTo(end.x, end.y);
    }
  }
}

registerPaint("fancy-border", BorderPainter);
