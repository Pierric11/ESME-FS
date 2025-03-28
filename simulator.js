import * as THREE from 'three';
//import { FlyControls } from 'three/addons/controls/FlyControls.js'; 
import { Utils3dLoader } from './js/Utils3d.js';
import { PlaneControls } from './js/PlaneControls.js';

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

const loader = new Utils3dLoader();


const controls = new PlaneControls( camera );
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
camera.position.y = 10;

loader.load('asset/tree_default', (obj) => {

    // Au besoin, redimensionner l'objet

    obj.scale.set(10, 20, 10); // Ici : x2 en hauteur

    // Le placer
    for(let i = 0; i < 100; i++)
    {
        // Le cloner si il est réutilisé
        const tmp = obj.clone();

        tmp.position.x = Math.random()*1000 - 500;
        tmp.position.z = Math.random()*1000 - 500;
        tmp.position.y = 0;
        // L'ajouter dans la scène
        scene.add(tmp);
    }
});

loader.load('asset/tree_default_fall', (obj) => {    

    obj.scale.set(10, 20, 10); 
    
    for(let i = 0; i < (50); i++)
    {
        const tmp = obj.clone();

        tmp.position.x = Math.random()*1000 - 500;
        tmp.position.z = Math.random()*1000 - 500;
        tmp.position.y = 0;
     
        scene.add(tmp);
    }
});

loader.load('asset/rock_largeA', (obj) => {    

    obj.scale.set(10, 20, 10); 
    
    for(let i = 0; i < (50); i++)
    {
        const tmp = obj.clone();

        tmp.position.x = Math.random()*1000 - 500;
        tmp.position.z = Math.random()*1000 - 500;
        tmp.position.y = 0;
     
        scene.add(tmp);
    }
});

loader.load('asset/tent_detailedOpen', (obj) => {    

    obj.scale.set(10, 20, 10); 
    
    for(let i = 0; i < (10); i++)
    {
        const tmp = obj.clone();

        tmp.position.x = Math.random()*1000 - 500;
        tmp.position.z = Math.random()*1000 - 500;
        tmp.position.y = 0;
     
        scene.add(tmp);
    }
});

renderer.setAnimationLoop(()=>{
    const delta = clock.getDelta();

    controls.update( delta );
    
/*    const up = new THREE.Vector3(0, 1, 0);
    const front = new THREE.Vector3(0, 0, -1);
    cam_up = up.clone().applyQuaternion(camera.quaternion);
    cam_front = front.clone().applyQuaternion(camera.quaternion);
    cam_right = front.clone().cross(up)

    const pitch = (cam_front**2/Math.sqrt(cam_front.x*cameram_fron+cam_front**2))*47;
    const roll = Math.atan(2)*(cam_right.dot(up),camupt.dot(up));*/
    const roll = controls.getRoll();
    const pitch = controls.getPitchRate();

    back.style.transform = `translateY(${pitch*47}%) rotate(${roll}rad)`;
    cercle.style.transform = `rotate(${roll}rad)`;
    renderer.render( scene, camera );
});