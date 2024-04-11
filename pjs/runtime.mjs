import * as utils from './utils.mjs';

const p = _ => {console.log(_);return _;};
const t = (() => {
    const c = new console.Console(fs.createWriteStream('/dev/tty'));
    return _ => {c.log(_);return _};
})();
const e = _ => {console.error(_);return _;};
const q = () => exitCode;
export const exitCode = Symbol('exitCode');

export default (code, {ctx} = {ctx: undefined}) => eval(code);
