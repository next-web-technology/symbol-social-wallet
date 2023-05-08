import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewBlockchainComponent } from '../../../../../views/users/user/blockchains/blockchain/blockchain.component';

@Component({
  selector: 'app-page-blockchain',
  standalone: true,
  imports: [CommonModule, ViewBlockchainComponent],
  providers: [],
  template: ` <app-view-blockchain></app-view-blockchain> `,
  styles: [],
})
export class BlockchainComponent {}
