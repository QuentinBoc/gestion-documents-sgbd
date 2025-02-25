import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../localstorage-service.service';
import { AlphabeticalSortPipe } from 'src/app/alphabetical-sort.pipe';


@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit {
  inscriptions: any[] = [];
  constructor(private localstorageService: LocalstorageService) {}
  ngOnInit(): void {
    this.inscriptions = this.localstorageService.getAllInscriptions();
}

    removeInscription(id: number): void {
    this.localstorageService.removeInscription(id);
    this.inscriptions = this.localstorageService.getAllWorkshops();
  }

}