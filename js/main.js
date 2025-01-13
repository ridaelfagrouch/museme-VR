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
  // Create larger walls - increased dimensions
  const walls = [
    { position: "0 5 -12", rotation: "0 0 0", width: 24, height: 10 }, // North wall
    { position: "-12 5 0", rotation: "0 90 0", width: 24, height: 10 }, // West wall
    { position: "12 5 0", rotation: "0 -90 0", width: 24, height: 10 }, // East wall
    { position: "0 5 12", rotation: "0 180 0", width: 24, height: 10 }, // South wall
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

  // Larger floor
  const floor = document.createElement("a-plane");
  floor.setAttribute("rotation", "-90 0 0");
  floor.setAttribute("width", "24");
  floor.setAttribute("height", "24");
  floor.setAttribute("src", "#marble-floor");
  floor.setAttribute("repeat", "12 12");
  floor.setAttribute("smooth-navigation", "");
  parent.appendChild(floor);

  // Larger ceiling
  const ceiling = document.createElement("a-plane");
  ceiling.setAttribute("position", "0 10 0");
  ceiling.setAttribute("rotation", "90 0 0");
  ceiling.setAttribute("width", "24");
  ceiling.setAttribute("height", "24");
  ceiling.setAttribute("src", "#ceiling-texture");
  ceiling.setAttribute("repeat", "12 12");
  parent.appendChild(ceiling);
}

