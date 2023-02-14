import { ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { render, screen } from '@testing-library/angular';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    const renderResult = await render(AppComponent, {});
    fixture = renderResult.fixture;
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'admin'`, () => {
    expect(component.title).toEqual('admin');
  });

  it('should render title', () => {
    expect(screen.getByText('admin app is running!')).toBeTruthy();
  });
});
