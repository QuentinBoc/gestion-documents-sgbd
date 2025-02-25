import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WorkshopService {
  getWorkshopName(): { value: string, label: string }[] {
    return [
      { value: 'Winter', label: 'Winter' },
      { value: 'Summer', label: 'Summer' },
      { value: 'Pâques', label: 'Pâques' },
            { value: 'Carnaval', label: 'Carnaval' },
                  { value: 'Toussaints', label: 'Toussaints' }

                  


    ];
  }
}