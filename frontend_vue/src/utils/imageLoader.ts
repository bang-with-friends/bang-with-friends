// Mock out require.context for test, because require.context is a webpack thing.
const context = require.context || (() => (s: string) => s);

export const cardLoader = context('@/assets/card/cards', false, /\.png$/);
export const suitLoader = context('@/assets/card/suits', false, /\.png$/);
