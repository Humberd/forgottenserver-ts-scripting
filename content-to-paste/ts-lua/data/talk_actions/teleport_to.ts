const talkAction = TalkAction('/teleport', '/tp');

/**
 * Teleport to a position.
 * Usage: /teleport x y z
 * Example: /teleport 100 200 7
 */
talkAction.onSay((player, words, param) => {
  const coordinates = param.split(' ');
  if (coordinates.length !== 3) {
    player.sendTextMessage(
      MessageClasses.MESSAGE_STATUS_WARNING,
      `Invalid coordinates: ${param}. Usage: ${words} x y z`
    );
    return false;
  }

  const x = parseInt(coordinates[0], 10);
  const y = parseInt(coordinates[1], 10);
  const z = parseInt(coordinates[2], 10);
  if (isNaN(x) || isNaN(y) || isNaN(z)) {
    player.sendTextMessage(
      MessageClasses.MESSAGE_STATUS_WARNING,
      `Invalid coordinates: ${param}. Usage: ${words} x y z. Coordinates must be numbers`
    );
    return false;
  }

  const position = Position(x, y, z);
  const success = player.teleportTo(position, true);
  if (!success) {
    player.sendTextMessage(
      MessageClasses.MESSAGE_STATUS_WARNING,
      'Invalid coordinates. You cannot teleport to that position.'
    );
    return false;
  }
  player.sendTextMessage(
    MessageClasses.MESSAGE_STATUS_CONSOLE_BLUE,
    `Teleported to ${x}, ${y}, ${z}`
  );
  position.sendMagicEffect(MagicEffectClasses.CONST_ME_TELEPORT);

  return false;
});

talkAction.access(true);
talkAction.accountType(AccountType.ACCOUNT_TYPE_GOD);
talkAction.separator(' ');
talkAction.register();

export {};
