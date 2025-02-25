import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalstorageService } from '../localstorage-service.service';
import { AgeService } from 'src/app/age.service';
import { WorkshopStatusService } from '../workshop-status.service';
import { WorkshopService } from 'src/app/workshop.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Workshop } from '../workshop-model';


@Component({
  selector: 'app-add-workshop',
  templateUrl: './add-workshop.component.html',
  styleUrls: ['./add-workshop.component.scss'],
    providers: [WorkshopStatusService, AgeService, WorkshopService]
})



export class AddWorkshopComponent implements OnInit {
  workshopsForm!: FormGroup;
    preview$!: Observable<Workshop>;

  ageOptions: { value: string, label: string }[] = [];
atelierOptions: { value: string, label: string }[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private localstorageService: LocalstorageService,
    private ageService: AgeService,
    private workshopService: WorkshopService,
    private workshopStatusService: WorkshopStatusService

  ) {}

  ngOnInit(): void {
    this.createForm();
    this.ageOptions = this.ageService.getAgeOptions();
        this.atelierOptions = this.workshopService.getWorkshopName();
 this.preview$ = this.workshopsForm.valueChanges.pipe(
      map((formValue) => ({
        ...formValue,
        id: 0 
      }))
    );
  }

 createForm(): void {
  const ageOptions = this.ageService.getAgeOptions();
    const atelierOptions = this.workshopService.getWorkshopName();


  this.workshopsForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    age: ['', Validators.required],
    date: ['', Validators.required],
    price: ['', Validators.required],
    duration: ['', Validators.required],
    imageUrl: ['', Validators.required],
  });
}


  get formControls() {
    return this.workshopsForm.controls;
  }

 isWorkshopPassed(date: Date): boolean {
  const currentDate = new Date();
  return date < currentDate;
}

  onSubmit(): void {
    if (this.workshopsForm.invalid) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const workshop = this.workshopsForm.value;
    this.localstorageService.addWorkshop(workshop);
    const isWorkshopPassed = this.isWorkshopPassed(workshop.date);
  this.workshopStatusService.updateWorkshopStatus(isWorkshopPassed);
    this.router.navigate(['liste']);
  }
  
}
