const canvas = document.querySelector("#businessCanvas");
const ctx = canvas.getContext("2d");
const manualDeskPhoto = new Image();

manualDeskPhoto.decoding = "async";
manualDeskPhoto.src = "public/tiger-manual-desk-photo.png";

const palette = {
  charcoal: "#101317",
  ink: "#171b21",
  paper: "#f8f4eb",
  mutedPaper: "#d8d3ca",
  amber: "#f59e0b",
  tiger: "#f97316",
  green: "#34d399",
  sky: "#7dd3fc",
  red: "#fca5a5",
  white: "#ffffff",
};

const manualInputs = [
  { label: "Paper bills", type: "invoice", x: 58, y: 112, w: 158, h: 100, delay: 0 },
  { label: "Stock book", type: "book", x: 206, y: 246, w: 168, h: 104, delay: 0.18 },
  { label: "WhatsApp orders", type: "chat", x: 58, y: 382, w: 176, h: 104, delay: 0.36 },
  { label: "Payment notes", type: "payment", x: 240, y: 478, w: 154, h: 96, delay: 0.54 },
  { label: "Attendance", type: "attendance", x: 70, y: 520, w: 144, h: 92, delay: 0.72 },
];

const desktopManualObjects = [
  { label: "Invoice files", type: "files", x: 54, y: 106, anchorX: 236, anchorY: 162, delay: 0 },
  { label: "Stock cartons", type: "cartons", x: 246, y: 96, anchorX: 382, anchorY: 160, delay: 0.12 },
  { label: "Register + pen", type: "register", x: 150, y: 252, anchorX: 368, anchorY: 310, delay: 0.24 },
  { label: "Calculator", type: "calculator", x: 58, y: 386, anchorX: 184, anchorY: 438, delay: 0.36 },
  { label: "Cash bundle", type: "cash", x: 246, y: 468, anchorX: 372, anchorY: 512, delay: 0.48 },
  { label: "Phone order", type: "phone", x: 70, y: 488, anchorX: 186, anchorY: 530, delay: 0.6 },
];

const processSteps = ["Understand", "Simplify", "Digitise", "Connect", "Automate"];

const dashboardMetrics = [
  { label: "Sales", value: "INR 82K", accent: palette.amber },
  { label: "Payments", value: "14 due", accent: palette.tiger },
  { label: "Stock", value: "2,840", accent: palette.sky },
  { label: "Orders", value: "36 open", accent: palette.green },
  { label: "Attendance", value: "94%", accent: palette.green },
  { label: "Reports", value: "Ready", accent: palette.amber },
];

const activityFeed = [
  "Low-stock alert",
  "Payment reminder",
  "Order moved to delivery",
  "Daily report ready",
];

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function roundRect(x, y, width, height, radius) {
  const size = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + size, y);
  ctx.arcTo(x + width, y, x + width, y + height, size);
  ctx.arcTo(x + width, y + height, x, y + height, size);
  ctx.arcTo(x, y + height, x, y, size);
  ctx.arcTo(x, y, x + width, y, size);
  ctx.closePath();
}

function drawText(text, x, y, size, weight = 800, color = palette.white, align = "left") {
  ctx.fillStyle = color;
  ctx.font = `${weight} ${size}px system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif`;
  ctx.textAlign = align;
  ctx.textBaseline = "alphabetic";
  ctx.fillText(text, x, y);
}

function drawCoverImage(image, x, y, width, height) {
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const sourceW = width / scale;
  const sourceH = height / scale;
  const sourceX = (image.naturalWidth - sourceW) / 2;
  const sourceY = (image.naturalHeight - sourceH) / 2;
  ctx.drawImage(image, sourceX, sourceY, sourceW, sourceH, x, y, width, height);
}

function drawLabelPill(text, x, y, color, fill) {
  ctx.save();
  ctx.font = "900 12px system-ui";
  const width = Math.max(92, ctx.measureText(text).width + 26);
  ctx.fillStyle = fill;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  roundRect(x, y, width, 34, 17);
  ctx.fill();
  ctx.stroke();
  drawText(text, x + 13, y + 22, 12, 900, color);
  ctx.restore();
}

function drawBackground(width, height, time) {
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#0d1013");
  gradient.addColorStop(0.55, "#111418");
  gradient.addColorStop(1, "#1b2028");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,.045)";
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += 32) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  ctx.restore();
}

function drawManualIcon(type, x, y) {
  ctx.save();
  ctx.strokeStyle = palette.tiger;
  ctx.fillStyle = "rgba(249,115,22,.12)";
  ctx.lineWidth = 2;
  roundRect(x, y, 34, 34, 8);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = palette.tiger;
  ctx.lineWidth = 2.2;
  if (type === "invoice") {
    ctx.beginPath();
    ctx.moveTo(x + 10, y + 11);
    ctx.lineTo(x + 24, y + 11);
    ctx.moveTo(x + 10, y + 18);
    ctx.lineTo(x + 24, y + 18);
    ctx.moveTo(x + 10, y + 25);
    ctx.lineTo(x + 20, y + 25);
    ctx.stroke();
  } else if (type === "book") {
    ctx.beginPath();
    ctx.moveTo(x + 12, y + 8);
    ctx.lineTo(x + 12, y + 27);
    ctx.moveTo(x + 17, y + 14);
    ctx.lineTo(x + 26, y + 14);
    ctx.moveTo(x + 17, y + 21);
    ctx.lineTo(x + 26, y + 21);
    ctx.stroke();
  } else if (type === "chat") {
    roundRect(x + 8, y + 9, 19, 15, 4);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x + 13, y + 24);
    ctx.lineTo(x + 9, y + 29);
    ctx.lineTo(x + 18, y + 24);
    ctx.stroke();
  } else if (type === "payment") {
    ctx.beginPath();
    ctx.moveTo(x + 9, y + 16);
    ctx.lineTo(x + 25, y + 16);
    ctx.moveTo(x + 10, y + 23);
    ctx.lineTo(x + 21, y + 23);
    ctx.stroke();
    drawText("Rs", x + 10, y + 15, 10, 900, palette.tiger);
  } else {
    ctx.beginPath();
    ctx.arc(x + 17, y + 13, 5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.moveTo(x + 9, y + 28);
    ctx.bezierCurveTo(x + 10, y + 21, x + 24, y + 21, x + 25, y + 28);
    ctx.stroke();
  }
  ctx.restore();
}

