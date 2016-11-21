import { Validator, Validators } from '@angular/forms';
import { formControlBinding } from '@angular/forms/src/directives/reactive_directives/form_control_directive';
import { TEMPLATE_TRANSFORMS } from '@angular/compiler';
import { format } from 'util';
import { Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { Aliens, Colonist, Encounter, NewEncounter } from '../models';
import {cantBe} from '../shared/validators'; 
import AliensService from '../services/aliens.service';
import EncountersService from '../services/encounters.service';
import {FormGroup, FormControl, FormBuilder,AbstractControl } from '@Angular/forms';
import { Router } from '@angular/router';
import { HostBinding,
         trigger, transition, animate,
         style, state  } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [AliensService, EncountersService],
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
  
export class ReportComponent implements OnInit {
  @HostBinding('@routeAnimation') get routeAnimation() {
  return true;}
  @HostBinding('style.display') get display() {
  return 'block';}


  marsAliens: Aliens[];
  reportForm: FormGroup;
  NO_ALIENS_SELECTED = '(none)';

  
  constructor(private aliensService:AliensService, 
              private encountersService:EncountersService,
              private router: Router) {

  
  aliensService.getAliens().subscribe((aliens) => {
    this.marsAliens = aliens;
  }, (err) =>{
    console.log(err);
  }
  );}
  
  ngOnInit() {
    this.reportForm = new FormGroup({
    atype: new FormControl(this.NO_ALIENS_SELECTED,[cantBe(this.NO_ALIENS_SELECTED)]),
    action: new FormControl('',[Validators.required,Validators.maxLength(450)])
  });
}

  private getDate() {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}

  onSubmit(event) {
    event.preventDefault();
    const date = this.getDate();
    const atype = this.reportForm.get('atype').value;
    const action = this.reportForm.get('action').value;
    

    const encounter = new NewEncounter(date, atype, action, 4); 
    this.encountersService.submitEncounter(encounter)
    .subscribe((enc) => {
    console.log('get encounter', enc);
    this.router.navigate(['encounters']);
    }, (err) => {
    console.log('there was an error');
    })
  }
}