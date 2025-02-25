import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ListWorkshopsComponent } from './list-workshops/list-workshops.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HeaderComponent } from './header/header.component';
import { AddWorkshopComponent } from './add-workshop/add-workshop.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InscriptionComponent } from './inscription/inscription.component';
import { ParticipantsComponent } from './participants/participants.component';
import { AlphabeticalSortPipe } from './alphabetical-sort.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WorkshopStatusService } from './workshop-status.service';
import { AgeService } from './age.service';
import { WorkshopService } from './workshop.service';
import { FooterComponent } from './footer/footer.component';








@NgModule({
  declarations: [
    AppComponent,
    ListWorkshopsComponent,
    LandingPageComponent,
    HeaderComponent,
    AddWorkshopComponent,
    InscriptionComponent,
    ParticipantsComponent,
    AlphabeticalSortPipe,
    FooterComponent,
    
    
    
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([]),
    BrowserAnimationsModule,
    
  ],
  providers: [WorkshopStatusService,AgeService, WorkshopService],
  bootstrap: [AppComponent]
})
export class AppModule { }