function drawManualCard(item, time) {
  const bob = Math.sin(time * 1.6 + item.delay * 8) * 3;
  ctx.save();
  ctx.translate(item.x, item.y + bob);
  ctx.rotate((item.delay - 0.36) * 0.08);
  ctx.shadowColor = "rgba(0,0,0,.28)";
  ctx.shadowBlur = 22;
  ctx.shadowOffsetY = 12;
  ctx.fillStyle = palette.paper;
  roundRect(0, 0, item.w, item.h, 14);
  ctx.fill();
  ctx.shadowBlur = 0;
  drawManualIcon(item.type, 16, 16);
  drawText(item.label, 62, 39, 15, 900, palette.charcoal);
  ctx.globalAlpha = 0.18;
  ctx.fillStyle = palette.charcoal;
  roundRect(18, 62, item.w - 36, 8, 4);
  ctx.fill();
  roundRect(18, 80, item.w - 72, 8, 4);
  ctx.fill();
  ctx.restore();
}

function drawDeskSurface(time) {
  ctx.save();
  const gradient = ctx.createLinearGradient(30, 210, 410, 650);
  gradient.addColorStop(0, "rgba(92,61,41,.72)");
  gradient.addColorStop(1, "rgba(36,24,18,.9)");
  ctx.fillStyle = gradient;
  ctx.shadowColor = "rgba(0,0,0,.34)";
  ctx.shadowBlur = 30;
  ctx.shadowOffsetY = 20;
  ctx.beginPath();
  ctx.moveTo(34, 228);
  ctx.lineTo(390, 178);
  ctx.lineTo(438, 636);
  ctx.lineTo(20, 652);
  ctx.closePath();
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.strokeStyle = "rgba(245,158,11,.12)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 8; i += 1) {
    ctx.beginPath();
    ctx.moveTo(42 + i * 48, 242 + Math.sin(time + i) * 2);
    ctx.lineTo(66 + i * 44, 632);
    ctx.stroke();
  }
  ctx.restore();
}

function drawStackedFiles(x, y, time, showLabel = true) {
  ctx.save();
  ctx.translate(x, y + Math.sin(time * 1.4) * 2);
  ctx.rotate(-0.04);
  for (let i = 0; i < 9; i += 1) {
    ctx.fillStyle = i % 2 ? "#ebe4d9" : palette.paper;
    ctx.shadowColor = i === 8 ? "rgba(0,0,0,.24)" : "transparent";
    ctx.shadowBlur = i === 8 ? 18 : 0;
    ctx.shadowOffsetY = i === 8 ? 10 : 0;
    roundRect(i * 2, 58 - i * 6, 172, 88, 8);
    ctx.fill();
    ctx.strokeStyle = "rgba(17,20,24,.12)";
    ctx.stroke();
  }
  ctx.shadowBlur = 0;
  ctx.fillStyle = "#2f3339";
  roundRect(72, 6, 44, 18, 5);
  ctx.fill();
  ctx.strokeStyle = "rgba(17,20,24,.28)";
  ctx.lineWidth = 2;
  for (let row = 0; row < 5; row += 1) {
    ctx.beginPath();
    ctx.moveTo(26, 78 + row * 12);
    ctx.lineTo(142, 78 + row * 12);
    ctx.stroke();
  }
  if (showLabel) {
    drawText("Invoice files", 24, 168, 14, 900, "#fecaca");
  }
  ctx.restore();
}

function drawCartons(x, y, time, showLabel = true) {
  const bob = Math.sin(time * 1.2 + 1.2) * 2;
  ctx.save();
  ctx.translate(x, y + bob);
  const boxes = [
    [0, 46, 74, 60],
    [64, 28, 78, 78],
    [36, 0, 92, 62],
  ];
  boxes.forEach(([bx, by, bw, bh], index) => {
    const grad = ctx.createLinearGradient(bx, by, bx + bw, by + bh);
    grad.addColorStop(0, "#c9833b");
    grad.addColorStop(1, "#8d5526");
    ctx.fillStyle = grad;
    ctx.shadowColor = "rgba(0,0,0,.25)";
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 8;
    roundRect(bx, by, bw, bh, 8);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(255,255,255,.16)";
    ctx.stroke();
    ctx.strokeStyle = "rgba(55,32,14,.46)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(bx + bw / 2, by + 4);
    ctx.lineTo(bx + bw / 2, by + bh - 4);
    ctx.stroke();
    if (index === 2) {
      ctx.fillStyle = "rgba(245,158,11,.25)";
      roundRect(bx + 20, by + 18, 52, 12, 4);
      ctx.fill();
    }
  });
  if (showLabel) {
    drawText("Stock cartons", 4, 132, 14, 900, "#fecaca");
  }
  ctx.restore();
}

function drawRegisterAndPen(x, y, time, showLabel = true) {
  ctx.save();
  ctx.translate(x, y + Math.sin(time * 1.3 + 2) * 2);
  ctx.rotate(0.025);
  ctx.fillStyle = "#efe7db";
  ctx.shadowColor = "rgba(0,0,0,.28)";
  ctx.shadowBlur = 22;
  ctx.shadowOffsetY = 12;
  roundRect(0, 0, 212, 120, 12);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.fillStyle = "#e3d8c9";
  roundRect(102, 0, 10, 120, 4);
  ctx.fill();
  ctx.strokeStyle = "rgba(17,20,24,.17)";
  ctx.lineWidth = 1.5;
  for (let row = 0; row < 7; row += 1) {
    ctx.beginPath();
    ctx.moveTo(18, 22 + row * 13);
    ctx.lineTo(88, 22 + row * 13);
    ctx.moveTo(126, 22 + row * 13);
    ctx.lineTo(194, 22 + row * 13);
    ctx.stroke();
  }
  ctx.save();
  ctx.translate(132, 86);
  ctx.rotate(-0.6);
  ctx.fillStyle = "#111418";
  roundRect(0, 0, 88, 9, 5);
  ctx.fill();
  ctx.fillStyle = palette.amber;
  roundRect(64, 0, 18, 9, 5);
  ctx.fill();
  ctx.restore();
  if (showLabel) {
    drawText("Register + pen", 18, 148, 14, 900, "#fecaca");
  }
  ctx.restore();
}

