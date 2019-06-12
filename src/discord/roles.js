const notificationRole = '446513618666651658';
const gameRoles = {
  destiny: '486300534681370625',
  ffxiv: '294149303461478401',
}

const subscribeToNotifications = message => {
  if (message.member.roles.has(notificationRole)) {
    message.reply(
      `you've already opted to be notified, silly. Stop confusing me. <:avalonBAN:239949776249028609>`
    );
  } else {
    message.member.addRole(notificationRole).catch(console.error);
    message
      .reply(
        `thank you! You'll be pinged every time there's an important stream-related announcement. <:avalonPINGPOG:503357147783102478>`
      )
      .catch(console.error);
  }
};

const unsubscribeFromNotifications = message => {
  if (message.member.roles.has(notificationRole)) {
    message.member.removeRole(notificationRole).catch(console.error);
    message
      .reply(
        `sorry for bothering you. You will no longer receive role notifications. <:avalonSHY:494351298208989195>`
      )
      .catch(console.error);
  } else {
    message.reply(
      `you didn't even want to be notified in the first place. Why you gotta be like that? <:avalonSHY:494351298208989195>`
    );
  }
};

const assignRole = (args, message) => {
  const role = message.content.substr(message.content.indexOf(" ") + 1);
  if (Object.keys(gameRoles).includes(role)) {
    if (message.member.roles.has(gameRoles[role])) {
      message.reply(
        `you already have the \`${role}\` role, silly. Stop confusing me.`
      )
    } else {
      message.member.addRole(gameRoles[role]).catch(console.error);
      message.reply(
        `you now have the \`${role}\` role and should see all available channels related to it.`
      )
    }
  } else {
    message.reply(
      `the only roles you can assign to yourself are: \`${Object.keys(gameRoles).join(', ')}\``
    )
  }
}

const unassignRole = (args, message) => {
  const role = message.content.substr(message.content.indexOf(" ") + 1);
  if (Object.keys(gameRoles).includes(role)) {
    if (message.member.roles.has(gameRoles[role])) {
      message.member.removeRole(gameRoles[role]).catch(console.error);
      message.reply(`you have removed the \`${role}\` role.`)
    } else {
      message.reply(`you didn't have the \`${role}\` role in the first place, baka.`)
    }
  } else {
    message.reply(
      `you can't remove a role that doesn't exist or wasn't available to be assigned in the first place.`
    )
  }
}

export {
  subscribeToNotifications,
  unsubscribeFromNotifications,
  assignRole,
  unassignRole
}
