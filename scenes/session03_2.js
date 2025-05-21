import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';

let camera, scene, renderer;
let spheres, velocityArrows, accelerationArrows;
let clock = new THREE.Clock();

// --- Simulation Parameters Object ---
const params = {
    duration: 7.0, // seconds for one cycle
    sphereRadius: 0.15,
    arrowLength: 1.0,
    // Ballistic motion parameters
    startPositionX: -3,
    startPositionY: 1,
    startPositionZ: -3,
    initialVelocityX: 4,
    initialVelocityY: 16,
    initialVelocityZ: 4,
    gravityY: -9.8,
    mass: 1.0, // Added mass
    airResistance: 0.1,
    windForceX: 0.0,
    windForceY: 0.0,
    windForceZ: -0.1,
    timeStepFactor: 1.0, // To scale dt
    resetBallistic: function() { resetBallisticMotion(); } // Function to call from GUI
};

// --- Ballistic motion state (global for reset and updates) ---
let ballisticPosition = new THREE.Vector3(params.startPositionX, params.startPositionY, params.startPositionZ);
let currentVelocity = new THREE.Vector3(params.initialVelocityX, params.initialVelocityY, params.initialVelocityZ);
let gravityVector = new THREE.Vector3(0, params.gravityY, 0);
let windForce = new THREE.Vector3(params.windForceX, params.windForceY, params.windForceZ); // Initialize windForce
let lastBallisticTime = 0;

init();
setupGUI(); // Call the function to set up the GUI

async function init() {
    // ... (your existing scene, camera, light, renderer, controls, floor setup) ...
    // The init function remains largely the same, just ensure it uses params where appropriate if needed at init time.

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

    const geometry = new THREE.BoxGeometry( 10, 0.1, 10 ); // Give floor some thickness
    const material = new THREE.MeshStandardMaterial( { color: 0xaaaaaa } );
    const floor = new THREE.Mesh( geometry, material );
    floor.receiveShadow = true;
    floor.position.y = -0.05; // Adjust position based on thickness
    scene.add( floor );

    new THREE.TextureLoader().load( '../textures/grid.png', function ( texture ) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 20, 20 );
        floor.material.map = texture;
        floor.material.needsUpdate = true;
    } );


    createMotionObjects(); // Create spheres and arrows

    window.addEventListener( 'resize', onWindowResize, false );
    onWindowResize(); // Initial call
}

function onWindowResize( ) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function createMotionObjects() {
    if (spheres) {
        for (let i = 0; i < 3; i++) {
            if (spheres[i]) scene.remove(spheres[i]);
            if (velocityArrows[i]) scene.remove(velocityArrows[i]);
            if (accelerationArrows[i]) scene.remove(accelerationArrows[i]);
        }
    }
    spheres = [];
    velocityArrows = [];
    accelerationArrows = [];
    const colors = [0xee1111, 0x0011ee11, 0x1111ee]; // Red, Green, Blue
    for (let i = 0; i < 3; i++) {
        const geom = new THREE.SphereGeometry(params.sphereRadius, 16, 16);
        const mat = new THREE.MeshStandardMaterial({ color: colors[i] });
        const mesh = new THREE.Mesh(geom, mat);
        mesh.castShadow = true;
        scene.add(mesh);
        spheres.push(mesh);

        const vArrow = new THREE.ArrowHelper(new THREE.Vector3(1,0,0), new THREE.Vector3(0,0,0), params.arrowLength, 0x222222);
        scene.add(vArrow);
        velocityArrows.push(vArrow);

        const aArrow = new THREE.ArrowHelper(new THREE.Vector3(0,1,0), new THREE.Vector3(0,0,0), params.arrowLength, 0x888800);
        scene.add(aArrow);
        accelerationArrows.push(aArrow);
    }
}

function resetBallisticMotion() {
    ballisticPosition.set(params.startPositionX, params.startPositionY, params.startPositionZ);
    currentVelocity.set(params.initialVelocityX, params.initialVelocityY, params.initialVelocityZ);
    // Update vectors that depend on params
    gravityVector.set(0, params.gravityY, 0);
    windForce.set(params.windForceX, params.windForceY, params.windForceZ);
    lastBallisticTime = clock.getElapsedTime() % params.duration; // Reset time carefully
}

