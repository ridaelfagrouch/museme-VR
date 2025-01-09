document.addEventListener("DOMContentLoaded", function () {
  initializeMuseum();
});

function initializeMuseum() {
  const museumStructure = document.querySelector("#museum-structure");
  if (!museumStructure) return;

  createRoom(museumStructure);
  setupArtwork(museumStructure);
  setupLighting(museumStructure);
}

function createRoom(parent) {
  // Create walls - now with all four sides
  const walls = [
    { position: "0 3 -7", rotation: "0 0 0", width: 14, height: 6 }, // North wall
    { position: "-7 3 0", rotation: "0 90 0", width: 14, height: 6 }, // West wall
    { position: "7 3 0", rotation: "0 -90 0", width: 14, height: 6 }, // East wall
    { position: "0 3 7", rotation: "0 180 0", width: 14, height: 6 }, // South wall
  ];

  walls.forEach((wallData) => {
    // Main wall
    const wall = document.createElement("a-plane");
    wall.setAttribute("position", wallData.position);
    wall.setAttribute("rotation", wallData.rotation);
    wall.setAttribute("width", wallData.width);
    wall.setAttribute("height", wallData.height);
    wall.setAttribute("color", "#F5F5F5");
    parent.appendChild(wall);

    // Add architectural details
    addArchitecturalDetails(parent, wallData);
  });

  // Floor
  const floor = document.createElement("a-plane");
  floor.setAttribute("rotation", "-90 0 0");
  floor.setAttribute("width", "14");
  floor.setAttribute("height", "14");
  floor.setAttribute("src", "#marble-floor");
  floor.setAttribute("repeat", "7 7");
  floor.setAttribute("smooth-navigation", "");
  parent.appendChild(floor);

  // Ceiling with pattern
  const ceiling = document.createElement("a-plane");
  ceiling.setAttribute("position", "0 6 0");
  ceiling.setAttribute("rotation", "90 0 0");
  ceiling.setAttribute("width", "14");
  ceiling.setAttribute("height", "14");
  ceiling.setAttribute("src", "#ceiling-texture");
  ceiling.setAttribute("repeat", "7 7");
  parent.appendChild(ceiling);
}

function addArchitecturalDetails(parent, wallData) {
  const pos = wallData.position.split(" ");

  // Crown molding
  const crown = document.createElement("a-box");
  crown.setAttribute("position", `${pos[0]} 5.9 ${pos[2]}`);
  crown.setAttribute("rotation", wallData.rotation);
  crown.setAttribute("width", wallData.width);
  crown.setAttribute("height", "0.2");
  crown.setAttribute("depth", "0.3");
  crown.setAttribute("color", "#E0E0E0");
  parent.appendChild(crown);

  // Baseboard
  const base = document.createElement("a-box");
  base.setAttribute("position", `${pos[0]} 0.1 ${pos[2]}`);
  base.setAttribute("rotation", wallData.rotation);
  base.setAttribute("width", wallData.width);
  base.setAttribute("height", "0.2");
  base.setAttribute("depth", "0.25");
  base.setAttribute("color", "#D3D3D3");
  parent.appendChild(base);
}

