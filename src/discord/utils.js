'use strict';

const successEmbed = args => ({
  embed: { ...args }
});

const failureEmbed = description => ({
  embed: {
    title: 'ERROR',
    description,
    color: 16716340
  }
});

module.exports = {
  successEmbed: successEmbed,
  failureEmbed: failureEmbed
};
