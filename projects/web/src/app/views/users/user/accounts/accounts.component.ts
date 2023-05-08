import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAccount } from 'projects/web/src/app/services/account/account.type';
import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-accounts',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="my-10">
      <h2 class=" text-1xl font-extrabold text-gray-900 md:text-3xl lg:text-4xl ">Accounts</h2>
    </div>
    <div class="overflow-x-auto w-full">
      <table class="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Blockchain</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let account of accounts | slice : pageBegin : pageBegin + pageLength">
            <td>
              <div class="flex items-center space-x-3">
                <div>
                  <div class="font-bold">Example</div>
                  <div class="text-sm opacity-50">Example</div>
                </div>
              </div>
            </td>
            <td>{{ account.data().address }} <br /></td>
            <td>{{ account.data().blockchain }}</td>
            <th>
              <a [routerLink]="[account.data().id]" [state]="{ account: account.data() }" class="btn btn-ghost btn-xs"
                >details</a
              >
            </th>
          </tr>
        </tbody>
      </table>
    </div>
    <div><a [routerLink]="['create']" href="">アカウント作成</a></div>
    <div class="btn-group">
      <button class="btn btn-active" (click)="pager(1)">1</button>
      <button class="btn" (click)="pager(2)">2</button>
      <button class="btn" (click)="pager(3)">3</button>
      <button class="btn" (click)="pager(4)">4</button>
      <button class="btn" (click)="pager(5)">4</button>
      <button class="btn" (click)="pager(6)">4</button>
      <button class="btn" (click)="pager(7)">4</button>
    </div>
  `,
  styles: [],
})
export class ViewAccountsComponent {
  @Input() accounts: QueryDocumentSnapshot<UserAccount>[] | null = null;

  pageBegin = 0;
  pageLength = 5;

  constructor(private router: Router) {}

  pager(page: number) {
    this.pageBegin = this.pageLength * (page - 1);
  }
}
