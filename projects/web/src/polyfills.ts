import 'zone.js';
import { Buffer } from 'buffer';

declare global {
  interface Window {
    global: Window;
    Buffer: typeof Buffer;
  }
}

window.global = window;
window.global.Buffer = window.global.Buffer || Buffer;