function drawCalculatorObject(x, y, time, showLabel = true) {
  ctx.save();
  ctx.translate(x, y + Math.sin(time * 1.5 + 3) * 2);
  ctx.rotate(-0.03);
  ctx.fillStyle = "#242a33";
  ctx.shadowColor = "rgba(0,0,0,.32)";
  ctx.shadowBlur = 20;
  ctx.shadowOffsetY = 10;
  roundRect(0, 0, 122, 102, 13);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.fillStyle = "#d8edc3";
  roundRect(14, 12, 94, 24, 6);
  ctx.fill();
  ctx.fillStyle = "rgba(17,20,24,.38)";
  drawText("1280", 94, 30, 13, 900, "rgba(17,20,24,.62)", "right");
  for (let row = 0; row < 4; row += 1) {
    for (let col = 0; col < 4; col += 1) {
      ctx.fillStyle = col === 3 ? "rgba(245,158,11,.75)" : "rgba(255,255,255,.16)";
      roundRect(14 + col * 24, 48 + row * 12, 16, 8, 3);
      ctx.fill();
    }
  }
  if (showLabel) {
    drawText("Calculator", 6, 130, 14, 900, "#fecaca");
  }
  ctx.restore();
}

function drawCashBundle(x, y, time, showLabel = true) {
  ctx.save();
  ctx.translate(x, y + Math.sin(time * 1.2 + 4) * 2);
  ctx.rotate(-0.02);
  for (let i = 0; i < 5; i += 1) {
    ctx.fillStyle = i % 2 ? "#bcd4a8" : "#dbeacb";
    ctx.shadowColor = i === 4 ? "rgba(0,0,0,.22)" : "transparent";
    ctx.shadowBlur = i === 4 ? 18 : 0;
    ctx.shadowOffsetY = i === 4 ? 8 : 0;
    roundRect(i * 4, 22 - i * 4, 136, 58, 8);
    ctx.fill();
    ctx.strokeStyle = "rgba(17,20,24,.14)";
    ctx.stroke();
  }
  ctx.fillStyle = "#8d5526";
  roundRect(50, 0, 42, 70, 7);
  ctx.fill();
  ctx.strokeStyle = "rgba(17,20,24,.25)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(72, 36, 14, 0, Math.PI * 2);
  ctx.stroke();
  if (showLabel) {
    drawText("Cash bundle", 6, 106, 14, 900, "#fecaca");
  }
  ctx.restore();
}

function drawPhoneOrder(x, y, time, showLabel = true) {
  ctx.save();
  ctx.translate(x, y + Math.sin(time * 1.4 + 5) * 2);
  ctx.rotate(0.04);
  ctx.fillStyle = "#111418";
  ctx.shadowColor = "rgba(0,0,0,.34)";
  ctx.shadowBlur = 20;
  ctx.shadowOffsetY = 10;
  roundRect(0, 0, 104, 92, 16);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(255,255,255,.08)";
  roundRect(10, 14, 84, 64, 10);
  ctx.fill();
  ctx.fillStyle = "rgba(52,211,153,.25)";
  roundRect(20, 24, 52, 16, 8);
  ctx.fill();
  ctx.fillStyle = "rgba(245,158,11,.25)";
  roundRect(32, 48, 44, 16, 8);
  ctx.fill();
  if (showLabel) {
    drawText("Phone order", -2, 118, 14, 900, "#fecaca");
  }
  ctx.restore();
}

function drawManualDeskScene(time) {
  drawDeskSurface(time);
  desktopManualObjects.forEach((item) => {
    if (item.type === "files") {
      drawStackedFiles(item.x, item.y, time);
    } else if (item.type === "cartons") {
      drawCartons(item.x, item.y, time);
    } else if (item.type === "register") {
      drawRegisterAndPen(item.x, item.y, time);
    } else if (item.type === "calculator") {
      drawCalculatorObject(item.x, item.y, time);
    } else if (item.type === "cash") {
      drawCashBundle(item.x, item.y, time);
    } else if (item.type === "phone") {
      drawPhoneOrder(item.x, item.y, time);
    }
  });
}

function drawCompactManualDeskScene(width, time) {
  const scale = Math.min(0.62, Math.max(0.48, width / 760));
  const sceneWidth = 420 * scale;
  const offsetX = (width - sceneWidth) / 2 - 8;
  const offsetY = 72;

  ctx.save();
  ctx.translate(offsetX, offsetY);
  ctx.scale(scale, scale);
  drawStackedFiles(10, 24, time);
  drawCartons(250, 18, time);
  drawRegisterAndPen(122, 182, time);
  drawCalculatorObject(12, 338, time);
  drawCashBundle(246, 368, time);
  drawPhoneOrder(80, 470, time);
  ctx.restore();

  return [
    { x: offsetX + 190 * scale, y: offsetY + 102 * scale, delay: 0 },
    { x: offsetX + 392 * scale, y: offsetY + 88 * scale, delay: 0.12 },
    { x: offsetX + 334 * scale, y: offsetY + 244 * scale, delay: 0.24 },
    { x: offsetX + 136 * scale, y: offsetY + 390 * scale, delay: 0.36 },
    { x: offsetX + 390 * scale, y: offsetY + 414 * scale, delay: 0.48 },
    { x: offsetX + 184 * scale, y: offsetY + 516 * scale, delay: 0.6 },
  ];
}

