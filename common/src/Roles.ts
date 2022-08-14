export enum Role {
  SHERIFF = 'SHERIFF',
  VICE = 'VICE',
  RENEGADE = 'RENEGADE',
  OUTLAW = 'OUTLAW',
}

export const getRolesListForPlayers = (playerCt: number) => {
  switch (playerCt) {
    case 4:
      return [Role.SHERIFF, Role.RENEGADE, Role.OUTLAW, Role.OUTLAW];
    case 5:
      return [Role.SHERIFF, Role.VICE, Role.RENEGADE, Role.OUTLAW, Role.OUTLAW];
    case 6:
      return [Role.SHERIFF, Role.VICE, Role.RENEGADE, Role.OUTLAW, Role.OUTLAW, Role.OUTLAW];
    case 7:
      return [Role.SHERIFF, Role.VICE, Role.VICE, Role.RENEGADE, Role.OUTLAW,
        Role.OUTLAW, Role.OUTLAW];
    case 8:
      return [Role.SHERIFF, Role.VICE, Role.VICE, Role.RENEGADE, Role.RENEGADE, Role.OUTLAW,
        Role.OUTLAW, Role.OUTLAW];
    default:
      throw new Error('Invalid Number of Players');
  }
};