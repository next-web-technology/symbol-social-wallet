import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { render } from '@testing-library/angular';
import { of } from 'rxjs';
import { createRandomUser } from '../../../services/user/user.mock';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../services/user/user.type';
import { UserComponent } from './user.component';

const GOOGLE_USER_NORMAL = createRandomUser('google');
const TWITTER_USER_NORMAL = createRandomUser('twitter');
const GITHUB_USER_NORMAL = createRandomUser('github');
const renderPatterns = [
  { case: 'userId = null', id: null, user: null },
  { case: 'userId = undefined', id: undefined, user: undefined },
  { case: 'userId = ""', id: '', user: undefined },
  { case: 'google user', id: GOOGLE_USER_NORMAL.id, user: GOOGLE_USER_NORMAL },
  { case: 'twitter user', id: TWITTER_USER_NORMAL.id, user: TWITTER_USER_NORMAL },
  { case: 'github user', id: GITHUB_USER_NORMAL.id, user: GITHUB_USER_NORMAL },
];

const userComponentRenderHelper = async (renderPattern: {
  case: string;
  id: string | null | undefined;
  user: User | null | undefined;
}) => {
  return await render(UserComponent, {
    componentProviders: [
      {
        provide: ActivatedRoute,
        useValue: {
          paramMap: of(convertToParamMap({ userId: renderPattern.id })),
        },
      },
      {
        provide: UserService,
        useValue: {
          fetchUser$: (id: string | null | undefined) => {
            if (id === renderPattern.id) {
              return of(renderPattern.user);
            }
            if (id === null) {
              return of(null);
            }
            if (!id) {
              return of(undefined);
            }
            throw Error(`Unexpected id: ${id}`);
          },
        },
      },
    ],
  });
};

describe('PageUserComponent', () => {
  let component: UserComponent;

  for (const renderPattern of renderPatterns) {
    it(`should create with case ${renderPattern.case}`, async () => {
      // Arrange
      const { fixture } = await userComponentRenderHelper(renderPattern);

      // Act
      component = fixture.componentInstance;

      // Assert
      expect(component).toBeTruthy();
    });
  }

  describe('user$', () => {
    it('should be Observable null with null userId', async () => {
      // Arrange
      const { fixture } = await userComponentRenderHelper(renderPatterns[0]);

      // Act
      component = fixture.componentInstance;

      // Assert
      const subscription = component.user$.subscribe((user) => {
        expect(user).toBeNull();
      });
      subscription.unsubscribe;
    });

    it('should be Observable undefined with undefined userId', async () => {
      // Arrange
      const { fixture } = await userComponentRenderHelper(renderPatterns[1]);

      // Act
      component = fixture.componentInstance;

      // Assert
      const subscription = component.user$.subscribe((user) => {
        expect(user).toBeUndefined();
      });
      subscription.unsubscribe;
    });

    it('should be Observable undefined with "" userId', async () => {
      // Arrange
      const { fixture } = await userComponentRenderHelper(renderPatterns[2]);

      // Act
      component = fixture.componentInstance;

      // Assert
      const subscription = component.user$.subscribe((user) => {
        expect(user).toBeUndefined();
      });
      subscription.unsubscribe;
    });

    it('should be Observable google User with google userId', async () => {
      // Arrange
      const { fixture } = await userComponentRenderHelper(renderPatterns[3]);

      // Act
      component = fixture.componentInstance;

      // Assert
      const subscription = component.user$.subscribe((user) => {
        expect(user).toEqual(renderPatterns[3].user);
      });
      subscription.unsubscribe;
    });

    it('should be Observable twitter User with twitter userId', async () => {
      // Arrange
      const { fixture } = await userComponentRenderHelper(renderPatterns[4]);

      // Act
      component = fixture.componentInstance;

      // Assert
      const subscription = component.user$.subscribe((user) => {
        expect(user).toEqual(renderPatterns[4].user);
      });
      subscription.unsubscribe;
    });

    it('should be Observable github User with github userId', async () => {
      // Arrange
      const { fixture } = await userComponentRenderHelper(renderPatterns[5]);

      // Act
      component = fixture.componentInstance;

      // Assert
      const subscription = component.user$.subscribe((user) => {
        expect(user).toEqual(renderPatterns[5].user);
      });
      subscription.unsubscribe;
    });
  });
});
