AFRAME.registerComponent("smooth-navigation", {
  init: function () {
    this.isNavigating = false;
    this.destination = null;
    this.startPosition = null;
    this.startTime = null;
    this.duration = 800; // Duration in milliseconds

    this.el.addEventListener("click", this.handleClick.bind(this));
    this.animate = this.animate.bind(this);
  },

  handleClick: function (event) {
    if (this.isNavigating) return;

    const intersection = event.detail.intersection;
    if (!intersection) return;

    const camera = document.querySelector("#camera-rig");
    if (!camera) return;

    this.startPosition = camera.getAttribute("position");
    this.destination = {
      x: intersection.point.x,
      y: this.startPosition.y,
      z: intersection.point.z,
    };

    // Check if distance is worth moving
    const distance = this.calculateDistance(
      this.startPosition,
      this.destination
    );
    if (distance < 0.5) return;

    this.isNavigating = true;
    this.startTime = null;
    requestAnimationFrame(this.animate);

    // Create click feedback
    this.createClickIndicator(intersection.point);
  },

  animate: function (timestamp) {
    if (!this.startTime) this.startTime = timestamp;
    const camera = document.querySelector("#camera-rig");

    const progress = Math.min((timestamp - this.startTime) / this.duration, 1);
    const easeProgress = this.easeInOutQuad(progress);

    const newPosition = {
      x:
        this.startPosition.x +
        (this.destination.x - this.startPosition.x) * easeProgress,
      y: this.startPosition.y,
      z:
        this.startPosition.z +
        (this.destination.z - this.startPosition.z) * easeProgress,
    };

    camera.setAttribute("position", newPosition);

    if (progress < 1) {
      requestAnimationFrame(this.animate);
    } else {
      this.isNavigating = false;
    }
  },

  createClickIndicator: function (point) {
    const indicator = document.createElement("a-ring");
    indicator.setAttribute("position", {
      x: point.x,
      y: point.y + 0.01,
      z: point.z,
    });
    indicator.setAttribute("rotation", "-90 0 0");
    indicator.setAttribute("radius-inner", "0");
    indicator.setAttribute("radius-outer", "0.2");
    indicator.setAttribute("color", "#FFFFFF");
    indicator.setAttribute("opacity", "0.8");
    indicator.setAttribute("animation__scale", {
      property: "scale",
      from: "0.1 0.1 0.1",
      to: "2 2 2",
      dur: 500,
      easing: "easeOutQuad",
    });
    indicator.setAttribute("animation__fade", {
      property: "opacity",
      from: "0.8",
      to: "0",
      dur: 500,
      easing: "easeOutQuad",
    });

    this.el.sceneEl.appendChild(indicator);
    setTimeout(() => {
      this.el.sceneEl.removeChild(indicator);
    }, 500);
  },

  calculateDistance: function (pos1, pos2) {
    const dx = pos1.x - pos2.x;
    const dz = pos1.z - pos2.z;
    return Math.sqrt(dx * dx + dz * dz);
  },

  easeInOutQuad: function (t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  },
});
