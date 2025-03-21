import * as THREE from 'three';
import { FlyControls } from 'three/addons/controls/FlyControls.js'; 

const CAM_FOV = 60, CAM_NEAR = 0.1, CAM_FAR = 1000;
const COLOR_SKY = 0x5dade2, COLOR_GROUND = 0x219313 , COLOR_LIGHT = 0xfdfefe;
const ROLL_SPEED = 0.05;
const view = document.getElementById('ecran');
const camera = new THREE.PerspectiveCamera(CAM_FOV, view.clientWidth / view.clientHeight, CAM_NEAR, CAM_FAR);

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ canvas: view, antialias: true });
const ground = new THREE.Mesh(
    new THREE.PlaneGeometry( 1000, 1000 ),
    new THREE.MeshStandardMaterial( { color: COLOR_GROUND } )
);
const light = new THREE.AmbientLight(COLOR_LIGHT);
const controls = new FlyControls( camera, document.body );
const clock = new THREE.Clock();

const back = document.getElementById('background');
const cercle = document.getElementById('cercle');
const fond = document.getElementById('fond_cercle');
const fleche = document.getElementById('fleche');

controls.dragToLook = true;
controls.rollSpeed = ROLL_SPEED;

scene.background = new THREE.Color(COLOR_SKY);
ground.rotation.x = - Math.PI / 2;
scene.add( ground );
scene.add( light );
camera.position.y = 100;

renderer.setAnimationLoop(()=>{
    const delta = clock.getDelta();

    controls.update( delta );
    const pitch = 1.41;
    const roll = Math.PI/12;
    back.style.transformation = `translateY(${pitch}%) rotate(${roll}rad)`;
    cercle.style.transformation = `rotate(${roll}rad)`;
    renderer.render( scene, camera );
});