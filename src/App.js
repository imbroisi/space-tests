import { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
// import loadTexture from './three-react/loadTexture';
import earthmap from './images/earthmap8k.jpg';
import earthclouds from './images/earth_clouds_2048.png';
// import earthmapnight from './images/earthnightmap.jpg';
import bumpMapImg from './images/earthbump1k.jpg';
import specularMapImg from './images/specular.jpg';

import marsmap from './images/mars.jpeg';
import venusmap from './images/venus.jpeg';
import saturnmap from './images/saturn.jpeg';
import jupitermap from './images/jupiter.jpeg';

import Planet from './bodies/Planet';

import { fireUseFrames } from './three-react/useFrame';

// const loader = new THREE.TextureLoader();
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
const camera = new THREE.PerspectiveCamera(50, 500 / 400, 0.1, 1000);

function App() {
  const [total, setTotal] = useState(1);
  const cameraX = useRef(0);
  const cameraY = useRef(0);
  const cameraZ = useRef(60);


  // var renderer = new THREE.WebGLRenderer();
  // var scene = new THREE.Scene();
  // const camera = new THREE.PerspectiveCamera(50, 500 / 400, 0.1, 1000);

  // camera.position.z = 10;

  // renderer.setSize( window.innerWidth, window.innerHeight );

  // var light = new THREE.DirectionalLight( 0x202020 );
  // light.position.set( 10000, 10000, 10000 ).normalize();
  // scene.add(light);

  // const ambientLight = new THREE.AmbientLight(0xC0C0C0);
  // scene.add(ambientLight);

  // document.body.appendChild(renderer.domElement);

  // console.log('POS 1');
  // // const texture = useLoader(earthmap);

  // useEffect(() => {
  //   (async () => {

  //     const map = await loadTexture(earthmap);
  //     const bumpMap = await loadTexture(bumpMapImg);
  //     const specularMap = await loadTexture(specularMapImg);

  //     if (map.error) {
  //       // TODO: tratar erro de carregamento
  //       return;
  //     }

  //     console.log('bumpMap', bumpMap)
  //     console.log('specularMap', specularMap)

  //     // return;

  //     var cube, material;
  //     var render = function () {
  //       requestAnimationFrame(render);
    
  //       cube.rotation.y += 0.01;
    
  //       renderer.render(scene, camera);
  //     };
    
  //     var scene = new THREE.Scene();
  //     var camera = new THREE.PerspectiveCamera(50, 500 / 400, 0.1, 1000);
      
  //     var renderer = new THREE.WebGLRenderer();
  //     // renderer.setSize(500, 400);
  //     renderer.setSize( window.innerWidth, window.innerHeight );

  //     document.body.appendChild(renderer.domElement);
      
  //     // var geometry = new THREE.SphereGeometry(3, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
  //     var geometry   = new THREE.SphereGeometry(2, 32, 32)

  //     // loader.load(earthmap, (texture) => {
  //     material = new THREE.MeshPhongMaterial( {
  //       map: map.texture,
  //       bumpMap: bumpMap.texture,
  //       bumpScale:   0.005,
  //       specularMap: specularMap.texture,
  //       specular: new THREE.Color('gray'),
  //     });

  //     camera.position.z = 10;

  //     cube = new THREE.Mesh(geometry, material);
  //     cube.position.x = 10;
  //     cube.position.z = -20;
  //     scene.add(cube);

  //     var light = new THREE.DirectionalLight( 0x202020 );
  //     light.position.set( 10000, 10000, 10000 ).normalize();
  //     scene.add(light);

  //     const ambientLight = new THREE.AmbientLight(0x808080);
  //     scene.add(ambientLight);

  //     render();
      // });
      
      // var material = new THREE.MeshNormalMaterial({
      //   map: new THREE.TextureLoader().load('./images/earthmap1k.jpg', (texture) => {
      //     console.log('LOADED!')
      //     console.log('==>> texture', texture);
      //     cube = new THREE.Mesh(geometry, material);
      //     scene.add(cube);
          
          
      //     camera.position.z = 10;
      
          
      //     render();
      //   }),
      // });

      // console.log('==>> material.map', material.map);

        // var material  = new THREE.MeshPhongMaterial(
        //   {
        //   map: THREE.TextureLoader().load('images/earthmap1k.jpg'),
        //   bumpMap: THREE.TextureLoader().load('images/earthbump1k.jpg'),
        //   bumpScale:   0.005,
        //   specularMap: THREE.TextureLoader().load('images/specular.png'),
        //   specular: new THREE.Color('grey'),
        //   }
        // )
      // var cube = new THREE.Mesh(geometry, material);
      // scene.add(cube);
      
      
      // camera.position.z = 10;

      
      // render();

    //   const scene = new THREE.Scene();
    //   const camera = new THREE.PerspectiveCamera(50, 500 / 400, 0.1, 1000);
    //   const renderer = new THREE.WebGLRenderer();
      
    //   renderer.setSize( window.innerWidth, window.innerHeight );
    //   document.body.appendChild( renderer.domElement );

    //   var light = new THREE.AmbientLight(0xffffff, 1);
    //   light.position.set(5,3,5);
    //   scene.add(light);
    //   scene.add(camera);

    //   var geometry   = new THREE.SphereGeometry(0.5, 32, 32)
    //   var material  = new THREE.MeshPhongMaterial(
    //     {
    //     map: THREE.TextureLoader().load('images/earthmap1k.jpg'),
    //     bumpMap: THREE.TextureLoader().load('images/earthbump1k.jpg'),
    //     bumpScale:   0.005,
    //     specularMap: THREE.TextureLoader().load('images/specular.png'),
    //     specular: new THREE.Color('grey'),
    //     }
    //   )
      
    //   // material.map = THREE.TextureLoader().load('images/earthmap1k.jpg');
      
    //   // material.bumpMap   = THREE.TextureLoader().load('images/earthbump1k.jpg');     
    //   // material.bumpScale = 0.05;

    //   var earthMesh = new THREE.Mesh(geometry, material)

    //   scene.add(earthMesh)

    //   var render = function () {
    //     requestAnimationFrame(render);
    
    //     earthMesh.rotation.y += 0.01;
    
    //     renderer.render(scene, camera);
    // };
    
    //   render();
    
  //   })();

  const render = () => {
    requestAnimationFrame(render);

  // cube.rotation.y += 0.01;
    camera.position.x = cameraX.current;
    camera.position.y = cameraY.current;
    camera.position.z = cameraZ.current;

    // console.log('==>> camera.position.x', camera.position.x, cameraX.current);

    fireUseFrames({ camera });

    renderer?.render(scene, camera);
  };

  useEffect(() => {

    // renderer = new THREE.WebGLRenderer();
    // camera = new THREE.PerspectiveCamera(50, 500 / 400, 0.1, 1000);
  
    camera.position.x = cameraX.current;
    camera.position.y = cameraY.current;
    camera.position.z = cameraZ.current;
  
    renderer.setSize( window.innerWidth, window.innerHeight );

    const angle = 0;

    const a = 100000000;
    const b = a * Math.sin(Math.PI * angle / 180);
  
    var light = new THREE.DirectionalLight( 0xa0a0a0, 0.8 );
    light.position.set( a, b, a);
    
    // const light = new THREE.SpotLight( 0xffffff );
    // light.position.set( 10, -5, 10 );
    // light.castShadow = true;
    // light.shadow.mapSize.width = 1024;
    // light.shadow.mapSize.height = 1024;
    // light.shadow.camera.near = 500;
    // light.shadow.camera.far = 4000;
    // light.shadow.camera.fov = 30;
    // light.algle = 1;
    // light.penumbra = 1;
    
    scene.add(light);
  
    const ambientLight = new THREE.AmbientLight(0x606060);
    scene.add(ambientLight);
  
    document.body.appendChild(renderer.domElement);
  
    render();

    setInterval(() => 
    {
      console.log('--->>> renderer.info.memory', renderer.info.memory);
    }, 2000);
  }, []);

  // }, []);
  const planets = [
    {
      data: {
        id: 1,
        map: earthmap,
        clouds: earthclouds,
        // mapnight: earthmapnight,
        bumpMap: bumpMapImg,
        bumpScale: 0.005,
        specularMap: specularMapImg,
        specular: new THREE.Color('gray'),
        rotation: 'EARTH',
      },
      position: {
        x: 0,
        y: 0,
        z: -10,
      },
    },
    {
      data: {
        id: 2,
        map: earthmap,
        bumpMap: bumpMapImg,
        bumpScale: 0.005,
        specularMap: specularMapImg,
        specular: new THREE.Color('blue'),
        rotation: 0.003,
      },
      position: {
        x: 5,
        y: 0,
        z: -10,
      },
    },
    {
      data: {
        id: 3,
        map: marsmap,
        bumpMap: null,
        bumpScale: 0.005,
        specularMap: null,
        specular: null,
        rotation: 0.012,
      },
      position: {
        x: -5,
        y: 0,
        z: -4,
      },
    },
    {
      data: {
        id: 4,
        map: venusmap,
        bumpMap: null,
        bumpScale: 0.005,
        specularMap: null,
        specular: null,
        rotation: -0.01,
      },
      position: {
        x: 0,
        y: -3,
        z: -2,
      },
    },
    {
      data: {
        id: 5,
        map: saturnmap,
        bumpMap: null,
        bumpScale: 0.005,
        specularMap: null,
        specular: null,
        rotation: 0.002,
      },
      position: {
        x: 4,
        y: 2,
        z: -2,
      },
    },
    {
      data: {
        id: 6,
        map: jupitermap,
        bumpMap: null,
        bumpScale: 0.005,
        specularMap: null,
        specular: null,
        rotation: 0.02,
      },
      position: {
        x: -3,
        y: 4,
        z: -6,
      },
    },  
  ];

  const showPlanets = [...planets];
  if (total < planets.length) {
    showPlanets.length = total; 
  }

  return (
    <>
      {showPlanets.map(({ data, position }, index) => {
        return (
          <Planet
            key={data.id}
            data={data}
            position={position}
            scene={scene}
          />
        )
      }
      )}
      <div style={{ position: 'absolute', color: 'black', backgroundColor: '#c0c0c0'}}>
        <div>
          PLANETS: <button onClick={() => setTotal(total + 1)}>+</button>
          <button onClick={() => setTotal(total - 1)}>-</button>
          {total}
        </div>
        <div>
          CAMERA: x <input style={{ width: '20px' }} defaultValue={cameraX.current} onChange={(e) => cameraX.current = parseInt(e.target.value)} />
          y <input style={{ width: '20px' }} defaultValue={cameraY.current} onChange={(e) => cameraY.current = parseInt(e.target.value)} />
          z <input style={{ width: '20px' }} defaultValue={cameraZ.current} onChange={(e) => cameraZ.current = parseInt(e.target.value)} />
        </div>
      </div>
    </>
  );
}

export default App;