function drawPhoneManualDeskScene(width, y, time) {
  const panelX = 14;
  const panelW = width - 28;
  const panelH = 392;
  const sceneScale = Math.min(0.68, Math.max(0.53, panelW / 520));
  const sceneX = panelX + (panelW - 520 * sceneScale) / 2;
  const sceneY = y + 42;

  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,.38)";
  ctx.shadowBlur = 28;
  ctx.shadowOffsetY = 18;
  roundRect(panelX, y, panelW, panelH, 18);
  ctx.fillStyle = "#0e1114";
  ctx.fill();
  ctx.shadowBlur = 0;

  const photoGradient = ctx.createLinearGradient(panelX, y, panelX + panelW, y + panelH);
  photoGradient.addColorStop(0, "rgba(10,12,14,.98)");
  photoGradient.addColorStop(0.48, "rgba(30,24,18,.96)");
  photoGradient.addColorStop(1, "rgba(78,45,18,.9)");
  ctx.fillStyle = photoGradient;
  roundRect(panelX, y, panelW, panelH, 18);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,.12)";
  ctx.stroke();

  ctx.save();
  roundRect(panelX, y, panelW, panelH, 18);
  ctx.clip();

  const hasPhoto = manualDeskPhoto.complete && manualDeskPhoto.naturalWidth > 0;
  if (hasPhoto) {
    drawCoverImage(manualDeskPhoto, panelX, y, panelW, panelH);
    const photoShade = ctx.createLinearGradient(panelX, y, panelX + panelW, y);
    photoShade.addColorStop(0, "rgba(5,7,9,.2)");
    photoShade.addColorStop(0.58, "rgba(5,7,9,.04)");
    photoShade.addColorStop(1, "rgba(245,158,11,.12)");
    ctx.fillStyle = photoShade;
    ctx.fillRect(panelX, y, panelW, panelH);
  } else {
    const tableGlow = ctx.createRadialGradient(panelX + panelW * 0.88, y + panelH * 0.42, 10, panelX + panelW * 0.88, y + panelH * 0.42, panelW * 0.76);
    tableGlow.addColorStop(0, "rgba(245,158,11,.28)");
    tableGlow.addColorStop(0.45, "rgba(245,158,11,.08)");
    tableGlow.addColorStop(1, "rgba(245,158,11,0)");
    ctx.fillStyle = tableGlow;
    ctx.fillRect(panelX, y, panelW, panelH);

    ctx.strokeStyle = "rgba(255,255,255,.055)";
    ctx.lineWidth = 1;
    for (let row = 0; row < 8; row += 1) {
      ctx.beginPath();
      ctx.moveTo(panelX + 18, y + 78 + row * 34);
      ctx.lineTo(panelX + panelW - 18, y + 56 + row * 34);
      ctx.stroke();
    }

    ctx.save();
    ctx.translate(sceneX, sceneY);
    ctx.scale(sceneScale, sceneScale);
    drawStackedFiles(10, 12, time, false);
    drawCartons(318, 8, time, false);
    drawRegisterAndPen(126, 162, time, false);
    drawCalculatorObject(4, 304, time, false);
    drawPhoneOrder(184, 362, time, false);
    drawCashBundle(354, 342, time, false);

    ctx.save();
    ctx.translate(106, 364);
    ctx.rotate(-0.12);
    ctx.fillStyle = "#efe7db";
    roundRect(0, 0, 126, 52, 7);
    ctx.fill();
    ctx.strokeStyle = "rgba(17,20,24,.16)";
    ctx.stroke();
    ctx.strokeStyle = "rgba(17,20,24,.15)";
    for (let line = 0; line < 4; line += 1) {
      ctx.beginPath();
      ctx.moveTo(12, 14 + line * 9);
      ctx.lineTo(108, 14 + line * 9);
      ctx.stroke();
    }
    ctx.fillStyle = palette.amber;
    roundRect(68, 28, 28, 5, 3);
    ctx.fill();
    ctx.restore();

    ctx.restore();
  }

  const edgeGlow = ctx.createRadialGradient(panelX + panelW, y + panelH * 0.48, 4, panelX + panelW, y + panelH * 0.48, panelW * 0.58);
  edgeGlow.addColorStop(0, "rgba(245,158,11,.36)");
  edgeGlow.addColorStop(0.42, "rgba(245,158,11,.09)");
  edgeGlow.addColorStop(1, "rgba(245,158,11,0)");
  ctx.fillStyle = edgeGlow;
  ctx.fillRect(panelX, y, panelW, panelH);

  const badges = [
    ["Invoices", panelX + 18, y + 24],
    ["Stock", panelX + panelW - 74, y + 26],
    ["Calls", panelX + panelW - 70, y + panelH - 58],
  ];
  badges.forEach(([label, bx, by]) => {
    ctx.fillStyle = "rgba(17,20,24,.72)";
    ctx.strokeStyle = "rgba(245,158,11,.34)";
    roundRect(bx, by, 56, 24, 8);
    ctx.fill();
    ctx.stroke();
    drawText(label, bx + 28, by + 16, 9, 900, palette.amber, "center");
  });

  ctx.restore();
  ctx.restore();

  const sourceY = y + panelH - 10;
  return [
    { x: panelX + panelW * 0.18, y: sourceY, delay: 0 },
    { x: panelX + panelW * 0.34, y: sourceY, delay: 0.12 },
    { x: panelX + panelW * 0.5, y: sourceY, delay: 0.24 },
    { x: panelX + panelW * 0.66, y: sourceY, delay: 0.36 },
    { x: panelX + panelW * 0.82, y: sourceY, delay: 0.48 },
  ];
}

function cubicPoint(p0, p1, p2, p3, t) {
  const u = 1 - t;
  return {
    x: u ** 3 * p0.x + 3 * u ** 2 * t * p1.x + 3 * u * t ** 2 * p2.x + t ** 3 * p3.x,
    y: u ** 3 * p0.y + 3 * u ** 2 * t * p1.y + 3 * u * t ** 2 * p2.y + t ** 3 * p3.y,
  };
}

