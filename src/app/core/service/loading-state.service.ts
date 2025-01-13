import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingStateService {
  private _isLoading = signal(false);

  get isLoading() {
    return this._isLoading.asReadonly(); // immer als readonly signal zurückgeben
  }

  setLoadingState(isLoading: boolean) {
    this._isLoading.set(isLoading);
  }
}
