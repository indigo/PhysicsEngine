import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';
import { RapierPhysics } from './RapierPhysics.js';
import { RapierHelper } from './RapierHelper.js';

let camera, scene, renderer, stats;
let physics, physicsHelper;

init();

async function init() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xbfd1e5 );

    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 100 );
    camera.position.set( 0, 3, 10 );

    const ambient = new THREE.HemisphereLight( 0xffeeee, 0xaaccaa );

    scene.add( ambient );

    const light = new THREE.DirectionalLight( 0xFFFF22, 1 );

    light.position.set( 0, 12.5, 12.5 );
    light.castShadow = true;
    light.shadow.radius = 3;
    light.shadow.blurSamples = 8;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;

    const size = 10;
    light.shadow.camera.left = - size;
    light.shadow.camera.bottom = - size;
    light.shadow.camera.right = size;
    light.shadow.camera.top = size;
    light.shadow.camera.near = 1;
    light.shadow.camera.far = 50;

    scene.add( light );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    document.body.appendChild( renderer.domElement );
    renderer.setAnimationLoop( animate );

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.target = new THREE.Vector3( 0, 2, 0 );
    controls.update();

    const geometry = new THREE.BoxGeometry( 10, 0.5, 10 );
    const material = new THREE.MeshStandardMaterial( { color: 0xaaaaaa } );

    const floor = new THREE.Mesh( geometry, material );
    floor.receiveShadow = true;

    floor.position.y = - 0.25;
    floor.userData.physics = { mass: 0.0 };

    scene.add( floor );

    new THREE.TextureLoader().load( '../textures/grid.png', function ( texture ) {

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 20, 20 );
        floor.material.map = texture;
        floor.material.needsUpdate = true;

    } );


    initPhysics();

    onWindowResize();

    window.addEventListener( 'resize', onWindowResize, false );

}

async function initPhysics() {

    //Initialize physics engine using the script in the jsm/physics folder
    physics = await RapierPhysics();

    physics.addScene( scene );

    //addBody( );

    //Optionally display collider outlines
    physicsHelper = new RapierHelper( physics.world );
    scene.add( physicsHelper );

    setInterval( addBody, 1000 );

}

function addBody( ) {

    const geometry = ( Math.random() > 0.5 ) ? new THREE.SphereGeometry( 0.5 ) : new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshStandardMaterial( { color: Math.floor( Math.random() * 0xFFFFFF ) } );

    const mesh = new THREE.Mesh( geometry, material );
    mesh.castShadow = true;

    mesh.position.set( Math.random() * 2 - 1, Math.random() * 3 + 6, Math.random() * 2 - 1 );

    scene.add( mesh );

    //parameter 2 - mass, parameter 3 - restitution ( how bouncy )
    physics.addMesh( mesh, 1, 0.5 );

}

function onWindowResize( ) {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}


function animate() {

    if ( physicsHelper ) physicsHelper.update();

    renderer.render( scene, camera );


}
