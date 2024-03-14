import * as THREE from "three";
import * as GUI from "lil-gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const gui = new GUI.GUI();

const canvas = document.querySelector("canvas.webgl");

const scene = new THREE.Scene();
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshBasicMaterial({ color: "red", wireframe: true })
);
gui.add(mesh.position, "y").min(-3).max(3).step(0.001).name("elevation");
gui.addColor();
scene.add(mesh);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

const tick = () => {
  renderer.render(scene, camera);
  orbitControls.update();
  window.requestAnimationFrame(tick);
};
tick();