function drawParticle(point, radius, color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 18;
  ctx.beginPath();
  ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawStableTTHub(cx, cy, scale = 1) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);

  ctx.fillStyle = "#101317";
  ctx.strokeStyle = "rgba(245,158,11,.38)";
  ctx.lineWidth = 1.5;
  ctx.shadowColor = "rgba(245,158,11,.22)";
  ctx.shadowBlur = 26;
  roundRect(-104, -86, 208, 172, 28);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.stroke();

  ctx.fillStyle = "rgba(255,255,255,.06)";
  roundRect(-88, -70, 176, 28, 10);
  ctx.fill();
  drawText("BUSINESS SYSTEM", 0, -51, 11, 900, "rgba(255,255,255,.56)", "center");

  [
    { x: 0, y: -86 },
    { x: 104, y: 0 },
    { x: 0, y: 86 },
    { x: -104, y: 0 },
  ].forEach((point) => {
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(245,158,11,.5)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(point.x * 0.82, point.y * 0.82);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();

    ctx.fillStyle = palette.amber;
    ctx.shadowColor = "rgba(245,158,11,.55)";
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.shadowBlur = 0;
  ctx.fillStyle = palette.amber;
  ctx.shadowColor = "rgba(245,158,11,.6)";
  ctx.shadowBlur = 28;
  roundRect(-52, -36, 104, 72, 18);
  ctx.fill();
  ctx.fillStyle = palette.charcoal;
  ctx.shadowBlur = 0;
  roundRect(-40, -24, 80, 48, 13);
  ctx.fill();
  drawText("TT", 0, 15, 44, 900, palette.amber, "center");

  ctx.fillStyle = "rgba(245,158,11,.12)";
  roundRect(-64, 50, 128, 18, 8);
  ctx.fill();
  drawText("AUTOMATION", 0, 63, 10, 900, palette.amber, "center");
  ctx.restore();
}

function drawProcessCore(cx, cy, time, compact = false) {
  drawStableTTHub(cx, cy);

  const activeStep = Math.floor((time * 1.2) % processSteps.length);
  processSteps.forEach((step, index) => {
    const compactRow = index < 3 ? 0 : 1;
    const compactCol = index < 3 ? index : index - 3;
    const compactOffset = index < 3 ? -138 : -92;
    const x = compact ? cx + compactOffset + compactCol * 92 : cx - 226 + index * 113;
    const y = compact ? cy + 110 + compactRow * 40 : cy + 142;
    const width = compact ? 84 : 96;
    const isActive = index === activeStep;
    ctx.save();
    ctx.fillStyle = isActive ? "rgba(245,158,11,.24)" : "rgba(255,255,255,.075)";
    ctx.strokeStyle = isActive ? "rgba(245,158,11,.66)" : "rgba(255,255,255,.12)";
    ctx.lineWidth = 1;
    roundRect(x, y, width, 34, 8);
    ctx.fill();
    ctx.stroke();
    drawText(step, x + width / 2, y + 22, compact ? 10 : 11, 900, isActive ? palette.amber : "rgba(255,255,255,.66)", "center");
    ctx.restore();
  });
}

function drawDashboard(x, y, time) {
  ctx.save();
  ctx.fillStyle = "#0f1216";
  ctx.shadowColor = "rgba(0,0,0,.32)";
  ctx.shadowBlur = 28;
  ctx.shadowOffsetY = 16;
  roundRect(x, y, 360, 462, 22);
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.fillStyle = "rgba(255,255,255,.08)";
  roundRect(x + 14, y + 14, 332, 46, 13);
  ctx.fill();
  ["#f59e0b", "rgba(255,255,255,.34)", "rgba(255,255,255,.34)"].forEach((color, index) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x + 34 + index * 18, y + 37, 5, 0, Math.PI * 2);
    ctx.fill();
  });
  drawText("Smart Business System", x + 334, y + 42, 12, 900, "rgba(255,255,255,.72)", "right");

  dashboardMetrics.forEach((metric, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const cardX = x + 18 + col * 164;
    const cardY = y + 82 + row * 88;
    ctx.fillStyle = "rgba(255,255,255,.075)";
    ctx.strokeStyle = "rgba(255,255,255,.1)";
    roundRect(cardX, cardY, 150, 72, 12);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = metric.accent;
    ctx.beginPath();
    ctx.arc(cardX + 20, cardY + 24, 5, 0, Math.PI * 2);
    ctx.fill();
    drawText(metric.label, cardX + 34, cardY + 28, 12, 800, "rgba(255,255,255,.58)");
    drawText(metric.value, cardX + 16, cardY + 58, 21, 900, palette.white);
  });

  ctx.fillStyle = "rgba(255,255,255,.075)";
  ctx.strokeStyle = "rgba(255,255,255,.1)";
  roundRect(x + 18, y + 364, 202, 78, 12);
  ctx.fill();
  ctx.stroke();
  drawText("Monthly revenue", x + 34, y + 389, 12, 900, "rgba(255,255,255,.62)");
  const barHeights = [24, 38, 30, 50, 42, 60, 54, 66];
  barHeights.forEach((height, index) => {
    const animatedHeight = height + Math.sin(time * 2 + index) * 4;
    ctx.fillStyle = index % 2 ? palette.amber : palette.tiger;
    roundRect(x + 36 + index * 20, y + 428 - animatedHeight, 11, animatedHeight, 4);
    ctx.fill();
  });

  ctx.fillStyle = "rgba(52,211,153,.09)";
  ctx.strokeStyle = "rgba(52,211,153,.22)";
  roundRect(x + 232, y + 364, 114, 78, 12);
  ctx.fill();
  ctx.stroke();
  drawText("Alerts", x + 248, y + 389, 12, 900, "#bbf7d0");
  drawText("7", x + 248, y + 424, 30, 900, palette.green);

  const activeFeed = Math.floor((time * 0.8) % activityFeed.length);
  activityFeed.forEach((item, index) => {
    const feedY = y + 464 + index * 32;
    if (feedY > y + 520) {
      return;
    }
    ctx.fillStyle = index === activeFeed ? "rgba(52,211,153,.12)" : "rgba(255,255,255,.055)";
    ctx.strokeStyle = index === activeFeed ? "rgba(52,211,153,.24)" : "rgba(255,255,255,.08)";
    roundRect(x + 18, feedY, 328, 24, 7);
    ctx.fill();
    ctx.stroke();
    drawText(item, x + 32, feedY + 17, 11, 850, index === activeFeed ? "#bbf7d0" : "rgba(255,255,255,.6)");
  });
  ctx.restore();
}

function drawCompactDashboard(x, y, width, height, time) {
  ctx.save();
  ctx.fillStyle = "#0f1216";
  ctx.shadowColor = "rgba(0,0,0,.32)";
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 12;
  roundRect(x, y, width, height, 18);
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.fillStyle = "rgba(255,255,255,.08)";
  roundRect(x + 12, y + 12, width - 24, 40, 12);
  ctx.fill();
  ctx.fillStyle = palette.amber;
  ctx.font = "900 13px system-ui";
  ctx.fillText("Smart Business System", x + 24, y + 37);

  const metrics = dashboardMetrics.slice(0, 4);
  const cardW = (width - 36) / 2;
  metrics.forEach((metric, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const cardX = x + 12 + col * (cardW + 12);
    const cardY = y + 68 + row * 70;
    ctx.fillStyle = "rgba(255,255,255,.075)";
    ctx.strokeStyle = "rgba(255,255,255,.1)";
    roundRect(cardX, cardY, cardW, 58, 10);
    ctx.fill();
    ctx.stroke();
    drawText(metric.label, cardX + 10, cardY + 22, 10, 800, "rgba(255,255,255,.58)");
    drawText(metric.value, cardX + 10, cardY + 47, 16, 900, palette.white);
  });

  ctx.fillStyle = "rgba(52,211,153,.1)";
  ctx.strokeStyle = "rgba(52,211,153,.22)";
  roundRect(x + 12, y + height - 42, width - 24, 28, 8);
  ctx.fill();
  ctx.stroke();
  const activeFeed = activityFeed[Math.floor((time * 0.8) % activityFeed.length)];
  drawText(activeFeed, x + 24, y + height - 22, 11, 900, "#bbf7d0");
  ctx.restore();
}

function drawAutomationPacket(x, y, size, label, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = color === palette.green ? "rgba(52,211,153,.16)" : "rgba(245,158,11,.16)";
  ctx.strokeStyle = color === palette.green ? "rgba(52,211,153,.48)" : "rgba(245,158,11,.5)";
  ctx.lineWidth = 1.4;
  ctx.shadowColor = color;
  ctx.shadowBlur = 16;
  roundRect(-size / 2, -size / 2, size, size, 7);
  ctx.fill();
  ctx.stroke();
  drawText(label, 0, 4, 10, 900, color, "center");
  ctx.restore();
}

