import { Injectable } from '@angular/core';
import { Account, NetworkType, RepositoryFactoryHttp } from 'symbol-sdk';
import { environment } from '../../../environments/environment';
import { ExtendedKey, MnemonicPassPhrase, Network, Wallet } from 'symbol-hd-wallets';
import { MnemonicQR } from 'symbol-qr-library';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SymbolService {
  private node: string;
  private networkType!: NetworkType;
  private repositoryFactoryHttp: RepositoryFactoryHttp;
  private generationHash!: string;
  private epochAdjustment!: number;

  constructor() {
    this.node = environment.nodeUrl;
    this.repositoryFactoryHttp = new RepositoryFactoryHttp(this.node);
    this.initSetting();
  }

  initSetting = async () => {
    this.networkType = await firstValueFrom(this.repositoryFactoryHttp.getNetworkType());
    this.generationHash = await firstValueFrom(this.repositoryFactoryHttp.getGenerationHash());
    this.epochAdjustment = await firstValueFrom(this.repositoryFactoryHttp.getEpochAdjustment());
  };

  async createNewAccount() {
    const mnemonic = this.createMnemonic();
    const qr = await this.createMnemonicQr(mnemonic);
    const seedHex = mnemonic.toSeed();

    const key = ExtendedKey.createFromSeed(seedHex.toString('hex'), Network.SYMBOL);
    const wallet = new Wallet(key.derivePath("m/44'/4343'/0'/0'/0'"));

    const account = Account.createFromPrivateKey(wallet.getAccountPrivateKey(), this.networkType);
    return { account, mnemonic, qr };
  }

  async createAccountFromPrivateKey(privateKey: string) {
    const account = Account.createFromPrivateKey(privateKey, this.networkType);
    return account;
  }

  async createAccountFromQr(privateKey: string) {
    const account = Account.createFromPrivateKey(privateKey, this.networkType);
    console.log(account);
    return account;
  }

  createMnemonic() {
    const mnemonic = MnemonicPassPhrase.createRandom('english');
    return mnemonic;
  }

  async createMnemonicQr(mnemonic: MnemonicPassPhrase) {
    const mnemonicQR = new MnemonicQR(mnemonic.toString(), this.networkType, this.generationHash);
    const qr = await firstValueFrom(mnemonicQR.toBase64());
    return qr;
  }

  recoverMnemonicFromQr(mnemonicQR: MnemonicQR) {
    const jsonQR = mnemonicQR.toJSON();
    console.log(jsonQR);

    console.log(MnemonicQR.fromJSON(jsonQR).mnemonicPlainText);
  }
}
