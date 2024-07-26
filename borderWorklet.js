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

    const borderRadius = props.get("--border-radius").value;
    const borderWidth = props.get("--border-width").value;
    const cornerStyle = "scoop";

    ctx.beginPath();

    const corners = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 0 },
    ];

    const scale = (corner) => ({
      x: corner.x * geom.width + ((1 - corner.x * 2) * borderWidth) / 2,
      y: corner.y * geom.height + ((1 - corner.y * 2) * borderWidth) / 2,
    });

    for (let i = 0; i < corners.length; i++) {
      const previousCorner = corners[i];
      const currentCorner = corners[(i + 1) % corners.length];
      const nextCorner = corners[(i + 2) % corners.length];

      this.drawSide(
        ctx,
        scale(previousCorner),
        scale(currentCorner),
        currentCorner.x - previousCorner.x,
        currentCorner.y - previousCorner.y,
        borderRadius
      );

      this.drawCorner(
        ctx,
        scale(currentCorner),
        previousCorner.x + nextCorner.x - 2 * currentCorner.x,
        previousCorner.y + nextCorner.y - 2 * currentCorner.y,
        borderRadius,
        cornerStyle
      );
    }

    ctx.closePath();

    ctx.lineWidth = 2;
    ctx.fillStyle = props.get("--background-color");
    ctx.fill();
    ctx.strokeStyle = props.get("--border-color");
    ctx.lineWidth = borderWidth;
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
