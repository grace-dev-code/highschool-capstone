// Load OBJ and glTF files (environment)

import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js'
import { scene } from '../main.js'


// -------Load OBJ -------

export const treeObjects = [
    ['/assets/environmentOBJ/BirchTree_1.obj', '/assets/environmentOBJ/BirchTree_1.mtl'],
    ['/assets/environmentOBJ/PineTree_5.obj', '/assets/environmentOBJ/PineTree_5.mtl'],
    ['/assets/environmentOBJ/Willow_1.obj', '/assets/environmentOBJ/Willow_1.mtl'],
    ['/assets/environmentOBJ/PalmTree_1.obj', '/assets/environmentOBJ/PalmTree_1.mtl'],
    ['/assets/environmentOBJ/CommonTree_Autumn_1.obj', '/assets/environmentOBJ/CommonTree_Autumn_1.mtl'],
    ['/assets/environmentOBJ/CommonTree_Dead_5.obj', '/assets/environmentOBJ/CommonTree_Dead_5.mtl'],
];

export const groundObjects = [
    ['/assets/environmentOBJ/Bush_1.obj', '/assets/environmentOBJ/Bush_1.mtl'],
    ['/assets/environmentOBJ/Cactus_3.obj', '/assets/environmentOBJ/Cactus_3.mtl'],
    ['/assets/environmentOBJ/CactusFlowers_2.obj', '/assets/environmentOBJ/CactusFlowers_2.mtl'],
    ['/assets/environmentOBJ/Flowers.obj', '/assets/environmentOBJ/Flowers.mtl'],
    ['/assets/environmentOBJ/Grass_2.obj', '/assets/environmentOBJ/Grass_2.mtl'],
    ['/assets/environmentOBJ/Rock_4.obj', '/assets/environmentOBJ/Rock_4.mtl'],
];


export function loadTrees(mtlURL, objURL, x, z){
    const OBJloader = new OBJLoader();
    const mtlloader = new MTLLoader();

    mtlloader.load(
        mtlURL,
        function(mtl){
            mtl.preload();    // ensure material are loaded
            OBJloader.setMaterials(mtl);
            OBJloader.load(
                objURL, 
                function(obj){
                    obj.scale.set(5, 5, 5);
                    obj.position.set(x, 0, z);
                    scene.add(obj);

                }
            );
        }
    )
}

export function loadGroundObj(mtlURL, objURL, x, z){
    const OBJloader = new OBJLoader();
    const mtlloader = new MTLLoader();

    mtlloader.load(
        mtlURL,
        function(mtl){
            mtl.preload();    // ensure material are loaded
            OBJloader.setMaterials(mtl);
            OBJloader.load(
                objURL, 
                function(obj){
                    obj.scale.set(4, 4, 4);
                    obj.position.set(x, 0, z);
                    scene.add(obj);

                }
            );
        }
    )
}




