import { CheckCircle, Hourglass, XCircle } from 'phosphor-react';

export const tx__status_items = [
  {
    value: 'pending',
    label: 'Pending',
    icon: Hourglass,
  },
  {
    value: 'success',
    label: 'Success',
    icon: CheckCircle,
  },
  {
    value: 'failed',
    label: 'Failed',
    icon: XCircle,
  },
];

export enum Db {
  users__table = 'users',
  wallets__table = 'wallets',
  transactions__table = 'transactions',
  payment_link__table = 'payment_links',
}

export enum PaymentLinkType {
  basic = 'payment_link',
  one__time = 'one_time_link',
}

export const post__request_header = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
  },
};

export const get__request_header = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
  },
};
