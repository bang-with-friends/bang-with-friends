import { useState, useEffect } from 'react';
import { useApp } from '@inlet/react-pixi/legacy';

const useStageSize = () => {
  const app = useApp();
  const { view } = app.renderer;

  const scale = window.devicePixelRatio;

  const [stageSize, setStageSize] = useState({
    width: view.width / scale,
    height: view.height / scale,
  });

  useEffect(() => {
    const { view: canvas } = app.renderer;

    const updateSize = () => {
      setStageSize((prev) => {
        const width = canvas.width / scale;
        const height = canvas.height / scale;
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
  }, [setStageSize, app, scale]);

  return stageSize;
};

export default useStageSize;
