import * as utils from './utils.mjs';
Object.assign(globalThis, utils);

export const exitCode = Symbol('exitCode');
const q = exitCode;

export default (code, {__internal__} = {__internal__: undefined}) => eval(code);
