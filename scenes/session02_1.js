import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';

let camera, scene, renderer;

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

    scene.add( floor );

    new THREE.TextureLoader().load( '../textures/grid.png', function ( texture ) {

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 20, 20 );
        floor.material.map = texture;
        floor.material.needsUpdate = true;

    } );

    onWindowResize();

    window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize( ) {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}


// --- Animation parameters ---
const duration = 5.0; // seconds for one cycle
const sphereRadius = 0.15;
const arrowLength = 1.0;
let spheres, velocityArrows, accelerationArrows;
let clock = new THREE.Clock();

function createMotionObjects() {
    // Remove previous objects if any
    if (spheres) {
        for (let i = 0; i < 3; i++) {
            scene.remove(spheres[i]);
            scene.remove(velocityArrows[i]);
            scene.remove(accelerationArrows[i]);
        }
    }
    spheres = [];
    velocityArrows = [];
    accelerationArrows = [];
    const colors = [0xff0000, 0x00ff00, 0x0000ff];
    for (let i = 0; i < 3; i++) {
        // Sphere
        const geom = new THREE.SphereGeometry(sphereRadius, 32, 32);
        const mat = new THREE.MeshStandardMaterial({ color: colors[i] });
        const mesh = new THREE.Mesh(geom, mat);
        mesh.castShadow = true;
        scene.add(mesh);
        spheres.push(mesh);
        // Velocity arrow
        const vArrow = new THREE.ArrowHelper(new THREE.Vector3(1,0,0), new THREE.Vector3(0,0,0), arrowLength, 0x222222);
        scene.add(vArrow);
        velocityArrows.push(vArrow);
        // Acceleration arrow
        const aArrow = new THREE.ArrowHelper(new THREE.Vector3(0,1,0), new THREE.Vector3(0,0,0), arrowLength, 0x888800);
        scene.add(aArrow);
        accelerationArrows.push(aArrow);
    }
}

createMotionObjects();

function getLinearMotion(t) {
    const x = 6 * (t/duration);
    const pos = new THREE.Vector3(x, 1, 0);
    const vel = new THREE.Vector3(6/duration, 0, 0);
    const acc = new THREE.Vector3(0, 0, 0);
    return { pos, vel, acc };
}

function getCircularMotion(t) {
    const r = 2;
    const omega = 2 * Math.PI / duration;
    const theta = omega * t;
    const pos = new THREE.Vector3(r*Math.cos(theta), 1, r*Math.sin(theta));
    const vel = new THREE.Vector3(-r*omega*Math.sin(theta), 0, r*omega*Math.cos(theta));
    const acc = new THREE.Vector3(-r*omega*omega*Math.cos(theta), 0, -r*omega*omega*Math.sin(theta));
    return { pos, vel, acc };
}

// --- Ballistic motion state ---
const ballisticStart = new THREE.Vector3(-3, 1, -3); // starting position
const ballisticV0 = new THREE.Vector3(1, 8, 1);   // initial velocity (adjust as needed)
const ballisticA = new THREE.Vector3(0, -9.8, 0);   // gravity
let ballisticPosition = ballisticStart.clone();
let ballisticVelocity = ballisticV0.clone();
let lastBallisticTime = 0;

function resetBallistic() {
    ballisticPosition.copy(ballisticStart);
    ballisticVelocity.copy(ballisticV0);
}

function getBallisticMotion(dt) {
    // Update velocity and position using dt
    ballisticVelocity.addScaledVector(ballisticA, dt);
    ballisticPosition.addScaledVector(ballisticVelocity, dt);
    // Handle collisions with the floor
    if (ballisticPosition.y < 0) {
        ballisticPosition.y = 0;
        ballisticVelocity.y = -ballisticVelocity.y;
    }
    return {
        pos: ballisticPosition.clone(),
        vel: ballisticVelocity.clone(),
        acc: ballisticA.clone()
    };
}

function animate() {
    let dt = clock.getDelta(); // dt in seconds
    const t = clock.getElapsedTime() % duration;
    // Reset ballistic state at the start of each cycle
    if (t < lastBallisticTime) {
        resetBallistic();
        lastBallisticTime = t;
        renderer.render(scene, camera);
        return; // Skip ballistic update this frame
    }
    lastBallisticTime = t;

    // Linear motion
    const linear = getLinearMotion(t);
    spheres[0].position.copy(linear.pos);
    velocityArrows[0].position.copy(linear.pos);
    velocityArrows[0].setDirection(linear.vel.clone().normalize());
    velocityArrows[0].setLength(linear.vel.length() * 0.5, 0.15, 0.1);
    accelerationArrows[0].position.copy(linear.pos);
    accelerationArrows[0].setDirection(linear.acc.length() > 0 ? linear.acc.clone().normalize() : new THREE.Vector3(1,0,0));
    accelerationArrows[0].setLength(linear.acc.length() * 0.5, 0.15, 0.1);
    // Circular motion
    const circular = getCircularMotion(t);
    spheres[1].position.copy(circular.pos);
    velocityArrows[1].position.copy(circular.pos);
    velocityArrows[1].setDirection(circular.vel.clone().normalize());
    velocityArrows[1].setLength(circular.vel.length() * 0.5, 0.15, 0.1);
    accelerationArrows[1].position.copy(circular.pos);
    accelerationArrows[1].setDirection(circular.acc.clone().normalize());
    accelerationArrows[1].setLength(circular.acc.length() * 0.5, 0.15, 0.1);
    
    // Ballistic motion
    const ballistic = getBallisticMotion(dt);
    spheres[2].position.copy(ballistic.pos);
    velocityArrows[2].position.copy(ballistic.pos);
    velocityArrows[2].setDirection(ballistic.vel.clone().normalize());
    velocityArrows[2].setLength(ballistic.vel.length() * 0.5, 0.15, 0.1);
    accelerationArrows[2].position.copy(ballistic.pos);
    accelerationArrows[2].setDirection(ballistic.acc.clone().normalize());
    accelerationArrows[2].setLength(ballistic.acc.length() * 0.5, 0.15, 0.1);
    renderer.render(scene, camera);
}

