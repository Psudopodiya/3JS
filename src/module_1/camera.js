import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const canvas = document.querySelector("canvas.webgl");

const scene = new THREE.Scene();

const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
});

const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  new THREE.MeshBasicMaterial({ color: "red" })
);
scene.add(mesh);

const sizes = {
  width: 800,
  height: 600,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);

//BASIC CAMERA MOTION AND ANIMATIONS USING THE CLOCK

// const clock = new THREE.Clock();
// const tick = () => {
//   const et = clock.getElapsedTime();
//   //   Animation i.e the totation update
//   mesh.rotation.y = et;
//   renderer.render(scene, camera);
//   window.requestAnimationFrame(tick);
// };
// tick();

//CAMERA CUSTOM MOTIONS
// const tick = () => {
//   camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
//   camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
//   camera.position.y = cursor.y * 5;
//   camera.lookAt(mesh.position);
//   renderer.render(scene, camera);
//   window.requestAnimationFrame(tick);
// };
// tick();

//ORBIT CONTROL

console.log(OrbitControls);
const control = new OrbitControls(camera, canvas);
control.enableDamping = true;

const tick = () => {
  renderer.render(scene, camera);
  //Updates the control when damping
  control.update();
  window.requestAnimationFrame(tick);
};
tick();
