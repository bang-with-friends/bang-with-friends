import { useState, useEffect } from 'react';
import { useApp } from '@inlet/react-pixi/legacy';

const useStageSize = () => {
  const app = useApp();
  const { view: canvas } = app.renderer;

  const [stageSize, setStageSize] = useState({
    width: canvas.width,
    height: canvas.height,
  });

  const [observer, setObserver] = useState<ResizeObserver | null>(null);

  useEffect(() => {
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
    setObserver(obs);

    return () => observer?.unobserve(canvas);
  }, [setStageSize]);

  return stageSize;
};

export default useStageSize;
