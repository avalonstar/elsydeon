import Enmap from 'enmap'
import fs from 'fs'
import TwitchJS from 'twitch-js'

import logger from '../logger'

const initialize = () => {
  const prefix = '!'
  const commands = new Enmap()
  const { chat: client } = new TwitchJS({
    token: process.env.TWITCH_IRC_PASSWORD as string,
    username: process.env.TWITCH_IRC_USERNAME as string,
    log: { level: 'silent' },
  })

  client.connect().then(async () => {
    await client.join('avalonstar')
    logger.info(`Twitch.js is connected.`)

    const commandFiles = fs
      .readdirSync('./src/twitch/commands')
      .filter((file) => file.endsWith('.js'))
    logger.info(`Twitch.js is loading ${commandFiles.length} commands.`)
    commandFiles.forEach((file) => {
      const command = require(`./commands/${file}`).default
      commands.set(command.name, command)
    })
  })

  client.on('PRIVMSG', (payload) => {
    if (!payload.message.startsWith(prefix)) return

    payload.message = payload.message.substring(prefix.length)
    const [name, ...args] = payload.message.split(' ')

    const command =
      commands.get(name) ||
      commands.find((cmd) => cmd.aliases && cmd.aliases.includes(name))
    console.log(command)
    if (!command) return

    try {
      command.execute(client, payload, args)
    } catch (error) {
      logger.error(error)
    }
  })
}

export default async () => {
  await initialize()
}
