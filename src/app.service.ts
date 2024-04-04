import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { bottomAction } from './app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private bottomActionsChanged = new Subject<bottomAction[]>();
  changeOnActions$ = this.bottomActionsChanged.asObservable();
  
  private hideToolbar = new Subject<boolean>();
  changeOnHideToolbar = this.hideToolbar.asObservable();

  constructor() { }

  emitChangeActions(change: bottomAction[]) {
    this.bottomActionsChanged.next(change);
  }

  emitShowToolbar() {
    this.hideToolbar.next(false);
  }
  emitHideToolbar() {
    this.hideToolbar.next(true);
  }
}
