import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
      const textureLoader = new THREE.TextureLoader();
			const renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

      // orbit controls
      const controls = new OrbitControls(camera, renderer.domElement);

       // ambient light
       const ambientLight = new THREE.AmbientLight( 0xffffff, 0.5 );
       scene.add( ambientLight );

      // directional light
      const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
      directionalLight.position.set( 30, 20, 10);
      scene.add( directionalLight );

      // directional light helper
      const directionalLightHelper = new THREE.DirectionalLightHelper( directionalLight, 2, );
      scene.add( directionalLightHelper );

      // house (cube)
			const geometry = new THREE.BoxGeometry( 10, 10, 10 );
			const cubeMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );
			const cube = new THREE.Mesh( geometry, cubeMaterial );
      cube.position.set(0, 0, 0);
			scene.add( cube );

      // wall texture
      const wallTexture = textureLoader.load('/assets/textures/wall.png');
      cubeMaterial.map = wallTexture;
      cubeMaterial.side = THREE.BackSide;
      cube.position.set( 0, 0, 0 );
      scene.add( cube );

      // roof (cone)
      const pyramidGeometry = new THREE.ConeGeometry( 9, 5, 4 );
      pyramidGeometry.rotateY(Math.PI / 4);
      const pyramidMaterial = new THREE.MeshBasicMaterial( { color: 0x1C1D1E } );
      const pyramid = new THREE.Mesh( pyramidGeometry, pyramidMaterial );
      pyramid.position.set(0, 7, 0);
      scene.add(pyramid);

      // sphere (sky)
      const sphereGeometry = new THREE.SphereGeometry( 100, 32, 32 );
      const sphereMaterial = new THREE.MeshBasicMaterial( {color: 0xffffff} );
      const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
      sphere.position.set(0, 0, 0);
      scene.add(sphere);

      // sky texture
      const skyTexture = textureLoader.load('/assets/textures/sky_noclouds.jpg');
      sphereMaterial.map = skyTexture;
      sphereMaterial.side = THREE.BackSide;
      sphere.position.set( 0, 0, 0 );
      scene.add( sphere );

      // floor (plane)
      const planeGeometry = new THREE.PlaneGeometry( 200, 200, 32, 32 );
      const planeMaterial = new THREE.MeshBasicMaterial( {color: 0x5FC663, side: THREE.DoubleSide} );
      const plane = new THREE.Mesh( planeGeometry, planeMaterial );
      plane.position.set(0, -5, 0);
      plane.rotation.x = Math.PI / 2;
      scene.add( plane );

      // add plane
      const pictureGeometry = new THREE.PlaneGeometry( 5, 5, 32, 32 );
      const pictureMaterial = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
      const picture = new THREE.Mesh( pictureGeometry, pictureMaterial );
      picture.position.set(5, 5, 0);
      scene.add( picture );

      // picuture texture
      const pictureTexture = textureLoader.load('/assets/textures/picture.jpeg');
      pictureMaterial.map = pictureTexture;
      picture.position.set( 0, 0, -4.9 );
      picture.rotation.x = Math.PI / 200;
      picture.rotation.y = Math.PI / 1;
      scene.add( picture );

      // import chicken gltf
      const gltfLoader = new GLTFLoader();
      gltfLoader.load('/assets/models/chicken/scene.gltf', (gltf) => {
        gltf.scene.scale.set( 5, 5, 5);
        gltf.scene.position.set(0, -5, 0);
        scene.add(gltf.scene);
      });


			camera.position.z = 35;

      // animate function
			function animate() {
				requestAnimationFrame( animate );

				
				renderer.render( scene, camera );
			};

			animate();