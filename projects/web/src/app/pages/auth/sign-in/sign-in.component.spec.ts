import { Auth } from '@angular/fire/auth';
import { SignInComponent } from './sign-in.component';
import { render } from '@testing-library/angular';

describe('PageSignInComponent', () => {
  let component: SignInComponent;

  beforeEach(async () => {
    const { fixture } = await render(SignInComponent, {
      providers: [{ provide: Auth, useValue: {} }],
    });
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });
});
