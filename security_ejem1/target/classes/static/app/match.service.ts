import {Injectable} from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Team} from './team.service';
import {Schedule} from './schedule.service';

export interface Maatch {
    id?: number;
    date: string;
    schedule: Schedule;
    local: Team;
    visitor: Team;
    resultLocal: number;
    resultVisitor: number;
}

const URL = 'matches/';

@Injectable()
export class MaatchService {

  constructor(private http: Http) { }

  getMatches() {
    return this.http.get(URL)
      .map(response => response.json())
      .catch(error => this.handleError(error));
  }
  
  getMatch(id: number | string) {
	    return this.http.get(URL+id)
	      .map(response => response.json())
	      .catch(error => this.handleError(error));
  }

  saveMatch(match: Maatch) {

    let body = JSON.stringify(match);
    let headers = new Headers({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    });
    let options = new RequestOptions({ headers });
    
    return this.http.post(URL, body, options)
      .map(response => response.json())
      .catch(error => this.handleError(error));
  }

  removeMatch(match: Maatch) {	  
	  
	let headers = new Headers({
	   'X-Requested-With': 'XMLHttpRequest'
	});
	let options = new RequestOptions({ headers });  
	  
    return this.http.delete(URL + match.id, options)
      .map(response => undefined)
      .catch(error => this.handleError(error));
  }

  	updateMatch(match: Maatch) {

    let body = JSON.stringify(match);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    });
    let options = new RequestOptions({ headers });

    return this.http.put(URL + match.id, body, options)
      .map(response => response.json())
      .catch(error => this.handleError(error));
    }

    private handleError(error: any){
      console.error(error);
      return Observable.throw("Server error (" + error.status + "): " + error.text())
    }
}
