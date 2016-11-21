import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Encounter, NewEncounter } from '../models';



@Injectable()
export default class EncountersService {

	ENCOUNTERS_JSON = 'https://red-wdp-api.herokuapp.com/api/mars/encounters';
	
	constructor(private http: Http) { }

	getEncounter(): Observable<Encounter[]> {
		return this.http.get(this.ENCOUNTERS_JSON)
		.map((res: Response) => res.json().encounters);
	}

	submitEncounter(encounter: NewEncounter): Observable<Encounter> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.http.post(this.ENCOUNTERS_JSON, { encounter }, { headers })
		.map((res: Response) => res.json().encounter);
	}
}