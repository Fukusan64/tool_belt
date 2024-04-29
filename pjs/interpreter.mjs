import runtime, {exitCode} from './runtime.mjs';
const parser = (input, delimiter, topicReference) => {
  return input
    .split(delimiter)
    .map(v => v.replaceAll(topicReference, '__internal__'))
  ;
};

const runner = (code, data) => {
  try {
    return runtime(code, {__internal__: data});
  } catch (e) {
    throw new Error(`${e}\n\nInvalid command: ${code}\nCurrent data: ${data}`);
  }
};

export default (input, delimiter, topicReference) => {
  return async inputData => {
    const code = parser(input, delimiter, topicReference);
    let data = inputData;

    for (const c of code) {
      data = await runner(c, data);
      if (data === exitCode) return;
    }
    
    console.log(data);
  }
};
