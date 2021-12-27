import { useEffect, useRef } from "react";
import * as THREE from 'three';
import loadTexture from '../../three-react/loadTexture';
import useFrame, { isInsideRenderRange } from '../../three-react/useFrame';
// import { RENDER_RANGE_OFF, RENDER_RANGE_ON } from '../../constants';

const Planet = ({ data, position, scene }) => {
  const componentStatus = useRef();
  const mesh = useRef(null);
  const cloudMesh = useRef(null);
  const geometry = useRef();
  const geometryCloud = useRef();
  const material = useRef();
  const materialCloud = useRef();
  const mapTexture = useRef();
  const mapTextureDay = useRef();
  const mapTextureNight = useRef();
  const bumpMapTexture = useRef();
  const specularMapTexture = useRef();
  const cloudsTexture = useRef();
  const {
    map,
    clouds,
    mapNight,
    bumpMap,
    bumpScale,
    specularMap,
    specular,
    rotation = 0,
  } = data;

  const calcEarthRotation = () => {
    const TMP_GMT_DIFF = 3;
    const dt = new Date(); // 2021, 11, 29, 12, 0, 0);
    let secs = dt.getSeconds() + (60 * (dt.getMinutes() + (60 * (dt.getHours() + TMP_GMT_DIFF + 8))));
    
    // console.log('--->> secs', secs);

    const angle = Math.PI * 2 * (secs / (24 * 60 * 60));
    let cloudAngle;
    if (clouds) {
      cloudAngle = angle + (dt.getDay() * Math.PI * 2 / 7);
    }

    // console.log('==>> anlge', angle);
    // mesh.current.rotation.y = angle;
    return { angle, cloudAngle };
  };

  const createComponent = async () => {
    mapTexture.current = await loadTexture(map);

    // if (mapNight) {
    //   mapTextureNight.current = await loadTexture(mapNight);
    // }

    // mapTexture.current =  mapTextureDay.current;

    if (bumpMap) {
      bumpMapTexture.current = await loadTexture(bumpMap);
    }
    if (specularMap) {
      specularMapTexture.current = await loadTexture(specularMap);
    }

    geometry.current = new THREE.SphereGeometry(20, 32, 32);

    const materialData = {
      map: mapTexture.current.texture,
    }

    if (bumpMap) {
      materialData.bumpMap = bumpMapTexture.current.texture;
      materialData.bumpScale = bumpScale;
    }

    // if (specularMap) {
    //   materialData.specularMap = specularMapTexture.current.texture;
    //   materialData.specular = specular;
    // }

    material.current = new THREE.MeshPhongMaterial(materialData);

    mesh.current = new THREE.Mesh(geometry.current, material.current);

    mesh.current.position.x = position.x;
    mesh.current.position.y = position.y;
    mesh.current.position.z = position.z;

    const { angle, cloudAngle } = calcEarthRotation();
    mesh.current.rotation.y = angle;
    

    // mesh.current.rotation.x = - Math.PI * 23 / 180; 


    // var radians = 23.4 * Math.PI / 180; // tilt in radians
    // mesh.current.geometry.applyMatrix( new THREE.Matrix4().makeRotationZ( - radians ) );


    // // const quaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3( 0, 1, 0 ), Math.PI * 23 / 180 );
    // // mesh.current.rotation.applyQuaternion( quaternion );
    // const earthAxis = new THREE.Vector3( Math.sin( radians ), Math.cos( radians ), 0 ).normalize();

    // mesh.current.rotateOnAxis( earthAxis, 0.01 ); // axis must be normalized    

    // console.log('--> clouds', clouds);

    if (clouds) {
      cloudsTexture.current = await loadTexture(clouds);
      const materialDataCloud = {
        map: cloudsTexture.current.texture,
      }
      geometryCloud.current   = new THREE.SphereGeometry(20.1, 32, 32)
      materialCloud.current  = new THREE.MeshPhongMaterial(materialDataCloud);

      // materialCloud.current.side = THREE.DoubleSide;
      materialCloud.current.transparent = true;
      // materialCloud.current.opacity = 0.5;
      // materialCloud.current.depthWrite = false;
      // materialCloud.current.transparent = true;
      
      // {
      //   map     : new THREE.Texture(clouds),
      //   side        : THREE.DoubleSide,
      //   opacity     : 0.8,
      //   transparent : true,
      //   depthWrite  : false,
      // })
      // var cloudMesh = new THREE.Mesh(geometryCloud.current, materialCloud.current)

      cloudMesh.current = new THREE.Mesh(geometryCloud.current, materialCloud.current);

      cloudMesh.current.position.x = position.x;
      cloudMesh.current.position.y = position.y;
      cloudMesh.current.position.z = position.z;

      cloudMesh.current.rotation.y = cloudAngle;

      scene.add(cloudMesh.current)
    }
    scene.add(mesh.current);

    componentStatus.current = 'mounted';

  };

  const deleteComponent = () => {
    componentStatus.current = undefined;
    scene.remove(mesh.current);
    geometry.current.dispose();
    material.current.dispose();
    mapTexture.current.texture.dispose();
    if (bumpMapTexture.current) {
      bumpMapTexture.current.texture.dispose();
    }
    if (specularMapTexture.current) {
      specularMapTexture.current.texture.dispose();
    }
    setTimeout(() => {
      componentStatus.current = 'unmounted';
    }, 1000);
  };

  useFrame(({ camera, frameCnt }) => {
    if (!componentStatus.current) {
      return;
    }
   
    if (rotation === 'EARTH') {
      if (frameCnt === 0) {
        const { angle } = calcEarthRotation();
        mesh.current.rotation.y = angle;
      }
    } else {
      mesh.current.rotation.y += rotation;
    }
    if (clouds) {
      cloudMesh.current.rotation.y -= 0.00003; // earthRotation * 10;    
    }

    if (frameCnt === 0) {
      if (isInsideRenderRange(camera, position)) {
        if (componentStatus.current === 'unmounted') {
          createComponent();
        }
      } else {
        if (componentStatus.current === 'mounted') {
          componentStatus.current = undefined;
          deleteComponent();
        }
      }
    }
  });

  useEffect(() => {
    createComponent();
    return () => {
      deleteComponent();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default Planet;
