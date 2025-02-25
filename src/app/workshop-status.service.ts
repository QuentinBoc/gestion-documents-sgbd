import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkshopStatusService {
  private workshopStatusSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public workshopStatus$: Observable<boolean> = this.workshopStatusSubject.asObservable();

  constructor() {}

  public updateWorkshopStatus(isPassed: boolean): void {
    this.workshopStatusSubject.next(isPassed);
  }

  public getCurrentWorkshopStatus(): boolean {
    return this.workshopStatusSubject.value;
  }
}

