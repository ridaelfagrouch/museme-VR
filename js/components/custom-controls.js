// js/components/custom-controls.js

AFRAME.registerComponent("custom-controls", {
  schema: {
    moveSpeed: { type: "number", default: 0.15 },
    lookSpeed: { type: "number", default: 2 },
  },

  init: function () {
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);

    // State for keys
    this.keys = {
      ArrowUp: false, // Backward
      ArrowDown: false, // Forward
      ArrowLeft: false, // Strafe right (reversed)
      ArrowRight: false, // Strafe left (reversed)
      KeyW: false, // Look down
      KeyS: false, // Look up
      KeyA: false, // Look left (reversed)
      KeyD: false, // Look right (reversed)
    };

    // Museum boundaries
    this.bounds = {
      minX: -11.5,
      maxX: 11.5,
      minZ: -11.5,
      maxZ: 11.5,
    };

    // Create vectors for movement calculations
    this.moveVector = new THREE.Vector3();
    this.cameraDirection = new THREE.Vector3();
    this.sideVector = new THREE.Vector3();

    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
  },

  onKeyDown: function (event) {
    if (this.keys.hasOwnProperty(event.code)) {
      this.keys[event.code] = true;
      event.preventDefault();
    }
  },

  onKeyUp: function (event) {
    if (this.keys.hasOwnProperty(event.code)) {
      this.keys[event.code] = false;
      event.preventDefault();
    }
  },

  clampPosition: function (position) {
    return {
      x: Math.max(this.bounds.minX, Math.min(this.bounds.maxX, position.x)),
      z: Math.max(this.bounds.minZ, Math.min(this.bounds.maxZ, position.z)),
    };
  },

  tick: function (time, delta) {
    const deltaSeconds = delta / 1000;
    const position = this.el.object3D.position;
    const rotation = this.el.object3D.rotation;
    const camera = this.el.object3D;

    // Handle all movement
    if (
      this.keys.ArrowUp ||
      this.keys.ArrowDown ||
      this.keys.ArrowLeft ||
      this.keys.ArrowRight
    ) {
      // Reset movement vector
      this.moveVector.set(0, 0, 0);
      const moveSpeed = this.data.moveSpeed;

      // Get camera's forward direction
      camera.getWorldDirection(this.cameraDirection);
      this.cameraDirection.y = 0; // Keep movement horizontal
      this.cameraDirection.normalize();

      // Calculate right vector for strafing
      this.sideVector
        .copy(this.cameraDirection)
        .cross(new THREE.Vector3(0, 1, 0));

      // Forward/Backward movement
      if (this.keys.ArrowUp) {
        this.moveVector.add(
          this.cameraDirection.clone().multiplyScalar(-moveSpeed)
        );
      }
      if (this.keys.ArrowDown) {
        this.moveVector.add(
          this.cameraDirection.clone().multiplyScalar(moveSpeed)
        );
      }

      // Strafe movement (reversed)
      if (this.keys.ArrowLeft) {
        this.moveVector.add(this.sideVector.clone().multiplyScalar(moveSpeed)); // Reversed
      }
      if (this.keys.ArrowRight) {
        this.moveVector.add(this.sideVector.clone().multiplyScalar(-moveSpeed)); // Reversed
      }

      // Calculate new position
      const newPosition = {
        x: position.x + this.moveVector.x,
        z: position.z + this.moveVector.z,
      };

      // Apply clamped position
      const clampedPosition = this.clampPosition(newPosition);
      position.x = clampedPosition.x;
      position.z = clampedPosition.z;
    }

    // Handle camera rotation
    const lookSpeed = this.data.lookSpeed * deltaSeconds;

    // Vertical rotation (W/S)
    if (this.keys.KeyW) {
      rotation.x += lookSpeed; // Look down
    }
    if (this.keys.KeyS) {
      rotation.x -= lookSpeed; // Look up
    }

    // Horizontal rotation (A/D) - reversed
    if (this.keys.KeyA) {
      rotation.y += lookSpeed; // Look left
    }
    if (this.keys.KeyD) {
      rotation.y -= lookSpeed; // Look right
    }

    // Clamp vertical rotation
    rotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, rotation.x));
  },

  remove: function () {
    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("keyup", this.onKeyUp);
  },
});
