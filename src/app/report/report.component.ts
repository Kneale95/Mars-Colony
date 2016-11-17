import { formControlBinding } from '@angular/forms/src/directives/reactive_directives/form_control_directive';
import { TEMPLATE_TRANSFORMS } from '@angular/compiler';
import { format } from 'util';
import { Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { Aliens, Encounter } from '../models';
import AliensService from '../services/encounters.service';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [AliensService],
  
})

export class ReportComponent implements OnInit {
  aliens: Aliens;
  marsAliens: Aliens[];
  NO_ALIENS_SELECTED = "(none)";
  encounter: Encounter
  

  constructor(aliensService: AliensService) {
    this.encounter = new Encounter(null,null,null,null,null);
  

  aliensService.getAliens().subscribe((aliens) => {
    this.marsAliens = aliens;
  }, (err) =>{
    console.log(err);
  }
  );}
  
  ngOnInit() {
  }
  get aliensSelected (){
    return this.aliens.type !== this.NO_ALIENS_SELECTED
  }
  onSubmit(event,reportForm){
    event.preventDefault();
   reportForm.form.controls.name.invalid=true;
    
  }
}
