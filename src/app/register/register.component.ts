import { ValidatorFn } from '@angular/forms';
import {cantBe} from '../shared/Validators';
import { formControlBinding } from '@angular/forms/src/directives/reactive_directives/form_control_directive';
import { TEMPLATE_TRANSFORMS } from '@angular/compiler';
import { format } from 'util';
import { Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { NewColonists, Job } from '../models';
import JobsService from '../services/jobs.service';
import {FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@Angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [JobsService],
  
})

export class RegisterComponent implements OnInit {

  colonists: NewColonists;
  marsJobs: Job[];
  NO_JOB_SELECTED = "(none)";
  registerForm: FormGroup;
  

  constructor(jobService: JobsService) {
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
    console.log(this.registerForm.invalid);
    if(this.registerForm.invalid){

    } else {
      const name = this.registerForm.get('name').value;
      const age = this.registerForm.get('age').value;
      const job_id = this.registerForm.get('job_id').value;
      console.log('ok, lets register this new colonist', new NewColonists(name,age,job_id));
    }
    
  
  }
}