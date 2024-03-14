import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const canvas = document.querySelector("canvas.webgl");

const scene = new THREE.Scene();
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "red" })
);
scene.add(mesh);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//Resizing the screen logic
window.addEventListener("resize", () => {
  //Update the size
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //Update the camera aspect ratio
  camera.aspect = sizes.width / sizes.height;

  //Important as camera needs to know the updation of the screen has been made
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//Toggeling full screen
window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

const orbitControl = new OrbitControls(camera, canvas);
orbitControl.enableDamping = true;

const tick = () => {
  renderer.render(scene, camera);
  orbitControl.update();
  window.requestAnimationFrame(tick);
};
tick();
