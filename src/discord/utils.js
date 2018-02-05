'use strict';

const successEmbed = (contentArgs, footerArgs) => ({
  embed: {
    color: 4886754,
    footer: { ...footerArgs },
    ...contentArgs
  }
});

const failureEmbed = description => ({
  embed: {
    title: 'ERROR',
    description,
    color: 16716340,
    thumbnail: {
      url: 'https://static-cdn.jtvnw.net/emoticons/v1/296250/2.0'
    }
  }
});

module.exports = {
  successEmbed,
  failureEmbed
};
