import { ComponentFixture } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { render, screen } from '@testing-library/angular';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    const renderResult = await render(HomeComponent, {});
    fixture = renderResult.fixture;
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    expect(screen.getByText('home works!')).toBeTruthy();
  });
});
