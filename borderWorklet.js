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

  parseList(list) {
    return [
      list[0],
      list[1] || list[0],
      list[2] || list[0],
      list[3] || list[1] || list[0],
    ];
  }

  paint(ctx, geom, props) {
    // Use `ctx` as if it was a normal canvas
    console.log(props.get("--corner-style"));
    console.log(props.getAll("--corner-style"));

    const borderRadii = this.parseList(props.getAll("--border-radius")).map(
      (item) => item.value
    );
    const borderWidth = props.get("--border-width").value;
    const cornerStyles = this.parseList(
      props.get("--corner-style")[0].split(" ")
    );
    console.log(cornerStyles);

    ctx.beginPath();

    const corners = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
    ];

    const scale = (corner) => ({
      x: corner.x * geom.width + ((1 - corner.x * 2) * borderWidth) / 2,
      y: corner.y * geom.height + ((1 - corner.y * 2) * borderWidth) / 2,
    });

    for (let i = 0; i < corners.length; i++) {
      const previousCorner = corners[(i + corners.length - 1) % corners.length];
      const currentCorner = corners[i];
      const nextCorner = corners[(i + 1) % corners.length];

      this.drawCorner(
        ctx,
        scale(currentCorner),
        previousCorner.x + nextCorner.x - 2 * currentCorner.x,
        previousCorner.y + nextCorner.y - 2 * currentCorner.y,
        borderRadii[i],
        cornerStyles[i]
      );

      this.drawSide(
        ctx,
        scale(currentCorner),
        scale(nextCorner),
        nextCorner.x - currentCorner.x,
        nextCorner.y - currentCorner.y,
        borderRadii[i],
        borderRadii[(i + 1) % corners.length]
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

  drawSide(ctx, start, end, dx, dy, startBorderRadius, endBorderRadius) {
    // ctx.lineTo(start.x + dx * startBorderRadius, start.y + dy * startBorderRadius);
    ctx.lineTo(end.x - dx * endBorderRadius, end.y - dy * endBorderRadius);
  }

  drawCorner(ctx, corner, dx, dy, borderRadius, cornerStyle) {
    const mid = {
      x: corner.x + dx * borderRadius,
      y: corner.y + dy * borderRadius,
    };
    const end = {
      x: corner.x + ((dy + dx) / 2) * borderRadius,
      y: corner.y + ((dy - dx) / 2) * borderRadius,
    };
    const n = Math.abs(dx + dy) / 2 + (dx + 1);

    switch (cornerStyle) {
      case "rounded":
        ctx.arc(
          mid.x,
          mid.y,
          borderRadius,
          ((n - 1) * Math.PI) / 2,
          (n * Math.PI) / 2
        );
        break;

      case "scoop":
        ctx.arc(
          corner.x,
          corner.y,
          borderRadius,
          ((n + 2) * Math.PI) / 2,
          ((n + 1) * Math.PI) / 2,
          true
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
