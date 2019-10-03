import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './user';



@Injectable()
export class UserService {

  private restUrl = 'http://localhost:4000/api';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    ) { }

  /** GET heroes from the server */
  getUsers (): Observable<User[]> {
    return this.http.get<User[]>(this.restUrl+'/all')
      .pipe(
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getUserNo404<Data>(id: number): Observable<User> {
    const url = `${this.restUrl}/?id=${id}`;
    return this.http.get<User[]>(url)
      .pipe(
        map(users => users[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
        }),
        catchError(this.handleError<User>(`getHero id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getUser(id: number): Observable<User> {
    const url = `${this.restUrl}/user/${id}`;
    return this.http.get<User>(url).pipe(
      catchError(this.handleError<User>(`user id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addUser (user: User): Observable<User> {
    return this.http.post<User>(this.restUrl+'/save', user, this.httpOptions).pipe(
      catchError(this.handleError<User>('addUser'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteUser (user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.restUrl}/delete/${id}`;

    return this.http.delete<User>(url, this.httpOptions).pipe(
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  /** PUT: update the hero on the server */
  updateUser (user: User): Observable<any> {
    return this.http.put(this.restUrl+'/update', user, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateUser'))
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

      // TODO: better job of transforming error for user consumption

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
