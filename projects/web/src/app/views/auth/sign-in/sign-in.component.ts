import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInButtonComponent } from '../../../components/elements/buttons/sign-in.component';

@Component({
  selector: 'app-view-sign-in',
  standalone: true,
  imports: [CommonModule, SignInButtonComponent],
  template: `
    <section class="h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div class="container h-full px-6 py-24">
        <div class="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <!-- Left column container with background-->
          <div class="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img class="" src="../assets/xymcity_cityscape_small.png" alt="XYM City Cityspace Image" />
          </div>

          <!-- Right column container with form -->
          <div class="md:w-8/12 lg:ml-6 lg:w-5/12">
            <div class="card bg-primary text-primary-content">
              <div class="card-body">
                <h2 class="card-title">Log in to Symbol Social Wallet !</h2>
                <p>text text text text text text text</p>
                <form class="mt-10">
                  <!-- Social login buttons -->
                  <app-components-elements-buttons-sign-in
                    [social]="'Google'"
                  ></app-components-elements-buttons-sign-in>
                  <!-- <app-components-elements-buttons-sign-in [social]="'Twitter'"></app-components-elements-buttons-sign-in> -->
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      section {
        background: -moz-linear-gradient(45deg, #02e1ba 0%, #26c9f2 29%, #d911f2 66%, #ffa079 100%);
        background: -webkit-linear-gradient(45deg, #02e1ba 0%, #26c9f2 29%, #d911f2 66%, #ffa079 100%);
        background: linear-gradient(45deg, #02e1ba 0%, #26c9f2 29%, #d911f2 66%, #ffa079 100%);
        background-size: 400% 400%;
        -webkit-animation: Gradient 15s ease infinite;
        -moz-animation: Gradient 15s ease infinite;
        animation: Gradient 15s ease infinite;
        /*min-height: calc(100vh - 2rem);*/
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: space-evenly;
        overflow: hidden;
        position: relative;
      }

      section::before,
      section::after {
        content: '';
        width: 70vmax;
        height: 70vmax;
        position: absolute;
        background: rgba(255, 255, 255, 0.07);
        left: -20vmin;
        top: -20vmin;
        animation: morph 15s linear infinite alternate, spin 20s linear infinite;
        z-index: 1;
        will-change: border-radius, transform;
        transform-origin: 55% 55%;
        pointer-events: none;
      }

      section::after {
        width: 70vmin;
        height: 70vmin;
        left: auto;
        right: -10vmin;
        top: auto;
        bottom: 0;
        animation: morph 10s linear infinite alternate, spin 26s linear infinite reverse;
        transform-origin: 20% 20%;
      }

      @-webkit-keyframes Gradient {
        0% {
          background-position: 0 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0 50%;
        }
      }

      @-moz-keyframes Gradient {
        0% {
          background-position: 0 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0 50%;
        }
      }

      @keyframes Gradient {
        0% {
          background-position: 0 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0 50%;
        }
      }

      @keyframes morph {
        0% {
          border-radius: 40% 60% 60% 40% / 70% 30% 70% 30%;
        }
        100% {
          border-radius: 40% 60%;
        }
      }

      @keyframes spin {
        to {
          transform: rotate(1turn);
        }
      }
    `,
  ],
})
export class ViewSignInComponent {}
