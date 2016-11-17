import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Encounter } from "../models"
@Injectable()
export default class EncounterService {

  ENCOUNTER_JSON = 'https://red-wdp-api.herokuapp.com/api/mars/encounter';

  constructor(private http: Http) { }

   getEncounter(): Observable<Encounter[]> {
    return this.http
          .get(this.ENCOUNTER_JSON)
          .map((res: Response) => res.json().encounter);
              
          
    
   }
}
