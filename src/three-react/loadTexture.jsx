import * as THREE from 'three';

const loader = new THREE.TextureLoader();

const loadTexture = (url) => {
  return new Promise((resolve) => {
    loader.load(
      url,
      (texture) => resolve({ texture }),
      null,
      (error) => resolve({ error }),
    );
  });
};

export default loadTexture;