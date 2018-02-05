'use strict';

const successEmbed = (contentArgs, footerArgs) => ({
  embed: {
    color: 4886754,
    footer: { ...footerArgs },
    ...args
  }
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