function drawCoreOnly(cx, cy, time, scale = 1) {
  drawStableTTHub(cx, cy, scale);
}

function drawMiniFiles(x, y, scale) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  for (let i = 0; i < 7; i += 1) {
    ctx.fillStyle = i % 2 ? "#ebe4d9" : palette.paper;
    roundRect(i * 3, 48 - i * 6, 138, 74, 8);
    ctx.fill();
    ctx.strokeStyle = "rgba(17,20,24,.12)";
    ctx.stroke();
  }
  ctx.fillStyle = "#2f3339";
  roundRect(56, 2, 36, 16, 4);
  ctx.fill();
  ctx.strokeStyle = "rgba(17,20,24,.22)";
  ctx.lineWidth = 2;
  for (let row = 0; row < 4; row += 1) {
    ctx.beginPath();
    ctx.moveTo(22, 68 + row * 12);
    ctx.lineTo(116, 68 + row * 12);
    ctx.stroke();
  }
  ctx.restore();
}

function drawMiniCartons(x, y, scale) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  [[0, 42, 64, 52], [56, 28, 70, 66], [32, 0, 80, 56]].forEach(([bx, by, bw, bh]) => {
    const grad = ctx.createLinearGradient(bx, by, bx + bw, by + bh);
    grad.addColorStop(0, "#c9833b");
    grad.addColorStop(1, "#8d5526");
    ctx.fillStyle = grad;
    roundRect(bx, by, bw, bh, 8);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,.16)";
    ctx.stroke();
    ctx.strokeStyle = "rgba(55,32,14,.44)";
    ctx.beginPath();
    ctx.moveTo(bx + bw / 2, by + 4);
    ctx.lineTo(bx + bw / 2, by + bh - 4);
    ctx.stroke();
  });
  ctx.restore();
}

function drawMiniRegister(x, y, scale) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = "#efe7db";
  roundRect(0, 0, 190, 106, 12);
  ctx.fill();
  ctx.fillStyle = "#e3d8c9";
  roundRect(91, 0, 9, 106, 4);
  ctx.fill();
  ctx.strokeStyle = "rgba(17,20,24,.16)";
  for (let row = 0; row < 6; row += 1) {
    ctx.beginPath();
    ctx.moveTo(16, 20 + row * 13);
    ctx.lineTo(78, 20 + row * 13);
    ctx.moveTo(114, 20 + row * 13);
    ctx.lineTo(174, 20 + row * 13);
    ctx.stroke();
  }
  ctx.translate(116, 74);
  ctx.rotate(-0.6);
  ctx.fillStyle = "#111418";
  roundRect(0, 0, 78, 8, 4);
  ctx.fill();
  ctx.fillStyle = palette.amber;
  roundRect(56, 0, 16, 8, 4);
  ctx.fill();
  ctx.restore();
}

function drawMiniCalculator(x, y, scale) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = "#242a33";
  roundRect(0, 0, 104, 88, 12);
  ctx.fill();
  ctx.fillStyle = "#d8edc3";
  roundRect(12, 10, 80, 22, 6);
  ctx.fill();
  drawText("1280", 82, 26, 12, 900, "rgba(17,20,24,.62)", "right");
  for (let row = 0; row < 4; row += 1) {
    for (let col = 0; col < 4; col += 1) {
      ctx.fillStyle = col === 3 ? "rgba(245,158,11,.75)" : "rgba(255,255,255,.16)";
      roundRect(13 + col * 20, 43 + row * 11, 13, 8, 3);
      ctx.fill();
    }
  }
  ctx.restore();
}

function drawMiniCash(x, y, scale) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  for (let i = 0; i < 4; i += 1) {
    ctx.fillStyle = i % 2 ? "#bcd4a8" : "#dbeacb";
    roundRect(i * 4, 18 - i * 4, 120, 50, 8);
    ctx.fill();
    ctx.strokeStyle = "rgba(17,20,24,.14)";
    ctx.stroke();
  }
  ctx.fillStyle = "#8d5526";
  roundRect(44, -2, 38, 62, 7);
  ctx.fill();
  ctx.strokeStyle = "rgba(17,20,24,.25)";
  ctx.beginPath();
  ctx.arc(64, 30, 12, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawMiniPhone(x, y, scale) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = "#111418";
  roundRect(0, 0, 92, 78, 14);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,.08)";
  roundRect(9, 12, 74, 54, 9);
  ctx.fill();
  ctx.fillStyle = "rgba(52,211,153,.25)";
  roundRect(18, 22, 46, 14, 7);
  ctx.fill();
  ctx.fillStyle = "rgba(245,158,11,.25)";
  roundRect(30, 44, 38, 14, 7);
  ctx.fill();
  ctx.restore();
}

function drawSideManualScene(x, y, w, h, time) {
  ctx.save();
  ctx.fillStyle = "rgba(17,20,24,.58)";
  ctx.strokeStyle = "rgba(255,255,255,.1)";
  roundRect(x, y, w, h, 16);
  ctx.fill();
  ctx.stroke();

  const s = Math.min(0.58, Math.max(0.38, w / 270));
  drawMiniFiles(x + w * 0.08, y + 40, s);
  drawMiniCartons(x + w * 0.5, y + 44, s * 0.9);
  drawMiniRegister(x + w * 0.12, y + 160, s * 0.82);
  drawMiniCalculator(x + w * 0.08, y + 306, s * 1.04);
  drawMiniCash(x + w * 0.52, y + 306, s * 0.92);
  drawMiniPhone(x + w * 0.25, y + 418, s * 0.95);

  drawText("Files", x + w * 0.12, y + 128, 11, 900, "#fecaca");
  drawText("Cartons", x + w * 0.55, y + 126, 11, 900, "#fecaca");
  drawText("Register", x + w * 0.18, y + 250, 11, 900, "#fecaca");
  drawText("Calc", x + w * 0.12, y + 398, 11, 900, "#fecaca");
  drawText("Cash", x + w * 0.58, y + 392, 11, 900, "#fecaca");
  drawText("Phone", x + w * 0.31, y + 502, 11, 900, "#fecaca");
  ctx.restore();

  return [
    { x: x + w * 0.7, y: y + 104, delay: 0 },
    { x: x + w * 0.88, y: y + 112, delay: 0.12 },
    { x: x + w * 0.82, y: y + 218, delay: 0.24 },
    { x: x + w * 0.58, y: y + 350, delay: 0.36 },
    { x: x + w * 0.88, y: y + 344, delay: 0.48 },
    { x: x + w * 0.68, y: y + 462, delay: 0.6 },
  ];
}

