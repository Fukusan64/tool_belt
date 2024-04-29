const ttyConsole = new console.Console(fs.createWriteStream('/dev/tty'));

export const p = _ => {console.log(_);return _;};
export const e = _ => {console.error(_);return _;};
export const t = _ => {ttyConsole.log(_);return _};

export const vGlobal = {};
