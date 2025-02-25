import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from '../localstorage-service.service';
import { FormBuilder, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { WorkshopService } from 'src/app/workshop.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss'],
  providers: [WorkshopService]
})
export class InscriptionComponent implements OnInit {
  inscriptionForm!: FormGroup;
    maxBirthdate!: string;
      minBirthdate!: string;


  atelierOptions: { value: string, label: string }[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private localstorageService: LocalstorageService,
    private workshopService: WorkshopService
  ) {}

 ngOnInit(): void {
    this.createForm();
    this.atelierOptions = this.workshopService.getWorkshopName();

    const currentDate = new Date();
    const twelveYearsAgo = new Date();
    twelveYearsAgo.setFullYear(currentDate.getFullYear() - 12);

    this.minBirthdate = twelveYearsAgo.toISOString().split('T')[0];
    this.maxBirthdate = currentDate.toISOString().split('T')[0];
  }


  validateBirthdate(control: AbstractControl): ValidationErrors | null {
    const currentDate = new Date();
    const twelveYearsAgo = new Date();
    twelveYearsAgo.setFullYear(currentDate.getFullYear() - 12);

    if (control.value > twelveYearsAgo) {
      return { ageLimitExceeded: true };
    }

    return null;
  }

  updateAgeLimitExceeded(): void {
    const birthdateControl = this.inscriptionForm.get('birthdate');
    if (birthdateControl && birthdateControl.value) {
      const birthdate = birthdateControl.value;
      const errors = this.validateBirthdate(birthdate);

      if (errors) {
        birthdateControl.setErrors(errors);
      } else {
        birthdateControl.setErrors(null);
      }

      birthdateControl.updateValueAndValidity();
    }
  }

  createForm(): void {
    const atelierOptions = this.workshopService.getWorkshopName();

    this.inscriptionForm = this.formBuilder.group({
      parentName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[^@]*@[^@]*')]],
      birthdate: [null, [Validators.required, this.validateBirthdate.bind(this)]],
      childName: ['', Validators.required],
      ageLimitExceeded: [false],
      title: ['', Validators.required]
    });

    const birthdateControl = this.inscriptionForm.get('birthdate');
    if (birthdateControl) {
      this.updateAgeLimitExceeded();
    }
  }

  onSubmit(): void {
    if (this.inscriptionForm.invalid || this.inscriptionForm.get('birthdate')?.errors) {
      alert('Veuillez remplir tous les champs obligatoires ou corriger les erreurs.');
      return;
    }

    const inscription = this.inscriptionForm.value;
    this.localstorageService.addInscription(inscription);
    this.router.navigate(['participants']);
  }
}

