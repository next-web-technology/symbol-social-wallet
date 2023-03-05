import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap, Observable, of } from 'rxjs';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../services/user/user.type';
import { ViewUserComponent } from '../../../views/users/user/user.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ViewUserComponent],
  providers: [],
  template: ` <app-view-user [user]="user$ | async"></app-view-user> `,
  styles: [],
})
export class UserComponent {
  user$: Observable<User | null | undefined>;

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.user$ = this.fetchUser$();
  }

  fetchUser$() {
    return this.route.paramMap.pipe(
      map((params) => params.get('userId')),
      mergeMap((id) => {
        if (id === null) {
          return of(null);
        }
        if (!id) {
          return of(undefined);
        }
        return this.userService.fetchUser$(id);
      })
    );
  }
}
