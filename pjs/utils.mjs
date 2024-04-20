export const p = _ => {console.log(_);return _;};
export const t = (() => {
    const c = new console.Console(fs.createWriteStream('/dev/tty'));
    return _ => {c.log(_);return _};
})();
export const e = _ => {console.error(_);return _;};

export const vGlobal = (() => {
    return {};
})();