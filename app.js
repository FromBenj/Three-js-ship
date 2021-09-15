//Variables for setup

let container;
let camera;
let renderer;
let scene;
let ship;
let controls;
let shadowLight;

function init() {
    container = document.getElementById('scene');

    //Create scene
    scene = new THREE.Scene();

    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 500;

    //Camera setup
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0,0,9);

    const ambient = new THREE.AmbientLight(0x404040, 3);
    scene.add(ambient);

    //renderer.shadowMap.enabled = true;
    //renderer.shadowMapSoft = true;
    shadowLight = new THREE.DirectionalLight(0xff8f16, .4);
    shadowLight.position.set(0, 450, 350);
    shadowLight.castShadow = true;
    shadowLight.shadow.camera.left = -650;
    shadowLight.shadow.camera.right = 650;
    shadowLight.shadow.camera.top = 650;
    shadowLight.shadow.camera.bottom = -650;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 1000;
    shadowLight.shadow.mapSize.width = 4096;
    shadowLight.shadow.mapSize.height = 4096;
    scene.add(shadowLight);

    const light = new THREE.DirectionalLight(0xffffff, 4);
    light.position.set(10,10,10);
    scene.add(light);

    //background
    const TextureLoader = new THREE.TextureLoader();
    const backgroundTexture = TextureLoader.load( 'https://i.imgur.com/upWSJlY.jpg' );
    scene.background = backgroundTexture;

    //Renderer
    renderer = new THREE.WebGLRenderer({antialias:true, alpha: true});
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    //Load Model
    let loader = new THREE.GLTFLoader();
    loader.load('./3d/ship/scene.gltf', function(gltf){
        scene.add(gltf.scene);
        ship = gltf.scene.children[0];
        animate();
    })
    controls = new THREE.OrbitControls(camera, renderer.domElement);
}

function animate(){
    requestAnimationFrame(animate);
    ship.rotation.z += 0.005;
    renderer.render(scene, camera);
}

init();

function onWindowResize(){
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight)
}

window.addEventListener("resize", onWindowResize)
