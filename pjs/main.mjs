#! /usr/bin/env zx
import parser from './interpreter.mjs';
import readline from 'node:readline'
const IS_ALL_READ_MODE = Object.keys(argv).some(v => v === 'a');

const DELIMITER = argv.d;
const DEFAULT_DELIMITER = '|>';

const TOPIC_REFERENCE = argv.t;
const DEFAULT_TOPIC_REFERENCE = '@';

const command = argv._[0] ?? (argv.a === true ? undefined : argv.a);

if (command === undefined) {
  const help = [
      'pjs [options] command',
      'options',
      '    -a                  : load all mode',
      `    -d [DELIMITER]      : default "${DEFAULT_DELIMITER}"`,
      `    -t [TOPIC_REFERENCE]: default "${DEFAULT_TOPIC_REFERENCE}"`,
      '',
      'example',
      '    $ ls | pjs "@.length + \':\' + @ |> @.split(\':\')"',
    ]
    .join('\n')
  ;
  console.error(help);
  process.exit(1);
}

const processing = parser(
  command.toString() ?? '',
  DELIMITER ?? DEFAULT_DELIMITER,
  TOPIC_REFERENCE ?? DEFAULT_TOPIC_REFERENCE
);

if (IS_ALL_READ_MODE) {
  let input = '';
  for await (const chunk of process.stdin) input += chunk;
  processing(input);
} else {
  const rl = readline.createInterface({ input: process.stdin })
  for await (const line of rl) await processing(line);
}
