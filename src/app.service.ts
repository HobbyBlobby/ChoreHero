import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { bottomAction } from './app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private bottomActionsChanged = new Subject<bottomAction[]>();
  changeOnActions$ = this.bottomActionsChanged.asObservable();

  constructor() { }

  emitChangeActions(change: bottomAction[]) {
    this.bottomActionsChanged.next(change);
  }

}
