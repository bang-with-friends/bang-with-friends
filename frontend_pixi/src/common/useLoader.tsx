import { useEffect, useState } from 'react';
// import * as PIXI from 'pixi.js-legacy';
import * as PIXI from 'pixi.js';

interface ILoaderResult {
  loader: PIXI.Loader;
  resources: Partial<Record<string, PIXI.LoaderResource>>;
}

const useLoader = (loader: PIXI.Loader) => {
  const [result, setResult] = useState<ILoaderResult | null>(null);

  useEffect(() => {
    loader.load((ldr, resources) => {
      setResult({ loader: ldr, resources });
    });
  }, [loader]);

  return result;
};

export default useLoader;
