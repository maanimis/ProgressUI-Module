import { ProgressUI } from '../main/ProgressUI';

declare global {
  interface Window {
    ProgressUI: typeof ProgressUI;
  }
}
