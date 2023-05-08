import { Auth } from '@angular/fire/auth';
import { ViewSignInComponent } from './sign-in.component';
import { render } from '@testing-library/angular';

describe('ViewSignInComponent', () => {
  let component: ViewSignInComponent;

  beforeEach(async () => {
    const { fixture } = await render(ViewSignInComponent, {
      providers: [{ provide: Auth, useValue: {} }],
    });
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });
});
