import { useState, useEffect } from 'react';
import { useApp } from '@inlet/react-pixi/legacy';

const useStageSize = () => {
  const app = useApp();
  const { view } = app.renderer;

  const [stageSize, setStageSize] = useState({
    width: view.width,
    height: view.height,
  });

  useEffect(() => {
    const { view: canvas } = app.renderer;

    const updateSize = () => {
      setStageSize((prev) => {
        const { width, height } = canvas;
        if (prev.width === width && prev.height === height) return prev;

        return {
          width,
          height,
        }
      });
    };

    const obs = new ResizeObserver(updateSize);
    obs.observe(canvas);

    return () => obs.unobserve(canvas);
  }, [setStageSize, app]);

  return stageSize;
};

export default useStageSize;
