import { Mesh, Program, Texture, Vec2 } from "ogl";

import fragment from "./fragment.glsl";
import vertex from "./vertex.glsl";

export default class {
  constructor({ element, geometry, gl, scene, screen, viewport, width, camera }) {
    this.element = element;
    this.image = this.element.querySelector("img");

    this.extra = 0;
    this.geometry = geometry;
    this.gl = gl;
    this.scene = scene;
    this.screen = screen;
    this.viewport = viewport;
    this.width = width;
    this.camera = camera;

    this.createMesh();
    this.createBounds();

    this.onResize();
  }

  createMesh() {
    const image = new Image();
    const texture = new Texture(this.gl, {
      generateMipmaps: false,
    });

    image.src = this.image.src;
    image.onload = () => {
      program.uniforms.uImageSizes.value = [image.naturalWidth, image.naturalHeight];
      texture.image = image;
    };

    const program = new Program(this.gl, {
      fragment,
      vertex,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uViewportSizes: { value: [this.viewport.width, this.viewport.height] },
        uStrength: { value: 0 },
      },
      transparent: true,
    });

    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program,
    });

    this.plane.setParent(this.scene);
  }

  createBounds() {
    this.bounds = this.element.getBoundingClientRect();

    this.updateScale();
    this.updateX();
    this.updateY();

    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
  }

  updateScale() {
    this.plane.scale.x = (this.viewport.width * this.bounds.width) / this.screen.width;
    this.plane.scale.y = (this.viewport.height * this.bounds.height) / this.screen.height;
  }

  updateX(x = 0) {
    this.plane.position.x =
      -(this.viewport.width / 2) +
      this.plane.scale.x / 2 +
      ((this.bounds.left - x) / this.screen.width) * this.viewport.width -
      this.extra;
  }

  updateY(y = 0) {
    this.plane.position.y =
      this.viewport.height / 2 - this.plane.scale.y / 2 - ((this.bounds.top - y) / this.screen.height) * this.viewport.height;
  }

  update(x, direction) {
    this.updateScale();
    this.updateX(x.current);
    this.updateY();

    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;

    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;

    if (direction === "down" && this.isBefore) {
      this.extra -= this.width;

      this.isBefore = false;
      this.isAfter = false;
    }

    if (direction === "up" && this.isAfter) {
      this.extra += this.width;

      this.isBefore = false;
      this.isAfter = false;
    }

    this.plane.program.uniforms.uStrength.value = ((x.current - x.last) / this.screen.width) * 5;
  }

  /**
   * Events.
   */
  onResize(sizes) {
    this.extra = 0;

    if (sizes) {
      const { width, screen, viewport } = sizes;

      if (width) this.width = width;
      if (screen) this.screen = screen;
      if (viewport) {
        this.viewport = viewport;

        this.plane.program.uniforms.uViewportSizes.value = [this.viewport.width, this.viewport.height];
      }
    }

    this.createBounds();
  }

  raycast(origin, direction) {
    // Get plane normal (assuming it's facing camera directly on Z-axis)
    const planeNormal = [0, 0, 1];

    // Plane position in world space
    const planePos = this.plane.position;

    // Dot product to determine if ray is hitting plane
    const denom = direction.dot(planeNormal);
    if (Math.abs(denom) < 1e-6) return false;

    const diff = [planePos.x - origin.x, planePos.y - origin.y, planePos.z - origin.z];

    const t = (diff[0] * planeNormal[0] + diff[1] * planeNormal[1] + diff[2] * planeNormal[2]) / denom;
    if (t < 0) return false;

    const hitPoint = {
      x: origin.x + direction.x * t,
      y: origin.y + direction.y * t,
      z: origin.z + direction.z * t,
    };

    // Check if hitPoint is inside plane bounds
    const halfWidth = this.plane.scale.x / 2;
    const halfHeight = this.plane.scale.y / 2;

    if (
      hitPoint.x >= this.plane.position.x - halfWidth &&
      hitPoint.x <= this.plane.position.x + halfWidth &&
      hitPoint.y >= this.plane.position.y - halfHeight &&
      hitPoint.y <= this.plane.position.y + halfHeight
    ) {
      return true;
    }

    return false;
  }
}
