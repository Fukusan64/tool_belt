import * as utils from './utils.mjs';
Object.assign(globalThis, utils);

const q = () => exitCode;
export const exitCode = Symbol('exitCode');

export default (code, {ctx} = {ctx: undefined}) => eval(code);
