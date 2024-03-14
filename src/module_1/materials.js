import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const textureLoader = new THREE.TextureLoader();
const paperTexture = textureLoader.load(
  "https://images.unsplash.com/photo-1603484477859-abe6a73f9366?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGV4dHVyZXxlbnwwfHwwfHx8MA%3D%3D"
);
const marbleTexture = textureLoader.load(
  "https://images.unsplash.com/photo-1566305977571-5666677c6e98?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGV4dHVyZXxlbnwwfHwwfHx8MA%3D%3D"
);
const metalTexture = textureLoader.load(
  "https://images.unsplash.com/photo-1535376472810-5d229c65da09?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHRleHR1cmV8ZW58MHx8MHx8fDA%3D"
);

const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();
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
camera.position.z = 4;
scene.add(camera);

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(1),
  new THREE.MeshBasicMaterial({ map: paperTexture })
);
sphere.position.x = -2;
const square = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ map: marbleTexture })
);
const donut = new THREE.Mesh(
  new THREE.TorusGeometry(1.5, 0.3, 13, 150),
  new THREE.MeshBasicMaterial({ map: metalTexture, wireframe: true })
);
donut.position.x = 2.5;

scene.add(sphere, donut, square);

const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sezes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

const clock = new THREE.Clock();
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  sphere.rotation.y = 0.1 * elapsedTime;
  square.rotation.y = 0.1 * elapsedTime;
  donut.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  square.rotation.x = 0.15 * elapsedTime;
  donut.rotation.x = 0.15 * elapsedTime;

  renderer.render(scene, camera);
  orbitControls.update();
  window.requestAnimationFrame(tick);
};

tick();
