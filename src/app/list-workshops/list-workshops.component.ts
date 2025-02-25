import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LocalstorageService } from '../localstorage-service.service';
import { WorkshopStatusService } from '../workshop-status.service';
import { AgeService } from 'src/app/age.service';
import { WorkshopService } from 'src/app/workshop.service';



@Component({
  selector: 'app-list-workshops',
  templateUrl: './list-workshops.component.html',
  styleUrls: ['./list-workshops.component.scss'],
      providers: [ AgeService, WorkshopService,WorkshopStatusService]

})
export class ListWorkshopsComponent implements OnInit {
  workshops: any[] = [];
  editForm!: FormGroup; 
    ageOptions: { value: string, label: string }[] = [];
atelierOptions: { value: string, label: string }[] = [];

  constructor(
    private localstorageService: LocalstorageService,
    public workshopStatusService: WorkshopStatusService,
     private ageService: AgeService,
    private workshopService: WorkshopService,
  ) {}

  ngOnInit(): void {
    this.workshops = this.localstorageService.getAllWorkshops();
    this.initEditForm(); 
     this.ageOptions = this.ageService.getAgeOptions();
        this.atelierOptions = this.workshopService.getWorkshopName();
  }

  isWorkshopPassed(date: string): boolean {
    const currentDate = new Date();
    const workshopDate = new Date(date);
    return currentDate > workshopDate;
  }

  removeWorkshop(id: number): void {
    this.localstorageService.removeWorkshop(id);
    this.workshops = this.localstorageService.getAllWorkshops();
  }

  editWorkshop(id: number): void {
     const ageOptions = this.ageService.getAgeOptions();
    const atelierOptions = this.workshopService.getWorkshopName();
    const workshop = this.workshops.find((w) => w.id === id);
    if (workshop) {
      workshop.isEditing = true;
    }
  }

  saveChanges(id: number): void {
    const updatedWorkshop = this.editForm.value;
    updatedWorkshop.id = id; // Ajoutez la propriété id à l'objet updatedWorkshop

    this.localstorageService.updateWorkshop(updatedWorkshop);

    this.editForm.reset();
    const workshop = this.workshops.find((w) => w.id === id);
    if (workshop) {
      workshop.isEditing = false;
    }

    this.localstorageService.saveWorkshops(this.workshops); // Mettez à jour l'appel de méthode
  }

  private initEditForm(): void {
    this.editForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      age: new FormControl(''),
      date: new FormControl(''),
            price: new FormControl(''),
                        imageUrl: new FormControl(''),

    });
  }

  cancelEdit(workshop: any): void {
    workshop.isEditing = false;

    const originalWorkshop = this.localstorageService.getWorkshop(workshop.id);
    this.editForm.patchValue(originalWorkshop);
  }
}
