AFRAME.registerComponent("artwork-zoom", {
  schema: {
    artworkId: { type: "string" }, // Unique identifier for each artwork
    wall: { type: "string" }, // Wall identifier (north, south, east, west)
  },

  init: function () {
    this.originalCameraPosition = null;
    this.isZoomed = false;
    this.viewingDistance = 3;

    // Store the artwork's world position
    this.artworkWorldPosition = new THREE.Vector3();
    this.el.object3D.getWorldPosition(this.artworkWorldPosition);

    this.handleClick = () => {
      console.log("Clicked artwork:", this.data.artworkId); // Debug log
      if (!this.isZoomed) {
        this.zoomToArtwork();
      } else {
        this.zoomOut();
      }
    };

    this.el.addEventListener("click", this.handleClick);
  },

  zoomToArtwork: function () {
    const camera = document.querySelector("#camera-rig");
    if (!camera) return;

    // Store current camera position and rotation
    this.originalCameraPosition = {
      position: camera.getAttribute("position"),
      rotation: camera.getAttribute("rotation"),
    };

    let targetPosition, targetRotation;

    // Calculate target position based on wall
    switch (this.data.wall) {
      case "north":
        targetPosition = {
          x: this.artworkWorldPosition.x,
          y: 1.6,
          z: this.artworkWorldPosition.z + this.viewingDistance,
        };
        targetRotation = 180;
        break;
      case "south":
        targetPosition = {
          x: this.artworkWorldPosition.x,
          y: 1.6,
          z: this.artworkWorldPosition.z - this.viewingDistance,
        };
        targetRotation = 0;
        break;
      case "east":
        targetPosition = {
          x: this.artworkWorldPosition.x - this.viewingDistance,
          y: 1.6,
          z: this.artworkWorldPosition.z,
        };
        targetRotation = 90;
        break;
      case "west":
        targetPosition = {
          x: this.artworkWorldPosition.x + this.viewingDistance,
          y: 1.6,
          z: this.artworkWorldPosition.z,
        };
        targetRotation = -90;
        break;
    }

    console.log("Moving to artwork:", {
      id: this.data.artworkId,
      wall: this.data.wall,
      targetPosition,
      targetRotation,
    });

    // Move camera
    camera.setAttribute("animation__position", {
      property: "position",
      to: `${targetPosition.x} ${targetPosition.y} ${targetPosition.z}`,
      dur: 1500,
      easing: "easeInOutQuad",
    });

    // Rotate camera
    camera.setAttribute("animation__rotation", {
      property: "rotation",
      to: `0 ${targetRotation} 0`,
      dur: 1500,
      easing: "easeInOutQuad",
    });

    this.isZoomed = true;
  },

  zoomOut: function () {
    if (!this.originalCameraPosition) return;

    const camera = document.querySelector("#camera-rig");

    // Return to original position
    camera.setAttribute("animation__position", {
      property: "position",
      to: this.originalCameraPosition.position,
      dur: 1500,
      easing: "easeInOutQuad",
    });

    // Return to original rotation
    camera.setAttribute("animation__rotation", {
      property: "rotation",
      to: this.originalCameraPosition.rotation,
      dur: 1500,
      easing: "easeInOutQuad",
    });

    this.isZoomed = false;
  },

  remove: function () {
    this.el.removeEventListener("click", this.handleClick);
  },
});
