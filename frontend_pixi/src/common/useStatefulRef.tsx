import React from 'react';

const useStatefulRef = <T,>(initialVal: T | null ) => {
  let [cur, setCur] = React.useState<T | null>(initialVal);

  const { current: ref } = React.useRef({
    current: cur,
  });

  Object.defineProperty(ref, 'current', {
    get: () => cur as T,
    set: (value: T) => {
      if (!Object.is(cur, value)) {
        cur = value;
        setCur(value);
      }
    },
  });

  return ref as React.RefObject<T>;
};

export default useStatefulRef;
