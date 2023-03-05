import { render, screen } from '@testing-library/angular';
import { ViewHomeComponent } from './home.component';

describe('ViewHomeComponent', () => {
  let component: ViewHomeComponent;

  beforeEach(async () => {
    const { fixture } = await render(ViewHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render', () => {
    expect(screen.getByText('home works!')).toBeTruthy();
  });
});
