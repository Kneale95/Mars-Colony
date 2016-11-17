import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Aliens } from "../models"
@Injectable()
export default class AliensService {

  ALIENS_JSON = 'https://red-wdp-api.herokuapp.com/api/mars/aliens';

  constructor(private http: Http) { }

   getAliens(): Observable<Aliens[]> {
    return this.http
          .get(this.ALIENS_JSON)
          .map((res: Response) => res.json().aliens);
              
          
    
   }
}
