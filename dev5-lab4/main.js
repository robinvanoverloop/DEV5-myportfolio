import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

			const renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

      // add orbit controls
      const controls = new OrbitControls(camera, renderer.domElement);

       // add ambient light
       const ambientLight = new THREE.AmbientLight( 0xffffff, 0.5 );
       scene.add( ambientLight );

      // directional light
      const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
      directionalLight.position.set( 30, 20, 10);
      scene.add( directionalLight );

      // add light in house 
      const light2 = new THREE.PointLight(0xff0000, 1, 100);
      light2.position.set(0, 0, 0);
      scene.add(light2);

      // directional light helper
      const directionalLightHelper = new THREE.DirectionalLightHelper( directionalLight, 2, );
      scene.add( directionalLightHelper );

      // house (cube)
			const geometry = new THREE.BoxGeometry( 10, 10, 10 );
			const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
			const cube = new THREE.Mesh( geometry, material );
      cube.position.set(0, 0, 0);
			scene.add( cube );

      // load wall texture on cube
      const loader = new THREE.TextureLoader();
      loader.load('/assets/textures/wall.png', (texture) => {
        const material = new THREE.MeshBasicMaterial({ map: texture });
        cube.material = material;
      });

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
      const textureLoader = new THREE.TextureLoader(); 
      const galaxyTexture = textureLoader.load('/assets/textures/sky_noclouds.jpg');
      sphereMaterial.map = galaxyTexture;
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

			camera.position.z = 35;

      // animate function
			function animate() {
				requestAnimationFrame( animate );

				
				renderer.render( scene, camera );
			};

			animate();