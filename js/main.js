$(function () {

    // Scene is a container that holds all these different objects in it 

    // Create scene, camera and renderer 
    var scene = new THREE.Scene();  
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, .1, 500);
    var renderer = new THREE.WebGLRenderer();

    // Set colour black and window to full size
    renderer.setClearColor(0x000000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;

    // Create visual helper for axis
    var axis = new THREE.AxisHelper(10);
    scene.add(axis);

    // Create visual helper for grid (size, line spacing)
    var grid = new THREE.GridHelper(50, 5);
    var colour = new THREE.Color("rgb(255, 0, 0)");

    // Set the colour of the grid (grid, lines)
    grid.setColors(colour, 0x000000);

    // Add grid to scene
    scene.add(grid);

    // Create a cube geometry, mesh material and then a cube which is a created using them both
    var cubeGeo = new THREE.BoxGeometry(5,5,5);
    var cubeMat = new THREE.MeshLambertMaterial({color: 0xff3300});
    var cube = new THREE.Mesh(cubeGeo, cubeMat);

    // Create ground
    var Ground_geometry = new THREE.BoxGeometry( 20, 0.1, 20 );
    var Ground_material = new THREE.MeshPhongMaterial({
        color: 0xa0adaf,
        shininess: 150,
        specular: 0xffffff,
        shading: THREE.SmoothShading
    });

    var ground = new THREE.Mesh(Ground_geometry, Ground_material);
    ground.scale.multiplyScalar(3);
    ground.castShadow = false;
    ground.receiveShadow = true;
    scene.add(ground);

    // Lights
    var ambient = new THREE.AmbientLight(0x404040);
    scene.add(ambient);


    spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( 10, 10, 15 );
    spotLight.castShadow = true;
    spotLight.shadowCameraNear = 8;
    spotLight.shadowCameraFar = 30;
    spotLight.shadowDarkness = 0.5;
    spotLight.shadowCameraVisible = false;
    spotLight.shadowMapWidth = 1024;
    spotLight.shadowMapHeight = 1024;

    spotLight.name = 'Spot Light';
    scene.add( spotLight );

    // Set the cube positions
    cube.position.x = 2.5;
    cube.position.y = 4;
    cube.position.z = 2.5; 
    cube.castShadow = true;

    // Add the cube to the scene
    scene.add(cube);

    // Set the camera position
    camera.position.x = 40;
    camera.position.y = 40;
    camera.position.z = 40;

    // Make the camera look at the scene
    camera.lookAt(scene.position);

    var guiControls = new function () {
        this.rotationX = 0.01;
        this.rotationY = 0.01;
        this.rotationZ = 0.01;
    }

    var datGUI = new dat.GUI();
    datGUI.add(guiControls, 'rotationX', 0, 1);
    datGUI.add(guiControls, 'rotationY', 0, 1);
    datGUI.add(guiControls, 'rotationZ', 0, 1);
    render();
    function render() {
        cube.rotation.x += guiControls.rotationX;
        cube.rotation.z += guiControls.rotationZ;
        cube.rotation.y += guiControls.rotationY;

        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    // Render the scene in the as a dom element
    $('#webGlContainer').append(renderer.domElement);

    // Rendere the scene with the camera
    renderer.render(scene, camera);

});
