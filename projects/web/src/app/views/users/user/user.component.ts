import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../services/user/user.type';

@Component({
  selector: 'app-view-user',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="user; else noValue">
      <h2>User</h2>
      <p>id: {{ user.id }}</p>
      <p>name: {{ user.name }}</p>
      <p>photoUrl: {{ user.photoUrl }}</p>
      <p>bio: {{ user.bio }}</p>
      <p>provider: {{ user.provider }}</p>
      <p>google: {{ user.google }}</p>
      <p>twitter: {{ user.twitter }}</p>
      <p>github: {{ user.github }}</p>
    </ng-container>
    <ng-template #noValue>
      <ng-container *ngIf="user === undefined; else loading">
        <p>not found</p>
      </ng-container>
      <ng-template #loading>
        <p>loading...</p>
      </ng-template>
    </ng-template>
  `,
  styles: [],
})
export class ViewUserComponent {
  @Input() user: User | null | undefined;
}
