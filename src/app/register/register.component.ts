import { ValidatorFn } from '@angular/forms';
import {cantBe} from '../shared/Validators';
import { formControlBinding } from '@angular/forms/src/directives/reactive_directives/form_control_directive';
import { TEMPLATE_TRANSFORMS } from '@angular/compiler';
import { format } from 'util';
import { Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { Colonist,NewColonists, Job } from '../models';
import JobsService from '../services/jobs.service';
import ColonistsService from '../services/colonists.service';
import {FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@Angular/forms';
import { Router } from '@angular/router';
import { HostBinding,
         trigger, transition, animate,
         style, state  } from '@angular/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [JobsService,ColonistsService],
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

export class RegisterComponent implements OnInit {

  @HostBinding('@routeAnimation') get routeAnimation() {
  return true;}
  @HostBinding('style.display') get display() {
  return 'block';}

  colonists: NewColonists;
  marsJobs: Job[];
  NO_JOB_SELECTED = "(none)";
  registerForm: FormGroup;
  marsColonist: Colonist;
  
 constructor( jobService: JobsService,
    private colonistsService: ColonistsService,
    private router: Router ) {
    this.colonists = new NewColonists(null,null,this.NO_JOB_SELECTED);


  jobService.getJobs().subscribe((jobs) => {
    this.marsJobs = jobs;
  }, (err) =>{
    console.log(err);
  }
  );}
  
  ngOnInit() {
  
  this.registerForm = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.minLength(2)]),
    age: new FormControl('',[Validators.required,Validators.maxLength(3)]),
    job_id: new FormControl(('none'),[cantBe(this.NO_JOB_SELECTED)]),
  });
}

  get jobSelected (){
    return this.colonists.job_id !== this.NO_JOB_SELECTED
  }

  onSubmit(event){
    event.preventDefault();
        const name = this.registerForm.get('name').value;
        const age = this.registerForm.get('age').value;
        const job_id = this.registerForm.get('job_id').value;
        const colonist = new NewColonists(name, age, job_id);
  
        if (this.registerForm.valid) {

        this.colonistsService.submitColonist(colonist).subscribe(
        (colonist) => {
        localStorage.setItem('colonist_id', JSON.stringify(colonist.id));
        this.router.navigate(['/encounters']);
                }, (err) => {
        console.log(err);
        });

        console.log('Ok, let\'s register this new colonist', new NewColonists(name, age, job_id));
    }
  }
}