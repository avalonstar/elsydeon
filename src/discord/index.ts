import { CronJob } from 'cron'
import Discord, { TextChannel } from 'discord.js'
import Enmap from 'enmap'
import fs from 'fs'

import getSaleEmbed from './chrono'
import logger from '../logger'

const prefix = '!'
const client = new Discord.Client()
const commands = new Enmap()

const initialize = async () => {
  client.once('ready', () => {
    client.user?.setPresence({
      activity: { name: 'avalonstar.tv', type: 3 },
    })
    logger.info(
      `Discord.js connected as ${client.user?.tag}. Ready to serve ${client.users.cache.size} users.`,
    )

    const commandList = fs
      .readdirSync('./src/discord/commands')
      .filter((file) => file.endsWith('.js'))
    logger.info(`Discord.js is loading ${commandList.length} commands.`)
    commandList.forEach((file) => {
      const command = require(`./commands/${file}`).default // eslint-disable-line
      commands.set(command.name, command)
    })
  })

  client.on('message', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return

    message.content = message.content.substring(prefix.length)
    const [name, ...args] = message.content.split(' ')

    const command =
      commands.get(name) ||
      commands.find((cmd) => cmd.aliases && cmd.aliases.includes(name))
    if (!command) return

    try {
      command.execute(client, message, args)
    } catch (error) {
      logger.error(error)
      message.reply(
        'there was an error while trying to execute that command. Bryan fucked up.',
      )
    }
  })

  client.login(process.env.DISCORD_TOKEN as string)
  return client
}

const initializeCron = async () => {
  const channelID = '83812209540468736'
  const job = new CronJob(
    '0 10 9 * * *',
    async () => {
      const embed = await getSaleEmbed()
      const channel = client.channels.cache.get(channelID)
      ;(channel as TextChannel).send(embed)
    },
    null,
    true,
    'America/Los_Angeles',
  )
  job.start()
}

export default async () => {
  await initialize()
  await initializeCron()
}
