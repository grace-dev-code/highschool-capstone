// Load monsters and movements

import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { scene, monkGLTF, playerStats, damage } from '../main.js'

export const monstersList = [
    '/assets/monsters/Birb.gltf',
    '/assets/monsters/BlueDemon.gltf',
    '/assets/monsters/Cactoro.gltf',
    '/assets/monsters/Demon.gltf',
    '/assets/monsters/Dino.gltf',
    '/assets/monsters/Fish.gltf',
    '/assets/monsters/Frog.gltf',
    '/assets/monsters/MushroomKing.gltf',
    '/assets/monsters/Ninja.gltf',
    '/assets/monsters/Orc.gltf',
]

export const monstersObjects = [];
export const monstersAnimation = [];
export const monsterName = [];
export const monsterRandAng = [];

export class Monsters{
    // constructor
    constructor(){
        const self = this;
    }

    // methods
    load(){
        const gltfLoader = new GLTFLoader();
        for(let url of monstersList){
            gltfLoader.load(
                url,
                function(gltf){
                    // load random position and rotation
                    const monster = gltf.scene;
                    scene.add(monster);
                    let ranNumX = THREE.MathUtils.randFloat(-40, 40);
                    let ranNumZ = THREE.MathUtils.randFloat(-40, 40);
                    let ranRotation = THREE.MathUtils.randFloat(0, 360);
                    monster.rotation.y = THREE.MathUtils.degToRad(ranRotation);
                    monster.position.set(ranNumX, 0, ranNumZ);
                    // -------get animations-------
                    const mixer = new THREE.AnimationMixer(monster);

                    // get obj name
                    let name = url.split('/').pop().replace('.gltf', '');
                    monster.name = name;
                    monster.userData.dead = false;
                    monster.userData.state = 'walk';

                    // random angle for later use
                    let randomAng = THREE.MathUtils.randFloat(0, 360);
                    monsterRandAng.push(randomAng);

                    let animations ={
                            mixer: mixer,
                            name: name,
                            walk: mixer.clipAction(gltf.animations[10]),
                            attack: mixer.clipAction(gltf.animations[8]),
                            death: mixer.clipAction(gltf.animations[0]),
                            hit: mixer.clipAction(gltf.animations[2]),
                    };

                    // Set up attack loops:

                    animations.attack.setLoop(THREE.LoopOnce);
                    

                    animations.mixer.addEventListener('finished', 
                        function(){
                            let dist = monster.position.distanceTo(monkGLTF);
                            
                            if(monster.userData.dead === false && monkGLTF.userData.dead === false ){
                                playerStats.playerHealth--;
                                
                                // Call GUI Here after animation run
                                damage();
                            }
                        }
                    );
                    
                    monstersAnimation.push(animations);
                    monstersObjects.push(monster);

                    animations.walk.play();
                    self.loaded = true;
                }
            )
        }
    }

    update(){
        for (let obj of monstersObjects){
            
            if(self.loaded === true){
                const dist = obj.position.distanceTo(monkGLTF.position);
                
                // auto movement
                if(dist >= 15 && obj.userData.dead === false && monkGLTF.userData.dead === false){
                    let velMonster = new THREE.Vector3(0, 0, 0.02);
                    let velMonsterOffset = new THREE.Vector3(0, 1, 0);
                    velMonster.applyAxisAngle(velMonsterOffset, obj.rotation.y);

                    //clamp boundary
                    obj.position.x = THREE.MathUtils.clamp(obj.position.x, -50, 50);
                    obj.position.z = THREE.MathUtils.clamp(obj.position.z, -50, 50);
                    if(obj.position.x === -50 || obj.position.x === 50 || 
                        obj.position.z === -50 || obj.position.z === 50){
                        obj.rotation.y += THREE.MathUtils.degToRad(180);
                    }

                    obj.position.add(velMonster);
                }
            }
            
        }
    }

}