function drawSideDashboard(x, y, w, h, time) {
  ctx.save();
  ctx.fillStyle = "#0f1216";
  ctx.strokeStyle = "rgba(255,255,255,.12)";
  ctx.shadowColor = "rgba(0,0,0,.28)";
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 12;
  roundRect(x, y, w, h, 18);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.stroke();

  ctx.fillStyle = "rgba(255,255,255,.08)";
  roundRect(x + 10, y + 10, w - 20, 38, 11);
  ctx.fill();
  drawText("Business System", x + w - 20, y + 34, 11, 900, "rgba(255,255,255,.72)", "right");

  const gridGap = 8;
  const cardW = (w - 28 - gridGap) / 2;
  dashboardMetrics.slice(0, 4).forEach((metric, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const cardX = x + 10 + col * (cardW + gridGap);
    const cardY = y + 66 + row * 74;
    ctx.fillStyle = "rgba(255,255,255,.075)";
    ctx.strokeStyle = "rgba(255,255,255,.1)";
    roundRect(cardX, cardY, cardW, 62, 10);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = metric.accent;
    ctx.beginPath();
    ctx.arc(cardX + 11, cardY + 18, 4, 0, Math.PI * 2);
    ctx.fill();
    drawText(metric.label, cardX + 20, cardY + 22, 9, 800, "rgba(255,255,255,.58)");
    drawText(metric.value, cardX + 10, cardY + 50, 14, 900, palette.white);
  });

  const chartY = y + 234;
  ctx.fillStyle = "rgba(255,255,255,.075)";
  ctx.strokeStyle = "rgba(255,255,255,.1)";
  roundRect(x + 10, chartY, w - 20, 98, 11);
  ctx.fill();
  ctx.stroke();
  drawText("Revenue", x + 22, chartY + 24, 10, 900, "rgba(255,255,255,.62)");
  [22, 34, 28, 46, 40, 56, 62].forEach((height, index) => {
    const animatedHeight = height + Math.sin(time * 2 + index) * 3;
    ctx.fillStyle = index % 2 ? palette.amber : palette.tiger;
    roundRect(x + 24 + index * ((w - 70) / 7), chartY + 84 - animatedHeight, 10, animatedHeight, 4);
    ctx.fill();
  });

  ctx.fillStyle = "rgba(52,211,153,.1)";
  ctx.strokeStyle = "rgba(52,211,153,.22)";
  roundRect(x + 10, y + h - 48, w - 20, 30, 8);
  ctx.fill();
  ctx.stroke();
  drawText(activityFeed[Math.floor((time * 0.8) % activityFeed.length)], x + 22, y + h - 28, 10, 900, "#bbf7d0");
  ctx.restore();
}

function drawAlignedFrame(width, height, time) {
  drawBackground(width, height, time);

  const margin = 22;
  const gap = 16;
  const leftW = Math.max(145, Math.min(240, width * 0.28));
  const rightW = Math.max(164, Math.min(286, width * 0.31));
  const centerX = width < 760 ? width * 0.48 : width / 2;
  const centerY = height * 0.47;
  const panelY = 84;
  const panelH = Math.min(height - 138, 540);
  const leftX = margin;
  const rightX = width - margin - rightW;

  drawLabelPill("MANUAL WORK", leftX, 32, "#fecaca", "rgba(248,113,113,.1)");
  drawLabelPill("SMART SYSTEM", rightX, 32, "#bbf7d0", "rgba(52,211,153,.1)");

  drawSideManualScene(leftX, panelY, leftW, panelH, time);
  const coreScale = width < 760 ? 0.5 : 0.74;

  drawCoreOnly(centerX, centerY, time, coreScale);

  drawSideDashboard(rightX, panelY, rightW, panelH, time);
}

function drawMobileObjectTile(x, y, w, h, label, drawObject) {
  ctx.save();
  ctx.fillStyle = "rgba(17,20,24,.62)";
  ctx.strokeStyle = "rgba(255,255,255,.1)";
  roundRect(x, y, w, h, 14);
  ctx.fill();
  ctx.stroke();
  drawObject();
  drawText(label, x + w / 2, y + h - 14, 11, 900, "#fecaca", "center");
  ctx.restore();
}

function drawMobileManualGrid(width, y, time) {
  const margin = 20;
  const gap = 10;
  const tileW = (width - margin * 2 - gap) / 2;
  const tileH = 112;
  const scale = Math.min(0.5, Math.max(0.36, tileW / 300));
  const tiles = [
    ["Invoice files", (x, tileY) => drawMiniFiles(x + 14, tileY + 10, scale)],
    ["Stock cartons", (x, tileY) => drawMiniCartons(x + 18, tileY + 12, scale)],
    ["Register + pen", (x, tileY) => drawMiniRegister(x + 10, tileY + 18, scale * 0.72)],
    ["Calculator", (x, tileY) => drawMiniCalculator(x + 26, tileY + 18, scale * 1.05)],
    ["Cash bundle", (x, tileY) => drawMiniCash(x + 28, tileY + 26, scale * 1.04)],
    ["Phone order", (x, tileY) => drawMiniPhone(x + 34, tileY + 22, scale * 1.05)],
  ];

  const sources = [];
  tiles.forEach(([label, drawObject], index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const x = margin + col * (tileW + gap);
    const tileY = y + row * (tileH + gap);
    drawMobileObjectTile(x, tileY, tileW, tileH, label, () => drawObject(x, tileY));
    sources.push({
      x: x + tileW / 2,
      y: tileY + tileH,
      delay: index * 0.12,
    });
  });

  return sources;
}

