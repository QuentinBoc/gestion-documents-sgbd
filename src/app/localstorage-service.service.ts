import { Injectable } from '@angular/core';

const key = 'liste';
const keyName = 'listeInscrits';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  workshops: any[] = [];
  inscriptions: any[] = [];

  constructor() {
    const workshopsData = localStorage.getItem(key);
    if (workshopsData) {
      this.workshops = JSON.parse(workshopsData);
    }
    const participantsData = localStorage.getItem(keyName);
    if (participantsData) {
      this.inscriptions = JSON.parse(participantsData);
    }
  }

  saveWorkshops(workshops: any[]): void {
  localStorage.setItem(key, JSON.stringify(workshops));
}


  saveInscription(): void {
    localStorage.setItem(keyName, JSON.stringify(this.inscriptions));
  }

  getAllWorkshops(): any[] {
    return this.workshops;
  }

  getWorkshopById(id: number): any | null {
    return this.workshops.find((workshop) => workshop.id === id) || null;
  }

  addWorkshop(workshop: any): void {
    workshop.id = this.workshops.length + 1;
    this.workshops.push(workshop);
    this.saveWorkshops(this.workshops); // Update the method call
  }

  setItem(key: string, value: any): void {
    if (value != null) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        alert('Error');
      }
    }
  }

  updateWorkshop(updatedWorkshop: any): void {
    const workshops = this.getAllWorkshops();
    const index = workshops.findIndex((workshop: any) => workshop.id === updatedWorkshop.id);
    if (index !== -1) {
      workshops[index] = updatedWorkshop;
      this.saveWorkshops(workshops); // Update the method call
    }
  }

  removeWorkshop(id: number): void {
    const index = this.workshops.findIndex((workshop) => workshop.id === id);
    if (index !== -1) {
      this.workshops.splice(index, 1);
      this.saveWorkshops(this.workshops); // Update the method call
    }
  }

  getAllInscriptions(): any {
    return this.inscriptions;
  }

  removeInscription(id: number): void {
    const index = this.inscriptions.findIndex((inscription) => inscription.id === id);
    if (index !== -1) {
      this.inscriptions.splice(index, 1);
      this.saveInscription();
    }
  }

  addInscription(inscription: any): void {
    inscription.id = this.inscriptions.length + 1;
    this.inscriptions.push(inscription);
    this.saveInscription();
  }

  getWorkshop(id: number): any {
    const workshops = this.getAllWorkshops();
    return workshops.find((workshop: any) => workshop.id === id);
  }
}
