export * from './bank.statics';
export * from './message';

export const StatusPaymentTranSaction = {
  processing: 0,
  success: 1,
  cancel: 2,
};

export const TypePaymentTranSaction = {
  deposit: 0,
  withdrawMoney: 1,
};

export const TypeGamePoint = {
  main: 0,
  sub: 1,
};

export const typeNotification = {
  System: 'system',
  User: 'individual',
};

export const TypeSort = {
  DESC: 'DESC',
  ASC: 'ASC',
};

export const TypeGameDice = {
  XocDia: '0',
  ChanLe: '1',
  Blockchain: '2',
};

export const TypeGameBaccarat = {
  normal: '0',
  flash: '1',
  mi: '2',
};

export const StatusDiceDetail = {
  prepare: 0,
  shake: 1,
  bet: 2,
  waitOpen: 3,
  check: 4,
  end: 5,
};

export const StatusBaccarat = {
  prepare: 0,
  bet: 1,
  waitOpen: 2,
  showPoker: 3,
  check: 4,
  end: 5,
};

export const TypeAnswerDice = {
  p1: 1,
  p2: 2,
  p3: 3,
  p4: 4,
  p5: 5,
  p6: 6,
  p7: 7,
  p8: 8,
  p9: 9,
  p10: 10,
};

export const StatusHistoryPlayDice = {
  wait: 0,
  success: 1,
};

export const TypeUpdatePointUser = {
  up: 0,
  down: 1,
};

export const TypeUser = {
  Normal: 'Normal',
  Admin: 'Admin-CMS',
};

export const Status = {
  Active: 'ACTIVE',
  Inactive: 'INACTIVE',
};

export const StatusGiftCode = {
  Created: 0,
  Used: 1,
  Disable: 2,
};