function drawMobileCollectorFlow(sources, center, collectorY, width, time) {
  const collectorX = 28;
  const collectorW = width - 56;
  const collectorH = 34;
  const intakeX = width / 2;
  const intakeY = collectorY + collectorH;
  const coreTopY = center.y - 56;

  ctx.save();
  ctx.fillStyle = "rgba(245,158,11,.13)";
  ctx.strokeStyle = "rgba(245,158,11,.52)";
  ctx.lineWidth = 1.5;
  ctx.shadowColor = "rgba(245,158,11,.24)";
  ctx.shadowBlur = 18;
  roundRect(collectorX, collectorY, collectorW, collectorH, 17);
  ctx.fill();
  ctx.stroke();
  drawText("Manual work collected", intakeX, collectorY + 22, 11, 900, palette.amber, "center");
  ctx.restore();

  sources.forEach((source, index) => {
    const progress = (time * 0.34 + source.delay) % 1;
    const dropStartY = source.y + 4;
    const dropEndY = collectorY + collectorH / 2;
    const y = dropStartY + (dropEndY - dropStartY) * progress;
    const x = source.x + Math.sin(time * 3 + index) * 3;

    ctx.save();
    ctx.globalAlpha = 0.16;
    ctx.strokeStyle = palette.amber;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(source.x, dropStartY);
    ctx.lineTo(source.x, dropStartY + 18);
    ctx.stroke();
    ctx.restore();

    drawParticle({ x, y }, 4.3, palette.amber);
  });

  ctx.save();
  ctx.strokeStyle = "rgba(245,158,11,.78)";
  ctx.lineWidth = 7;
  ctx.shadowColor = "rgba(245,158,11,.42)";
  ctx.shadowBlur = 18;
  ctx.beginPath();
  ctx.moveTo(intakeX, intakeY);
  ctx.bezierCurveTo(intakeX, intakeY + 28, center.x, coreTopY - 32, center.x, coreTopY);
  ctx.stroke();
  ctx.restore();

  for (let dot = 0; dot < 3; dot += 1) {
    const progress = (time * 0.42 + dot * 0.33) % 1;
    const point = cubicPoint(
      { x: intakeX, y: intakeY },
      { x: intakeX, y: intakeY + 28 },
      { x: center.x, y: coreTopY - 32 },
      { x: center.x, y: coreTopY },
      progress,
    );
    drawAutomationPacket(point.x, point.y, 20, dot % 2 ? "IN" : "OK", palette.amber);
  }
}

function drawPhoneDashboard(x, y, width, time) {
  const height = 302;
  ctx.save();
  ctx.fillStyle = "#0f1216";
  ctx.strokeStyle = "rgba(255,255,255,.12)";
  ctx.shadowColor = "rgba(0,0,0,.28)";
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 12;
  roundRect(x, y, width, height, 18);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.stroke();

  ctx.fillStyle = "rgba(255,255,255,.08)";
  roundRect(x + 12, y + 12, width - 24, 42, 12);
  ctx.fill();
  drawText("Smart Business System", x + width / 2, y + 39, 13, 900, palette.amber, "center");

  const cardGap = 8;
  const cardW = (width - 32 - cardGap) / 2;
  dashboardMetrics.slice(0, 4).forEach((metric, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const cardX = x + 12 + col * (cardW + cardGap);
    const cardY = y + 70 + row * 68;
    ctx.fillStyle = "rgba(255,255,255,.075)";
    ctx.strokeStyle = "rgba(255,255,255,.1)";
    roundRect(cardX, cardY, cardW, 58, 10);
    ctx.fill();
    ctx.stroke();
    drawText(metric.label, cardX + 10, cardY + 22, 10, 800, "rgba(255,255,255,.58)");
    drawText(metric.value, cardX + 10, cardY + 47, 16, 900, palette.white);
  });

  ctx.fillStyle = "rgba(255,255,255,.075)";
  ctx.strokeStyle = "rgba(255,255,255,.1)";
  roundRect(x + 12, y + 212, width - 24, 48, 10);
  ctx.fill();
  ctx.stroke();
  [18, 28, 24, 36, 32, 42, 46].forEach((barHeight, index) => {
    const animatedHeight = barHeight + Math.sin(time * 2 + index) * 2;
    ctx.fillStyle = index % 2 ? palette.amber : palette.tiger;
    roundRect(x + 28 + index * ((width - 70) / 7), y + 250 - animatedHeight, 9, animatedHeight, 4);
    ctx.fill();
  });

  ctx.fillStyle = "rgba(52,211,153,.1)";
  ctx.strokeStyle = "rgba(52,211,153,.22)";
  roundRect(x + 12, y + 270, width - 24, 22, 7);
  ctx.fill();
  ctx.stroke();
  drawText(activityFeed[Math.floor((time * 0.8) % activityFeed.length)], x + 22, y + 286, 10, 900, "#bbf7d0");
  ctx.restore();
}

function drawPhoneFrame(width, height, time) {
  drawBackground(width, height, time);

  drawLabelPill("MANUAL WORK", 20, 28, "#fecaca", "rgba(248,113,113,.1)");
  const sources = drawPhoneManualDeskScene(width, 76, time);
  const center = { x: width / 2, y: 642 };
  drawMobileCollectorFlow(sources, center, 486, width, time);

  drawCoreOnly(center.x, center.y, time, 0.58);

  ctx.save();
  ctx.strokeStyle = "rgba(245,158,11,.72)";
  ctx.lineWidth = 5;
  ctx.shadowColor = "rgba(245,158,11,.36)";
  ctx.shadowBlur = 14;
  ctx.beginPath();
  ctx.moveTo(center.x, center.y + 56);
  ctx.lineTo(center.x, center.y + 108);
  ctx.stroke();
  ctx.restore();

  for (let dot = 0; dot < 3; dot += 1) {
    const progress = (time * 0.34 + dot * 0.33) % 1;
    drawAutomationPacket(center.x, center.y + 56 + 52 * progress, 20, dot % 2 ? "AI" : "OK", progress > 0.72 ? palette.green : palette.amber);
  }

  drawLabelPill("SMART SYSTEM", 20, 770, "#bbf7d0", "rgba(52,211,153,.1)");
  drawPhoneDashboard(20, 812, width - 40, time);
}

function drawDesktopFrame(width, height, time) {
  drawBackground(width, height, time);

  drawLabelPill("MANUAL AND DISCONNECTED", 48, 48, "#fecaca", "rgba(248,113,113,.1)");
  drawLabelPill("CONNECTED AND AUTOMATED", width - 404, 48, "#bbf7d0", "rgba(52,211,153,.1)");

  drawManualDeskScene(time);

  drawLabelPill("Repeated entry", 58, 624, "#fecaca", "rgba(248,113,113,.1)");
  drawLabelPill("Missed dues", 188, 624, "#fecaca", "rgba(248,113,113,.1)");
  drawLabelPill("Delayed reports", 294, 624, "#fecaca", "rgba(248,113,113,.1)");

  const center = { x: Math.min(520, width * 0.47), y: 310 };
  drawProcessCore(center.x, center.y, time);
  drawDashboard(width - 420, 104, time);
}

function render(timeStamp) {
  const time = timeStamp * 0.001;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  ctx.clearRect(0, 0, width, height);

  if (width < 540) {
    drawPhoneFrame(width, height, time);
  } else if (width < 1080) {
    drawAlignedFrame(width, height, time);
  } else {
    drawDesktopFrame(width, height, time);
  }

  requestAnimationFrame(render);
}

function init() {
  resizeCanvas();
  requestAnimationFrame(render);
}

window.addEventListener("resize", resizeCanvas);
init();
