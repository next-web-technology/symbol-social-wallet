import { MnemonicPassPhrase } from 'symbol-hd-wallets';
import { NetworkType } from 'symbol-sdk';

export type BaseUserAccount = {
  blockchain: string | null;
  address: string;
  publicKey: string;
  privateKey: string;
  // mnemonic: MnemonicPassPhrase;
  // qr: any;
  networkType: NetworkType;
};

export type NewUserAccount = {
  createdAt: Date;
  updatedAt: Date;
} & BaseUserAccount;

export type UserAccount = {
  id: string;
} & NewUserAccount;
