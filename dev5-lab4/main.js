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

      // add grid helper
      const gridHelper = new THREE.GridHelper(200, 50);
      scene.add(gridHelper);

       // add ambient light
       const ambientLight = new THREE.AmbientLight( 0xffffff, 0.5 );
       scene.add( ambientLight );

      // add directional light
      const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
      directionalLight.position.set( 12, 12, 4);
      scene.add( directionalLight );

      // add directional light helper
      const directionalLightHelper = new THREE.DirectionalLightHelper( directionalLight, 2 );
      scene.add( directionalLightHelper );

      // house
			const geometry = new THREE.BoxGeometry( 3, 3, 3 );
			const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
			const cube = new THREE.Mesh( geometry, material );
			scene.add( cube );

			camera.position.z = 5;

      // animate function
			function animate() {
				requestAnimationFrame( animate );

				
				renderer.render( scene, camera );
			};

			animate();