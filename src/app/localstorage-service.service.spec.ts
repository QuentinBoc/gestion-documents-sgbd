import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  constructor() {}
  workshops: any[] = [];
  getItem(key: string): any {
    const workshopsValue = localStorage.getItem(key);
    if (workshopsValue) {
      return JSON.parse(workshopsValue);
    }
  }
  setItem(key: string, value: any): void {
    if (value != null) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        alert('Impossible, veuillez vérifier les données');
      }
    }
  }
}
