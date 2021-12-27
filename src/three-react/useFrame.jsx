import { useLayoutEffect } from 'react';
import { RENDER_RANGE_OFF } from '../constants';

const store = [];
let frameCnt = 0;

export const fireUseFrames = ({ camera }) => {
  frameCnt = ++frameCnt % 60;
  for (const s of store) {
    s({ frameCnt, camera });
  }
};

export const isInsideRenderRange = (camera, position) => {
  const { x, y, z } = camera.position;
  return (
    Math.abs(position.x - x) < RENDER_RANGE_OFF &&
    Math.abs(position.y - y) < RENDER_RANGE_OFF &&
    Math.abs(position.z - z) < RENDER_RANGE_OFF        
  );
};

const useFrame = (cb) => {
  useLayoutEffect(() => {
    store.push(cb);
    return () => {
      const index = store.indexOf(cb);
      if (index !== -1) {
        store.splice(index, 1);
      }
    }
  }, [cb]);
};

export default useFrame;
