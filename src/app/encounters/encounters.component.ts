import { Component, OnInit } from '@angular/core';
import { Encounter, NewEncounter } from '../models';
import EncounterService from '../services/encounters.service';
import { HostBinding,
         trigger, transition, animate,
         style, state  } from '@angular/core';

@Component({
  selector: 'app-encounters',
  templateUrl: './encounters.component.html',
  styleUrls: ['./encounters.component.css'],
  providers: [EncounterService],
  animations: [
    trigger('routeAnimation', [
      state('*',
        style({
          opacity: 1,
          transform: 'translateX(0)'
        })
      ),
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.2s ease-in')
      ]),
      transition(':leave', [
        animate('0.5s ease-out', style({
          opacity: 0,
          transform: 'translateY(100%)'
        }))
      ])
    ])
  ]
})

export class EncountersComponent implements OnInit {


  encounter: NewEncounter;
  marsEncounters: NewEncounter[];


  constructor(encounterService: EncounterService) {
    this.encounter = new NewEncounter(null, null, null, null);
    encounterService.getEncounter().subscribe((encounters) => {
    this.marsEncounters = encounters.sort((a, b) => {
    return b.id - a.id;
    })
    .splice(0, 100);
            }, (err) => {
    console.log(err);
    });
  }

  ngOnInit() {

  }
}
