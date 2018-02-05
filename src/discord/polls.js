'use strict';

const converter = require('number-to-words');

const utils = require('./utils');

const reactions = {
  1: '\u0031\u20E3',
  2: '\u0032\u20E3',
  3: '\u0033\u20E3',
  4: '\u0034\u20E3',
  5: '\u0035\u20E3',
  6: '\u0036\u20E3',
  7: '\u0037\u20E3',
  8: '\u0038\u20E3',
  9: '\u0039\u20E3'
};

const handleInput = async (input, message) => {
  let [question, answers] = input.split(/^"([^\"]*?)" (.*)/g).slice(1, -1);
  answers = answers.match(/"[^\"]+"/g);

  const choices = answers
    .map(
      (answer, i) =>
        `:${converter.toWords(i + 1)}: ⤇ **${answer.replace(
          /^"(.*)"$/,
          '$1'
        )}**\n`
    )
    .toString()
    .replace(/,/g, '');

  const poll = await message.channel.send(
    utils.successEmbed({
      title: question,
      description: `\n${choices}\n`,
      color: 4886754,
      footer: {
        text:
          'Vote on the poll by reacting with the cooresponding number below!'
      }
    })
  );
  answers.match(/"[^\"]+"/g).forEach((answer, i) => {
    poll.react(reactions[i + 1]);
  });
};

module.exports.handleInput = handleInput;
