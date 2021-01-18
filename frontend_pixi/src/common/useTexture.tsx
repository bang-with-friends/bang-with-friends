import { useState, useEffect } from 'react';
import { useApp } from '@inlet/react-pixi/legacy';
import * as PIXI from 'pixi.js-legacy';

const useTexture = (generate: (app: PIXI.Renderer) => PIXI.RenderTexture) => {
  const app = useApp();

  const [texture, setTexture] = useState<PIXI.RenderTexture | null>(null);

  useEffect(() => {
    const t = generate(app.renderer);
    setTexture(t);

    return () => t.destroy(true);
  }, [app, setTexture]);

  return texture;
};

export default useTexture;
