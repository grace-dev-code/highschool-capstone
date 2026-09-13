import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { scene, monkGLTF } from '../main.js';


const health = ['/assets/items/Potion2_Filled.obj', '/assets/items/Potion2_Filled.mtl'];
const stamina = ['/assets/items/Potion4_Filled.obj', '/assets/items/Potion4_Filled.mtl'];

export let healthPotion;
export let staminaPotion;

let loaded;
let loadedS;


export function loadHealth(x, z){
    const objLoader = new OBJLoader();
    const mtlLoader = new MTLLoader();

    let objURL = health[0];
    let mtlURL = health[1]; 

    mtlLoader.load(mtlURL,
        function(mtl){
            loaded = false;
            mtl.preload();
            objLoader.setMaterials(mtl);
            objLoader.load(objURL,
                function(obj){
                    obj.position.set(x, 0, z);
                    healthPotion = obj;
                    scene.add(obj);
                    loaded = true;
                }
            )
        }
    )
}

export function loadStam(x, z){
    const mtlLoader = new MTLLoader();
    const objLoader = new OBJLoader();

    let objURL = stamina[0];
    let mtlURL = stamina[1];

    mtlLoader.load(mtlURL,
        function(mtl){
            loadedS = false;
            mtl.preload();
            objLoader.setMaterials(mtl);
            objLoader.load(objURL,
                function(obj){
                    obj.position.set(x, 0, z);
                    staminaPotion = obj;
                    scene.add(obj);
                    loadedS = true;
                }
            )
        }
    )
}

export let pickUp = false;

export function pickUpPotion(){
    if(loaded === true){
        let distance = monkGLTF.position.distanceTo(healthPotion.position);
        const pickUpHTML = document.getElementById('pickupTab');

        if(distance < 2){
            pickUp = true;
            pickUpHTML.style.display = 'block';
        }
        else{
            pickUp = false;
            pickUpHTML.style.display = 'none';
        }
    }
}

export let pickUpStam = false;

export function pickUpStamPotion(){
    if(loadedS === true){
        let distance = monkGLTF.position.distanceTo(staminaPotion.position);
        const pickUpHTML = document.getElementById('pickupStamTab');

        if(distance < 2){
            pickUpStam = true;
            pickUpHTML.style.display = 'block';
        }
        else{
            pickUpStam = false;
            pickUpHTML.style.display = 'none';
        }
    }
}