import { formControlBinding } from '@angular/forms/src/directives/reactive_directives/form_control_directive';
import { TEMPLATE_TRANSFORMS } from '@angular/compiler';
import { format } from 'util';
import { Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { Aliens, Encounter } from '../models';
import EncounterService from '../services/aliens.service';
@Component({
  selector: 'app-encounters',
  templateUrl: './encounters.component.html',
  styleUrls: ['./encounters.component.css'],
  providers: [EncounterService],
  
})

export class EncountersComponent implements OnInit {
  marsEncounter: Encounter[];
  

  constructor(encounterService: EncounterService) {
  
   encounterService.getEncounter().subscribe((encounter) => {
    this.marsEncounter = encounter;
  }, (err) =>{
    console.log(err);
  }
  );}
  
  ngOnInit() {
  }

  onSubmit(event,reportForm){
    event.preventDefault();
   reportForm.form.controls.name.invalid=true;
    
  }
}
