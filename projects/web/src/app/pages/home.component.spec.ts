import { HomeComponent } from './home.component';
import { render, screen } from '@testing-library/angular';

xdescribe('HomeComponent', () => {
  let component: HomeComponent;

  beforeEach(async () => {
    // routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const { fixture } = await render(HomeComponent, {
      providers: [],
    });
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });

  it('should display view home if current url is route', async () => {
    // Arrange

    // Act
    component.isHome = true;

    // Assert
    expect(screen.getByText('Hello there')).toBeTruthy();
  });

  it('should set isHome to true when url is /', () => {
    component.getIsHome('/');
    expect(screen.getByText('Hello there')).toBeTruthy();
  });

  it('should set isHome to false when url is not /', () => {
    component.getIsHome('/about');
    expect(screen.getByText('Hello there')).toBeFalsy();
  });
});
