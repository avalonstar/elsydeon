import axios from 'axios'
import Discord from 'discord.js'

const getSaleEmbed = async () => {
  const { data } = await axios.get('https://api.chrono.gg/sale')
  const embed = new Discord.MessageEmbed()
    .setTitle(`Today's Chrono Deal: **${data.name}**`)
    .setColor('#45295c')
    .setFooter(
      'A new deal every morning at 9am Pacific!',
      'https://d1qb2nb5cznatu.cloudfront.net/startups/i/1246731-6ecb39f716a55a69a29124268bef885a-medium_jpg.jpg?buster=1467142424',
    )
    .setImage(data.promo_image)
    .setThumbnail(
      'https://d1qb2nb5cznatu.cloudfront.net/startups/i/1246731-6ecb39f716a55a69a29124268bef885a-medium_jpg.jpg?buster=1467142424',
    )
    .setTimestamp()
    .setURL('https://chrono.gg/avalonstar/')
    .addField('Sale Price', `$${data.sale_price} (${data.discount} off)`, true)
    .addField('Original Price', `$${data.normal_price}`, true)
  return embed
}

export default getSaleEmbed
