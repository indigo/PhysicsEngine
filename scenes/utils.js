
// Function to create a custom arrow (cylinder + cone)
function createCustomArrow(direction, origin, length, color) {
    const cylinderLength = length * 0.8; // 80% of total length for cylinder
    const coneLength = length * 0.1;     // 20% for cone
    const cylinderRadius = 0.03;
    const coneRadius = 0.15;

    // Cylinder
    const cylinderGeometry = new THREE.CylinderGeometry(cylinderRadius, cylinderRadius, cylinderLength, 6);
    const cylinderMaterial = new THREE.MeshBasicMaterial({ color: color });
    const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

    // Cone (arrowhead)
    const coneGeometry = new THREE.ConeGeometry(coneRadius, coneLength, 18);
    const coneMaterial = new THREE.MeshBasicMaterial({ color: color });
    const cone = new THREE.Mesh(coneGeometry, coneMaterial);

    // Position and orient the cylinder and cone
    cylinder.position.y = cylinderLength / 2;
    cone.position.y = cylinderLength + coneLength / 2;

    // Create a group to hold the cylinder and cone
    const arrow = new THREE.Group();
    arrow.add(cylinder);
    arrow.add(cone);

    // Orient the arrow group to the desired direction
    // Default cylinder/cone is along Y-axis, so we need to rotate
    const up = new THREE.Vector3(0, 1, 0);
    arrow.quaternion.setFromUnitVectors(up, direction.clone().normalize());

    // Position the arrow at the origin
    arrow.position.copy(origin);

    return arrow;
}


// Function to create a text label
function createTextLabel(text, color, position) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = 'Bold 40px Arial';
    context.fillStyle = '#' + new THREE.Color(color).getHexString();
    context.fillText(text, 0, 40);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide
    });
    const geometry = new THREE.PlaneGeometry(canvas.width / 100, canvas.height / 100); // Adjust size as needed
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.copy(position);
    return mesh;
}



// Function to create a mesh label
function meshLabel(text, color, position){
    const loader = new FontLoader();
    loader.load( 'fonts/gentilis_regular.typeface.json', function ( font ) {

        init( font );

    } );
    function addLabel( name, location ) {

        const textGeo = new TextGeometry( name, {

            font: font,

            size: 20,
            depth: 1,
            curveSegments: 1

        } );

        const textMaterial = new THREE.MeshBasicMaterial();
        const textMesh = new THREE.Mesh( textGeo, textMaterial );
        textMesh.position.copy( location );
        return textMesh;
    }
}

