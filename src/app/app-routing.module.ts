import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListWorkshopsComponent } from './list-workshops/list-workshops.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AddWorkshopComponent } from './add-workshop/add-workshop.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ParticipantsComponent } from './participants/participants.component';

const routes: Routes = [
  { path: 'liste', component: ListWorkshopsComponent },
  { path: '', component: LandingPageComponent },
  { path: 'create', component: AddWorkshopComponent },
  {path: 'inscription', component: InscriptionComponent},
  {path: 'participants', component: ParticipantsComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
