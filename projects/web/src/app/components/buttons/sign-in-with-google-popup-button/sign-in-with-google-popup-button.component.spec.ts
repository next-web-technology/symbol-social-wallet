import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInWithGooglePopupButtonComponent } from './sign-in-with-google-popup-button.component';

describe('SignInWithGooglePopupButtonComponent', () => {
  let component: SignInWithGooglePopupButtonComponent;
  let fixture: ComponentFixture<SignInWithGooglePopupButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SignInWithGooglePopupButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInWithGooglePopupButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
