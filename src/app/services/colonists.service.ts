import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Colonist, NewColonists } from '../models';
@Injectable()
export default class ColonistsService {

  COLONIST_JSON = 'https://red-wdp-api.herokuapp.com/api/mars/colonists';

  constructor(private http: Http) { }

      submitColonist(colonist: NewColonists): Observable<Colonist> {

      const headers = new Headers();
      headers.append('Content-Type','application/json');
      return  this.http.post(this.COLONIST_JSON,{ colonist }, { headers })
              .map((res: Response) => res.json().colonist|| {});
  }
}
