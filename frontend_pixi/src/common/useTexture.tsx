import { useState, useEffect } from 'react';
// import { useApp } from '@inlet/react-pixi/legacy';
import { useApp } from '@inlet/react-pixi';
// import * as PIXI from 'pixi.js-legacy';
import * as PIXI from 'pixi.js';

const useTexture = (generate: (app: PIXI.Renderer) => PIXI.RenderTexture) => {
  const app = useApp();

  const [texture, setTexture] = useState<PIXI.RenderTexture | null>(null);

  useEffect(() => {
    const t = generate(app.renderer as PIXI.Renderer);
    setTexture(t);

    return () => t.destroy(true);
  }, [app, setTexture, generate]);

  return texture;
};

export default useTexture;
