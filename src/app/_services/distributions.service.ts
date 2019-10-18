import { Injectable } from '@angular/core';
import { Distribution } from "../_models";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DISTRIBUTIONS } from "../mock/distributions-mock";
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DistributionsService {
  private _distributions : Distribution[];
//  private distributionsUrl = 'https://us-central1-amap-echanges-de-paniers.cloudfunctions.net/distributionsApp/api/distributions';  // URL to web api
  private distributionsUrl = 'http://localhost:5001/amap-echanges-de-paniers/us-central1/distributionsApp/api/distributions';  // URL to emulated web api
  constructor(private http: HttpClient) { };
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getDistributions() : Observable<Distribution[]> 
  {
    console.log("getDistributions service called");
    return this.http.get<Distribution[]>(this.distributionsUrl)
    .pipe(
      catchError(this.handleError<Distribution[]>('getDistributions', [])));
  }

  /** POST: add a new distribution to the server */
  addDistribution (distribution: Distribution): Observable<Distribution> {
    return this.http.post<Distribution>(this.distributionsUrl, distribution, this.httpOptions).pipe(
      catchError(this.handleError<Distribution>('addDistribution'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  get distributions() : Distribution[] {
    return this._distributions;
  }

  set distributions(distributions : Distribution[])
  {
    this._distributions = distributions;
  }

  /** PUT: update the distribution on the server */
  updateDistribution (distribution: Distribution): Observable<Distribution> {
    const updateDistributionUrl = this.distributionsUrl + "/" + distribution.id;
    return this.http.put<Distribution>(updateDistributionUrl , distribution, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateDistribution'))
    );
  }

  /** DELETE: delete the distribution from the server */
  deleteDistribution (distribution: Distribution): Observable<Distribution> {
    const id = distribution.id;
    const url = `${this.distributionsUrl}/${id}`;

    return this.http.delete<Distribution>(url, this.httpOptions).pipe(
      catchError(this.handleError<Distribution>('deleteHero'))
    );
  }

}

export class DistributionsServiceMock {
  private _distributions : Distribution[] = DISTRIBUTIONS;
  constructor() { };

  get distributions() : Distribution[] {
    return this._distributions;
  }

  set distributions(distributions : Distribution[])
  {
    this._distributions = distributions;
  }
}
