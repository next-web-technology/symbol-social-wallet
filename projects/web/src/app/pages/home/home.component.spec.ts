import { render, screen } from '@testing-library/angular';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;

  beforeEach(async () => {
    const { fixture } = await render(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', async () => {
    expect(component).toBeTruthy();
  });

  it('should render title', async () => {
    expect(screen.getAllByText('home works!')).toBeTruthy();
  });
});
