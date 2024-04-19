import runtime, {exitCode} from './runtime.mjs';
const parser = (data, delimiter) => {
  return data
    .split(delimiter)
    .map(v => {
        const [key, ...args] = v
          .trim()
          .replace(/^([^,\(\)]+)=>/, '($1) => ')
          .split('(')
        ;
        return [
          key,
          args.length !== 0 ? '(' + args.join('(') : undefined
        ].filter(v => v);
      }
    )
  ;
};

const hasKey = (key, data) => {
  try {
    if (Object.keys(data).includes(key)) return true;
    if (data === Object(data)) return key in data;
    return key in new data.constructor();
  } catch {
    return false;
  }
};

const runner = ([key, args], data) => {
  if (hasKey(key, data)) {
    if (typeof data[key] === 'function') {
      return runtime(`ctx.${key}${args ?? '()'}`, {ctx: data});
    }
    return data[key];
  }

  const value = runtime(key);
  if (typeof value === 'function') {
    return value(data);
  }

  throw new Error(`Invalid command: {key: ${key}, args: ${args}}\n Current data: ${data}`);
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
