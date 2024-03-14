import * as THREE from "three";
import * as GUI from "lil-gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
  console.log("Loading started");
};
loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
  console.log(`Progress: ${itemsLoaded} of ${itemsTotal} items loaded.`);
};
loadingManager.onLoad = () => {
  console.log("Loading complete!");
};
loadingManager.onError = (url) => {
  console.error(`There was an error loading ${url}`);
};
const textureLoader = new THREE.TextureLoader(loadingManager);
const texture = textureLoader.load(
  "https://images.unsplash.com/photo-1620812097331-ff636155488f?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  undefined,
  undefined,
  (error) => console.error("An error occurred:", error)
);

// Boilerplate CODE
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();

const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ map: texture })
);
scene.add(mesh);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

const tick = () => {
  renderer.render(scene, camera);
  orbitControls.update();
  window.requestAnimationFrame(tick);
};

tick();
