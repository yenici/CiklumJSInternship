import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/share';

@Injectable()
export class SpinnerService {

  public status: Subject<boolean> = new Subject();
  private _taskCount = 0;

  public get active(): boolean {
    return (this._taskCount > 0);
  }

  public set active(addTask: boolean) {
    if (addTask) {
      this._taskCount += 1;
    } else {
      if (this._taskCount > 0) {
        this._taskCount -= 1;
      }
    }
    this.status.next((this._taskCount > 0));
  }

  public start(): void {
    this.active = true;
  }

  public stop(): void {
    this.active = false;
  }
}