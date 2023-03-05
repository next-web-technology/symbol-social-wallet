import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInWithGoogleRedirectButtonComponent } from './sign-in-with-google-redirect-button.component';

describe('SignInWithGoogleRedirectButtonComponent', () => {
  let component: SignInWithGoogleRedirectButtonComponent;
  let fixture: ComponentFixture<SignInWithGoogleRedirectButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SignInWithGoogleRedirectButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInWithGoogleRedirectButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