function getBallisticMotion(dt) {
    // Update global vectors from params object (in case they changed via GUI)
    gravityVector.set(0, params.gravityY, 0);
    windForce.set(params.windForceX, params.windForceY, params.windForceZ);

    const velocityMagnitude = currentVelocity.length();
    let dragForce = new THREE.Vector3();

    if (velocityMagnitude > 0) {
        const velocityDirection = currentVelocity.clone().normalize();
        const dragMagnitude = params.airResistance * velocityMagnitude * velocityMagnitude;
        dragForce = velocityDirection.multiplyScalar(-dragMagnitude);
    }

    let netAcceleration = new THREE.Vector3();
    netAcceleration.add(dragForce.clone().divideScalar(params.mass)); // a_drag = F_drag / m
    netAcceleration.add(gravityVector); // a_gravity = g (gravityVector is g itself)
    netAcceleration.add(windForce.clone().divideScalar(params.mass)); // a_wind = F_wind / m

    // Update velocity: v_new = v_old + a_net * dt
    currentVelocity.addScaledVector(netAcceleration, dt);

    // Update position: pos_new = pos_old + v_new * dt
    ballisticPosition.addScaledVector(currentVelocity, dt);

    // Handle collisions with the floor
    if (ballisticPosition.y < params.sphereRadius) { // Adjust based on sphereRadius
        ballisticPosition.y = params.sphereRadius;
        currentVelocity.y = -currentVelocity.y;
        currentVelocity.multiplyScalar(0.3); // Energy loss
    }

    return {
        pos: ballisticPosition.clone(),
        vel: currentVelocity.clone(),
        // For simplicity, we can show the net acceleration or just gravity as 'acc'
        // acc: gravityVector.clone()
        acc: netAcceleration.clone() // More accurate representation of what's causing change in v
    };
}

function animate() {
    let dt = clock.getDelta() * params.timeStepFactor; // Apply time step factor
    const t = clock.getElapsedTime() % params.duration;

    // Reset ballistic state at the start of each cycle or if params.duration changes
    // A bit tricky to handle duration change perfectly without a full reset button for everything
    if (t < lastBallisticTime) {
        resetBallisticMotion();
    }
    lastBallisticTime = t;

    // Ballistic motion
    const ballistic = getBallisticMotion(dt);
    spheres[2].position.copy(ballistic.pos);
    velocityArrows[2].position.copy(ballistic.pos);
    if (ballistic.vel.lengthSq() > 0.001) { // Only set direction if velocity is significant
         velocityArrows[2].setDirection(ballistic.vel.clone().normalize());
    }
    velocityArrows[2].setLength(ballistic.vel.length() * 0.5, 0.15, 0.1);
    accelerationArrows[2].position.copy(ballistic.pos);
     if (ballistic.acc.lengthSq() > 0.001) { // Only set direction if acceleration is significant
        accelerationArrows[2].setDirection(ballistic.acc.clone().normalize());
    }
    accelerationArrows[2].setLength(ballistic.acc.length() * 0.5, 0.15, 0.1);

    renderer.render(scene, camera);
}

// --- dat.GUI Setup ---
function setupGUI() {
    const gui = new dat.GUI();

    // General parameters
    const generalFolder = gui.addFolder('General');
    generalFolder.add(params, 'duration', 1, 20).name('Cycle Duration (s)');
    generalFolder.add(params, 'sphereRadius', 0.05, 0.5).name('Sphere Radius').onChange(createMotionObjects); // Recreate if radius changes
    generalFolder.add(params, 'arrowLength', 0.5, 2.0).name('Arrow Max Length');
    generalFolder.add(params, 'timeStepFactor', 0.1, 2.0).name('Time Speed');
    generalFolder.open();

    // Ballistic Motion Parameters
    const ballisticFolder = gui.addFolder('Ballistic Motion');
    const startPosFolder = ballisticFolder.addFolder('Start Position');
    startPosFolder.add(params, 'startPositionX', -5, 5).name('X');
    startPosFolder.add(params, 'startPositionY', 0.1, 5).name('Y');
    startPosFolder.add(params, 'startPositionZ', -5, 5).name('Z');
    // startPosFolder.open(); // Optionally open subfolders

    const initialVelFolder = ballisticFolder.addFolder('Initial Velocity');
    initialVelFolder.add(params, 'initialVelocityX', -20, 20).name('X');
    initialVelFolder.add(params, 'initialVelocityY', 0, 30).name('Y');
    initialVelFolder.add(params, 'initialVelocityZ', -20, 20).name('Z');
    // initialVelFolder.open();

    ballisticFolder.add(params, 'gravityY', -20, 0).name('Gravity Y');
    ballisticFolder.add(params, 'mass', 0.1, 10).name('Mass (kg)');
    ballisticFolder.add(params, 'airResistance', 0, 1.0).name('Air Resistance Coeff.');

    const windFolder = ballisticFolder.addFolder('Wind Force');
    windFolder.add(params, 'windForceX', -1.0, 1.0).name('X');
    windFolder.add(params, 'windForceY', -1.0, 1.0).name('Y');
    windFolder.add(params, 'windForceZ', -1.0, 1.0).name('Z');
    // windFolder.open();

    ballisticFolder.add(params, 'resetBallistic').name('Reset Ballistic Sim');
    ballisticFolder.open();
}