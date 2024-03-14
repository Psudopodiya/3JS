import * as THREE from "three";
import gsap from "gsap";

const canvas = document.querySelector("canvas.webgl");

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 2, 2);
const material = new THREE.MeshBasicMaterial({ color: "blue" });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

const sizes = {
  width: 800,
  height: 600,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
const axesHelper = new THREE.AxesHelper(5);
camera.position.z = 3;
scene.add(camera);
scene.add(axesHelper);
camera.lookAt(mesh.position);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

//Clock
const clock = new THREE.Clock();

//GSAP ANIMATIONS
console.log(gsap);
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });

// //Animations
const tick = () => {
  //   //Timers

  //   const elapsedTime = clock.getElapsedTime();
  //   //Update i.e transformation of object
  //   mesh.rotation.y = Math.tan(elapsedTime);
  //   mesh.position.x = Math.sin(elapsedTime);
  //   mesh.position.y = Math.cos(elapsedTime);

  //Rendering
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
