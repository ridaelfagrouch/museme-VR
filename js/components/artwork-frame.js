AFRAME.registerComponent("artwork-frame", {
  schema: {
    width: { type: "number", default: 3 },
    height: { type: "number", default: 2 },
    src: { type: "string", default: "" },
    depth: { type: "number", default: 0.1 },
  },

  init: function () {
    // Create the artwork
    this.createArtwork();
    // create the frame around it
    this.createFrame();
    // Add lighting
    this.createSpotlight();
  },

  createArtwork: function () {
    // Create the artwork plane
    const artwork = document.createElement("a-image");
    artwork.setAttribute("position", "0 0 0.01");
    artwork.setAttribute("width", this.data.width);
    artwork.setAttribute("height", this.data.height);
    artwork.setAttribute("src", this.data.src);

    // Create black backing behind artwork
    const backing = document.createElement("a-plane");
    backing.setAttribute("position", "0 0 0");
    backing.setAttribute("width", this.data.width);
    backing.setAttribute("height", this.data.height);
    backing.setAttribute("color", "#111111");

    this.el.appendChild(backing);
    this.el.appendChild(artwork);
  },

  createFrame: function () {
    const frameWidth = 0.15;
    const frameDepth = this.data.depth;
    const goldColor = "#B8860B";

    // Frame pieces
    const frameParts = [
      // Top
      {
        pos: `0 ${this.data.height / 2 + frameWidth / 2} ${frameDepth / 2}`,
        dim: `${this.data.width + frameWidth * 2} ${frameWidth} ${frameDepth}`,
      },
      // Bottom
      {
        pos: `0 ${-this.data.height / 2 - frameWidth / 2} ${frameDepth / 2}`,
        dim: `${this.data.width + frameWidth * 2} ${frameWidth} ${frameDepth}`,
      },
      // Left
      {
        pos: `${-this.data.width / 2 - frameWidth / 2} 0 ${frameDepth / 2}`,
        dim: `${frameWidth} ${this.data.height + frameWidth * 2} ${frameDepth}`,
      },
      // Right
      {
        pos: `${this.data.width / 2 + frameWidth / 2} 0 ${frameDepth / 2}`,
        dim: `${frameWidth} ${this.data.height + frameWidth * 2} ${frameDepth}`,
      },
    ];

    frameParts.forEach((part) => {
      const framePiece = document.createElement("a-box");
      framePiece.setAttribute("position", part.pos);
      framePiece.setAttribute("width", part.dim.split(" ")[0]);
      framePiece.setAttribute("height", part.dim.split(" ")[1]);
      framePiece.setAttribute("depth", part.dim.split(" ")[2]);
      framePiece.setAttribute("color", goldColor);
      framePiece.setAttribute("metalness", "0.6");
      framePiece.setAttribute("roughness", "0.3");
      this.el.appendChild(framePiece);
    });
  },

  createSpotlight: function () {
    const light = document.createElement("a-light");
    light.setAttribute("type", "spot");
    light.setAttribute("position", "0 2 1");
    light.setAttribute("intensity", "0.3");
    light.setAttribute("angle", "30");
    light.setAttribute("penumbra", "0.4");
    light.setAttribute("decay", "1.2");
    light.setAttribute("color", "#FFE5B4");
    light.setAttribute("rotation", "-45 0 0");
    this.el.appendChild(light);
  },
});
