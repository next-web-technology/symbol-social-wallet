import { AppComponent } from './app.component';
import { render, screen } from '@testing-library/angular';

xdescribe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(async () => {
    const { fixture } = await render(AppComponent, {});
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'web'`, () => {
    expect(component.title).toEqual('web');
  });

  it('should render title', () => {
    expect(screen.getByText('web app is running!')).toBeTruthy();
  });
});
