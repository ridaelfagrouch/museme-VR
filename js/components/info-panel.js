AFRAME.registerComponent("info-panel", {
  schema: {
    title: { type: "string", default: "Untitled" },
    artist: { type: "string", default: "Unknown Artist" },
    year: { type: "string", default: "Unknown Year" },
  },

  init: function () {
    const panel = document.createElement("a-entity");
    panel.setAttribute("visible", false);
    panel.setAttribute("position", "0 -1 0.1");

    // Background panel
    const background = document.createElement("a-plane");
    background.setAttribute("color", "#FFF");
    background.setAttribute("width", "1.5");
    background.setAttribute("height", "0.8");
    background.setAttribute("opacity", "0.9");
    panel.appendChild(background);

    // Title
    const titleText = document.createElement("a-text");
    titleText.setAttribute("value", this.data.title);
    titleText.setAttribute("align", "center");
    titleText.setAttribute("position", "0 0.2 0.01");
    titleText.setAttribute("color", "#000");
    titleText.setAttribute("width", "1.4");
    panel.appendChild(titleText);

    // Artist
    const artistText = document.createElement("a-text");
    artistText.setAttribute("value", `By: ${this.data.artist}`);
    artistText.setAttribute("align", "center");
    artistText.setAttribute("position", "0 0 0.01");
    artistText.setAttribute("color", "#333");
    artistText.setAttribute("width", "1.4");
    panel.appendChild(artistText);

    // Year
    const yearText = document.createElement("a-text");
    yearText.setAttribute("value", `Year: ${this.data.year}`);
    yearText.setAttribute("align", "center");
    yearText.setAttribute("position", "0 -0.2 0.01");
    yearText.setAttribute("color", "#333");
    yearText.setAttribute("width", "1.4");
    panel.appendChild(yearText);

    this.el.appendChild(panel);
    this.panel = panel;

    // Add event listeners
    this.el.addEventListener("mouseenter", () => {
      this.panel.setAttribute("visible", true);
    });

    this.el.addEventListener("mouseleave", () => {
      this.panel.setAttribute("visible", false);
    });
  },
});