function setupArtwork(parent) {
  const artworkData = [
    // North wall (front)
    {
      position: "0 3 -6.8",
      rotation: "0 0 0",
      wall: "north",
      artwork: {
        src: "#starry-night",
        title: "The Starry Night",
        artist: "Vincent van Gogh",
        year: "1889",
        width: 4,
        height: 3,
      },
    },
    // West wall (left)
    {
      position: "-6.8 3 0",
      rotation: "0 90 0",
      wall: "west",
      artwork: {
        src: "#mona-lisa",
        title: "Mona Lisa",
        artist: "Leonardo da Vinci",
        year: "1503",
        width: 4,
        height: 3,
      },
    },
    // East wall (right)
    {
      position: "6.8 3 0",
      rotation: "0 -90 0",
      wall: "east",
      artwork: {
        src: "#the-scream",
        title: "The Scream",
        artist: "Edvard Munch",
        year: "1893",
        width: 4,
        height: 3,
      },
    },
    // South wall (back)
    {
      position: "0 3 6.8",
      rotation: "0 180 0",
      wall: "south",
      artwork: {
        src: "#girl-with-pearl",
        title: "Girl with a Pearl Earring",
        artist: "Johannes Vermeer",
        year: "1665",
        width: 4,
        height: 3,
      },
    },
  ];

  artworkData.forEach((data) => {
    // Main container for artwork
    const artworkContainer = document.createElement("a-entity");
    artworkContainer.setAttribute("position", data.position);
    artworkContainer.setAttribute("rotation", data.rotation);

    // Create frame with gold color
    const frame = document.createElement("a-entity");
    const frameWidth = 0.15;
    const frameColor = "#B8860B";

    // Frame parts (top, bottom, left, right)
    const frameParts = [
      {
        pos: `0 ${data.artwork.height / 2 + frameWidth / 2} 0.05`,
        dim: `${data.artwork.width + frameWidth * 2} ${frameWidth} 0.1`,
      },
      {
        pos: `0 ${-data.artwork.height / 2 - frameWidth / 2} 0.05`,
        dim: `${data.artwork.width + frameWidth * 2} ${frameWidth} 0.1`,
      },
      {
        pos: `${-data.artwork.width / 2 - frameWidth / 2} 0 0.05`,
        dim: `${frameWidth} ${data.artwork.height + frameWidth * 2} 0.1`,
      },
      {
        pos: `${data.artwork.width / 2 + frameWidth / 2} 0 0.05`,
        dim: `${frameWidth} ${data.artwork.height + frameWidth * 2} 0.1`,
      },
    ];

    // Create each frame part
    frameParts.forEach((part) => {
      const framePart = document.createElement("a-box");
      framePart.setAttribute("position", part.pos);
      framePart.setAttribute("width", part.dim.split(" ")[0]);
      framePart.setAttribute("height", part.dim.split(" ")[1]);
      framePart.setAttribute("depth", part.dim.split(" ")[2]);
      framePart.setAttribute("color", frameColor);
      framePart.setAttribute("metalness", "0.6");
      framePart.setAttribute("roughness", "0.3");
      frame.appendChild(framePart);
    });

    // Create black backing behind artwork
    const backing = document.createElement("a-plane");
    backing.setAttribute("width", data.artwork.width);
    backing.setAttribute("height", data.artwork.height);
    backing.setAttribute("color", "#111111");
    backing.setAttribute("position", "0 0 0");
    frame.appendChild(backing);

    // Create artwork image
    const artwork = document.createElement("a-image");
    artwork.setAttribute("src", data.artwork.src);
    artwork.setAttribute("width", data.artwork.width);
    artwork.setAttribute("height", data.artwork.height);
    artwork.setAttribute("position", "0 0 0.01");

    // Add zoom and info panel components to the artwork
    artwork.setAttribute("artwork-zoom", { wall: data.wall });
    artwork.setAttribute("info-panel", {
      title: data.artwork.title,
      artist: data.artwork.artist,
      year: data.artwork.year,
    });

    // Add artwork to frame
    frame.appendChild(artwork);

    // Add frame to container
    artworkContainer.appendChild(frame);

    // Add container to parent
    parent.appendChild(artworkContainer);
  });
}

function setupLighting(parent) {
  // Ambient light
  const ambient = document.createElement("a-light");
  ambient.setAttribute("type", "ambient");
  ambient.setAttribute("color", "#FFF");
  ambient.setAttribute("intensity", "0.35");
  parent.appendChild(ambient);

  // Point lights in each quadrant of the room
  const pointLights = [
    { position: "3 5.5 -3", intensity: "0.15" },
    { position: "-3 5.5 -3", intensity: "0.15" },
    { position: "3 5.5 3", intensity: "0.15" },
    { position: "-3 5.5 3", intensity: "0.15" },
  ];

  pointLights.forEach((light) => {
    const pointLight = document.createElement("a-light");
    pointLight.setAttribute("type", "point");
    pointLight.setAttribute("position", light.position);
    pointLight.setAttribute("intensity", light.intensity);
    pointLight.setAttribute("decay", "2");
    pointLight.setAttribute("distance", "10");
    parent.appendChild(pointLight);
  });
}
