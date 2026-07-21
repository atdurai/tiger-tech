const lottieLikeData = {
  manual: [
    { label: "Paper bills", x: 28, y: 98, delay: 0 },
    { label: "Stock book", x: 174, y: 170, delay: 120 },
    { label: "Phone orders", x: 48, y: 288, delay: 240 },
    { label: "Payment notes", x: 180, y: 378, delay: 360 },
  ],
  system: [
    { label: "Billing", x: 32, y: 98, delay: 240 },
    { label: "Inventory", x: 180, y: 170, delay: 360 },
    { label: "Orders", x: 46, y: 288, delay: 480 },
    { label: "Reports", x: 186, y: 378, delay: 600 },
  ],
};

function createLottieShape(item, className) {
  const element = document.createElement("div");
  element.className = `lottie-shape ${className}`;
  element.textContent = item.label;
  element.style.left = `${item.x}px`;
  element.style.top = `${item.y}px`;
  element.style.animationDelay = `${item.delay}ms`;
  return element;
}

function renderLottieLikeStage() {
  const manualStage = document.querySelector("#lottieManual");
  const systemStage = document.querySelector("#lottieSystem");

  lottieLikeData.manual.forEach((item) => {
    manualStage.appendChild(createLottieShape(item, "lottie-manual"));
  });

  lottieLikeData.system.forEach((item) => {
    systemStage.appendChild(createLottieShape(item, "lottie-output"));
  });

  const shapes = document.querySelectorAll(".lottie-shape");
  let activeIndex = 0;

  window.setInterval(() => {
    shapes.forEach((shape, index) => {
      const isActive = index === activeIndex;
      shape.style.transform = isActive ? "translateY(-14px) scale(1.04)" : "translateY(0) scale(1)";
      shape.style.opacity = isActive ? "1" : "0.72";
    });

    activeIndex = (activeIndex + 1) % shapes.length;
  }, 720);
}

renderLottieLikeStage();
