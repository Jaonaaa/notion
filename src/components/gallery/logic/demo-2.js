import { Renderer, Camera, Transform, Plane, Post, Vec2 } from "ogl";
import NormalizeWheel from "normalize-wheel";

import { lerp } from "./utils/math";

import fragment from "./demo-2/post.glsl";
import Media from "./demo-2/Media";

import { Vec3, Mat4 } from "ogl";

const startSpeed = 220;
export function getRayFromCamera(ndc, camera) {
  const invVP = new Mat4();

  const vp = new Mat4();
  vp.multiply(camera.projectionMatrix, camera.viewMatrix);
  invVP.inverse(vp);

  const nearPoint = new Vec3(ndc.x, ndc.y, -1);
  nearPoint.transformDirection(invVP);

  const farPoint = new Vec3(ndc.x, ndc.y, 1);
  farPoint.transformDirection(invVP);

  const direction = new Vec3().sub(farPoint, nearPoint).normalize();

  return {
    origin: nearPoint,
    direction,
  };
}

export default class App {
  constructor() {
    this.scroll = {
      ease: 0.05,
      current: 0,
      target: 0,
      last: 0,
    };

    this.speed = startSpeed;

    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.createGallery();
    this.createPost();

    this.onResize();

    this.createGeometry();
    this.createMedias();

    this.update();

    this.addEventListeners();
  }

  createGallery() {
    this.gallery = document.querySelector(".demo-2__gallery");
  }

  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
    });

    this.gl = this.renderer.gl;

    const canvases = document.querySelectorAll("canvas");
    canvases.forEach((canvas) => canvas.remove());

    document.body.appendChild(this.gl.canvas);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 5;
  }

  createScene() {
    this.scene = new Transform();
  }

  createPost() {
    this.post = new Post(this.gl);

    this.pass = this.post.addPass({
      fragment,
      uniforms: {
        uResolution: this.resolution,
        uStrength: { value: 0 },
      },
    });

    this.resolution = {
      value: new Vec2(),
    };
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      widthSegments: 20,
    });
  }

  onClick(event) {
    const ndc = new Vec2((event.clientX / this.screen.width) * 2 - 1, -(event.clientY / this.screen.height) * 2 + 1);

    const { origin, direction } = getRayFromCamera(ndc, this.camera);

    this.medias.forEach((media) => {
      if (media.raycast(origin, direction)) {
        console.log("Clicked media:", media.element);
      }
    });
  }

  createMedias() {
    this.mediasElements = document.querySelectorAll(".demo-2__gallery__figure");
    this.medias = Array.from(this.mediasElements).map((element) => {
      let media = new Media({
        element,
        geometry: this.planeGeometry,
        gl: this.gl,
        scene: this.scene,
        screen: this.screen,
        viewport: this.viewport,
        width: this.galleryWidth,
        camera: this.camera, // Add this
      });

      return media;
    });
  }

  /**
   * Events.
   */
  onTouchDown(event) {
    this.isDown = true;

    this.scroll.position = this.scroll.current;
    this.start = event.touches ? event.touches[0].clientX : event.clientX;
  }

  onTouchMove(event) {
    if (!this.isDown) return;

    const x = event.touches ? event.touches[0].clientX : event.clientX;
    const distance = (this.start - x) * 2;

    this.scroll.target = this.scroll.position + distance;
  }

  onTouchUp() {
    this.isDown = false;
  }

  onWheel(event) {
    const normalized = NormalizeWheel(event);
    const speed = normalized.pixelY;

    this.scroll.target += speed * 0.5;
  }

  /**
   * Resize.
   */
  onResize() {
    this.screen = {
      height: window.innerHeight,
      width: window.innerWidth,
    };

    this.renderer.setSize(this.screen.width, this.screen.height);

    this.camera.perspective({
      aspect: this.gl.canvas.width / this.gl.canvas.height,
    });

    const fov = this.camera.fov * (Math.PI / 180);
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;

    this.viewport = {
      height,
      width,
    };

    this.post.resize();

    this.resolution.value.set(this.gl.canvas.width, this.gl.canvas.height);

    this.galleryBounds = this.gallery.getBoundingClientRect();
    this.galleryWidth = (this.viewport.width * this.galleryBounds.width) / this.screen.width;

    if (this.medias) {
      this.medias.forEach((media) =>
        media.onResize({
          screen: this.screen,
          viewport: this.viewport,
          width: this.galleryWidth,
        })
      );
    }
  }

  /**
   * Update.
   */
  update() {
    if (!this.initialSpeedBoosted) {
      this.initialSpeedBoosted = true;
      const originalSpeed = 2;
      setTimeout(() => {
        let speedIt = startSpeed; // Start with a high speed
        const interval = setInterval(() => {
          speedIt = lerp(speedIt, originalSpeed, 0.1);
          this.speed = speedIt;

          if (Math.abs(speedIt - originalSpeed) < 0.01) {
            this.speed = speedIt;
            clearInterval(interval);
          }
        }, 80);
      }, 10);
    }

    this.scroll.target += this.speed;

    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);

    if (this.scroll.current > this.scroll.last) {
      this.direction = "down";
      this.speed = 2;
    } else if (this.scroll.current < this.scroll.last) {
      this.direction = "up";
      this.speed = -2;
    }

    if (this.medias) {
      this.medias.forEach((media) => media.update(this.scroll, this.direction));
    }

    this.pass.uniforms.uStrength.value = ((this.scroll.current - this.scroll.last) / this.screen.width) * 0.5;

    this.post.render({
      scene: this.scene,
      camera: this.camera,
    });

    this.scroll.last = this.scroll.current;

    window.requestAnimationFrame(this.update.bind(this));
  }

  /**
   * Listeners.
   */
  addEventListeners() {
    window.addEventListener("resize", this.onResize.bind(this));

    window.addEventListener("mousewheel", this.onWheel.bind(this));
    window.addEventListener("wheel", this.onWheel.bind(this));

    window.addEventListener("mousedown", this.onTouchDown.bind(this));
    window.addEventListener("mousemove", this.onTouchMove.bind(this));
    window.addEventListener("mouseup", this.onTouchUp.bind(this));

    window.addEventListener("touchstart", this.onTouchDown.bind(this));
    window.addEventListener("touchmove", this.onTouchMove.bind(this));
    window.addEventListener("touchend", this.onTouchUp.bind(this));

    window.addEventListener("click", this.onClick.bind(this));
  }
}
