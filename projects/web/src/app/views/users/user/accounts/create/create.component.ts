import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-account-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="my-10">
      <h2 class=" text-1xl font-extrabold text-gray-900 md:text-3xl lg:text-4xl ">Account Create</h2>
    </div>

    <div class="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">New Account create</h5>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
      </p>
      <label
        for="new"
        class="btn inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Start Now !
        <svg
          aria-hidden="true"
          class="w-4 h-4 ml-2 -mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </label>
    </div>

    <div class="p-6 mt-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Account Create From Private-Key
      </h5>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
      </p>
      <label
        for="private-key"
        class="btn inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Start Now !
        <svg
          aria-hidden="true"
          class="w-4 h-4 ml-2 -mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </label>
    </div>

    <div class="p-6 mt-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Account Create From QR</h5>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
      </p>
      <label
        for="qr"
        class="btn inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Start Now !
        <svg
          aria-hidden="true"
          class="w-4 h-4 ml-2 -mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </label>
    </div>

    <!-- modal for createNewAccount -->
    <input type="checkbox" id="new" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box">
        <form #formPrivateKey="ngForm" (ngSubmit)="createNewAccountFunc()">
          <div class="modal-action">
            <input for="new" type="submit" value="Yay!" class="btn" />
            <label for="new" class="btn">No...</label>
          </div>
        </form>
      </div>
    </div>

    <!-- modal for createFromPrivateKey -->
    <input type="checkbox" id="private-key" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box">
        <form #formPrivateKey="ngForm" (ngSubmit)="createAccountWithPrivateKeyFunc(privateKey)">
          <label for="private-key" class="label">
            <span class="label-text">private key</span>
          </label>
          <input
            id="private-key"
            name="private-key"
            type="password"
            [(ngModel)]="privateKey"
            required
            #privatekey="ngModel"
            placeholder="Type here"
            class="input w-full max-w-xs"
          />

          <div class="modal-action">
            <input for="private-key" type="submit" value="Yay!" [disabled]="formPrivateKey.invalid" class="btn" />
            <label for="private-key" class="btn">No...</label>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [],
})
export class ViewAccountCreateComponent {
  @Input() createNewAccountFunc!: () => Promise<void>;
  @Input() createAccountWithMneonicFunc!: () => Promise<void>;
  @Input() createAccountWithPrivateKeyFunc!: (arg: string) => Promise<void>;
  @Input() createAccountWithQrFunc!: () => Promise<void>;
  @Input() createAccountWithTextFunc!: () => Promise<void>;

  privateKey!: string;
}
