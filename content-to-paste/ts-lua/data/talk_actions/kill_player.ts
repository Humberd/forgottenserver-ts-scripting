const talkAction = TalkAction('/kill_player', '/kp');

/**
 * Kills a players by name.
 * Usage: /kill_player <player name>
 * Example: /kill_player Player1
 */
talkAction.onSay((player, words, param) => {
  const potentialPlayer = Player(param.trim());
  if (!potentialPlayer) {
    player.sendTextMessage(MessageClasses.MESSAGE_STATUS_WARNING, `Player ${param} not found.`);
    return false;
  }
  potentialPlayer.addHealth(-potentialPlayer.getHealth());
  potentialPlayer.getPosition().sendMagicEffect(MagicEffectClasses.CONST_ME_MORTAREA);
  potentialPlayer.sendTextMessage(
    MessageClasses.MESSAGE_STATUS_CONSOLE_BLUE,
    `You were instantly killed by god`
  );

  player.sendTextMessage(
    MessageClasses.MESSAGE_STATUS_CONSOLE_BLUE,
    `Killed ${potentialPlayer.getName()}`
  );

  return false;
});

talkAction.separator(' ');
talkAction.access(true);
talkAction.accountType(AccountType.ACCOUNT_TYPE_GOD);
talkAction.register();

export {};