function addArchitecturalDetails(parent, wallData) {
  const pos = wallData.position.split(" ");

  // Crown molding
  const crown = document.createElement("a-box");
  crown.setAttribute("position", `${pos[0]} 9.9 ${pos[2]}`);
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
    // North wall artworks (front)
    {
      position: "-8 4 -11.8",
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
    {
      position: "0 4 -11.8",
      rotation: "0 0 0",
      wall: "north",
      artwork: {
        src: "#the-scream",
        title: "The Scream",
        artist: "Edvard Munch",
        year: "1893",
        width: 4,
        height: 3,
      },
    },
    {
      position: "8 4 -11.8",
      rotation: "0 0 0",
      wall: "north",
      artwork: {
        src: "#girl-with-pearl",
        title: "Girl with a Pearl Earring",
        artist: "Johannes Vermeer",
        year: "1665",
        width: 4,
        height: 3,
      },
    },

    // East wall artworks (right)
    {
      position: "11.8 4 -8",
      rotation: "0 -90 0",
      wall: "east",
      artwork: {
        src: "#mona-lisa",
        title: "Mona Lisa",
        artist: "Leonardo da Vinci",
        year: "1503",
        width: 4,
        height: 3,
      },
    },
    {
      position: "11.8 4 0",
      rotation: "0 -90 0",
      wall: "east",
      artwork: {
        src: "#birth-of-venus",
        title: "The Birth of Venus",
        artist: "Sandro Botticelli",
        year: "1485",
        width: 4,
        height: 3,
      },
    },
    {
      position: "11.8 4 8",
      rotation: "0 -90 0",
      wall: "east",
      artwork: {
        src: "#water-lilies",
        title: "Water Lilies",
        artist: "Claude Monet",
        year: "1919",
        width: 4,
        height: 3,
      },
    },

    // South wall artworks (back)
    {
      position: "-8 4 11.8",
      rotation: "0 180 0",
      wall: "south",
      artwork: {
        src: "#persistence-of-memory",
        title: "The Persistence of Memory",
        artist: "Salvador Dalí",
        year: "1931",
        width: 4,
        height: 3,
      },
    },
    {
      position: "0 4 11.8",
      rotation: "0 180 0",
      wall: "south",
      artwork: {
        src: "#night-watch",
        title: "The Night Watch",
        artist: "Rembrandt",
        year: "1642",
        width: 4,
        height: 3,
      },
    },
    {
      position: "8 4 11.8",
      rotation: "0 180 0",
      wall: "south",
      artwork: {
        src: "#son-of-man",
        title: "The Son of Man",
        artist: "René Magritte",
        year: "1964",
        width: 4,
        height: 3,
      },
    },

    // West wall artworks (left)
    {
      position: "-11.8 4 -8",
      rotation: "0 90 0",
      wall: "west",
      artwork: {
        src: "#guernica",
        title: "Guernica",
        artist: "Pablo Picasso",
        year: "1937",
        width: 4,
        height: 3,
      },
    },
    {
      position: "-11.8 4 0",
      rotation: "0 90 0",
      wall: "west",
      artwork: {
        src: "#creation-of-adam",
        title: "The Creation of Adam",
        artist: "Michelangelo",
        year: "1512",
        width: 4,
        height: 3,
      },
    },
    {
      position: "-11.8 4 8",
      rotation: "0 90 0",
      wall: "west",
      artwork: {
        src: "#guernica",
        title: "Guernica",
        artist: "Pablo Picasso",
        year: "1937",
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
      const framePiece = document.createElement("a-box");
      framePiece.setAttribute("position", part.pos);
      framePiece.setAttribute("width", part.dim.split(" ")[0]);
      framePiece.setAttribute("height", part.dim.split(" ")[1]);
      framePiece.setAttribute("depth", part.dim.split(" ")[2]);
      framePiece.setAttribute("color", frameColor);
      framePiece.setAttribute("metalness", "0.6");
      framePiece.setAttribute("roughness", "0.3");
      frame.appendChild(framePiece);
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

    // Add enhanced zoom configuration
    artwork.setAttribute("artwork-zoom", {
      wall: data.wall,
      transitionSpeed: 1500,
      viewingDistance: 2,
      verticalOffset: 0.2,
    });

    // Set geometry component
    artwork.setAttribute("geometry", {
      primitive: "plane",
      width: data.artwork.width,
      height: data.artwork.height,
    });

    // Add info panel component
    artwork.setAttribute("info-panel", {
      title: data.artwork.title,
      artist: data.artwork.artist,
      year: data.artwork.year,
    });

    frame.appendChild(artwork);

    // Add title text above the frame with better styling
    const titleContainer = document.createElement("a-entity");
    titleContainer.setAttribute(
      "position",
      `0 ${data.artwork.height / 2 + 0.4} 0`
    );

    // Add the title text
    const titleText = document.createElement("a-text");
    titleText.setAttribute(
      "value",
      `${data.artwork.title} (${data.artwork.year})`
    );
    titleText.setAttribute("position", "0 0 0.04");
    titleText.setAttribute("align", "center");
    titleText.setAttribute("baseline", "center");
    titleText.setAttribute("width", "4");
    titleText.setAttribute("color", "#FFFFFF");
    titleText.setAttribute("scale", "1 1 1");

    titleContainer.appendChild(titleText);
    frame.appendChild(titleContainer);

    // Add spotlight for the artwork with optimized settings
    const spotlight = document.createElement("a-light");
    spotlight.setAttribute("type", "spot");
    spotlight.setAttribute("position", `0 ${data.artwork.height + 1} 0.5`);
    spotlight.setAttribute("rotation", "-90 0 0");
    spotlight.setAttribute("intensity", "0.6");
    spotlight.setAttribute("angle", "30");
    spotlight.setAttribute("penumbra", "0.3");
    spotlight.setAttribute("decay", "1");
    spotlight.setAttribute("distance", "5");
    spotlight.setAttribute("color", "#FFFFFF");
    spotlight.setAttribute("castShadow", "false");

    // Add performance attributes to artwork image
    artwork.setAttribute("renderer", "antialias: false");
    artwork.setAttribute("material", {
      shader: "flat",
      npot: false,
    });

    artworkContainer.appendChild(spotlight);
    artworkContainer.appendChild(frame);
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

  // More point lights for larger space
  const pointLights = [
    { position: "6 9.5 -6", intensity: "0.15" },
    { position: "-6 9.5 -6", intensity: "0.15" },
    { position: "6 9.5 6", intensity: "0.15" },
    { position: "-6 9.5 6", intensity: "0.15" },
    { position: "0 9.5 0", intensity: "0.15" },
    { position: "-10 9.5 0", intensity: "0.15" },
    { position: "10 9.5 0", intensity: "0.15" },
    { position: "0 9.5 -10", intensity: "0.15" },
    { position: "0 9.5 10", intensity: "0.15" },
  ];

  pointLights.forEach((light) => {
    const pointLight = document.createElement("a-light");
    pointLight.setAttribute("type", "point");
    pointLight.setAttribute("position", light.position);
    pointLight.setAttribute("intensity", light.intensity);
    pointLight.setAttribute("decay", "2");
    pointLight.setAttribute("distance", "15");
    parent.appendChild(pointLight);
  });
}
