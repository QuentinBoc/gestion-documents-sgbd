import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AgeService {
  getAgeOptions(): { value: string, label: string }[] {
    return [
      { value: '3-6', label: '3-6 ans' },
      { value: '7-9', label: '7-9 ans' },
      { value: '10-12', label: '10-12 ans' },
    ];
  }
}
