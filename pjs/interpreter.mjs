import runtime, {exitCode} from './runtime.mjs';
const parser = (data, delimiter) => {
  return data
    .split(delimiter)
    .map(v => {
        const [name, ...args] = v
          .trim()
          .replace(/^([^,\(\)]+)=>/, '($1) => ')
          .split('(')
        ;
        return [
          name,
          args.length !== 0 ? '(' + args.join('(') : undefined
        ].filter(v => v);
      }
    )
  ;
};

const runner = ([key, args], data) => {
  const value = runtime(key);
  if (typeof value !== 'function') throw new Error(`Invalid command: ${key ?? ''}${args ?? ''}\n Current data: ${data}`);
  try {
    if (args === undefined) {
      return value(data);
    }
    return runtime(`ctx${args}`, {ctx: value});
  } catch (e) {
    throw new Error(`${e}\n\nInvalid command: ${key ?? ''}${args ?? ''}\nCurrent data: ${data}`);
  }
};


export default (input, delimiter) => {
  return async inputData => {
    const code = parser(input, delimiter);
    let data = inputData;

    for (const c of code) {
      data = await runner(c, data);
      if (data === exitCode) return;
    }
    
    console.log(data);
  }
};
