import { CheckCircle, Hourglass, XCircle } from "phosphor-react";

export const statuses = [
  {
    value: "pending",
    label: "Pending",
    icon: Hourglass,
  },
  {
    value: "success",
    label: "Success",
    icon: CheckCircle,
  },
  {
    value: "failed",
    label: "Failed",
    icon: XCircle,
  },
];

export const token__key = "token";
export const onboarding__key = "onboarding";
export const address__key = "address";
export const chainId__key = "chain_id";

export enum Db {
  users__table = "users",
  wallets__table = "wallets",
  transactions__table = "transactions",
  payment_link__table = "payment_links",
}

export enum PaymentLinkType {
  link = "payment_link",
  one__time = "one_time_link",
}

export const post__request = {
  method: "POST",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
  },
};
