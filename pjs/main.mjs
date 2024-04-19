#! /usr/bin/env zx
import parser from './interpreter.mjs';
const ALL_READ_MODE = Object.keys(argv).some(v => v === 'a');
const DELIMITER = argv.d;
const command = argv._[0] ?? (argv.a === true ? undefined : argv.a);

if (command === undefined) {
  [
    'pjs [options] command',
    'options',
    '    -a            : load all mode',
    '    -d [DELIMITER]: default "|>"',
    '',
    'example',
    '    $ ls | pjs "(v) => v.length + \': \' + v"',
  ].forEach(v => console.error(v));
  process.exit(1);
}

const processing = parser(command.toString() ?? '', DELIMITER ?? '|>');

if (ALL_READ_MODE) {
  let input = '';
  for await (const chunk of process.stdin) input += chunk;
  processing(input);
} else {
  require('node:readline')
    .createInterface({ input: process.stdin })
    .on('line', (input) => setImmediate(() => processing(input)))
  ;
}
