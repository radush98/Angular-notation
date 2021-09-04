import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { FbResponse, Notation } from '../interfaces';
import { ModalResultService } from './modal-result.service';

@Injectable({
  providedIn: 'root'
})

export class NotationService {

  dNotation: Notation = {
    title: 'none',
    text: 'none',
    date: new Date()
  }

  constructor(
    private http: HttpClient,
    private res: ModalResultService
  ) { }

  getAllNotations(): Observable<Notation[]> {
    return this.http.get(`${environment.fbDbUrl}/posts.json`)
      .pipe(
        map((response: { [key: string]: any }) => {
          return Object
            .keys(response)
            .map(key => ({
              ...response[key],
              id: key,
            }))
        }))
  }

  postNotation(note: Notation): Observable<Notation> {
    return this.http.post(`${environment.fbDbUrl}/posts.json`, note)
      .pipe(map((response: FbResponse) => {
        const notation: Notation = {
          ...note,
          id: response.name,
          date: new Date(note.date)
        }
        return notation
      }))
  }

  getById(id: string): Observable<Notation> {
    return this.http.get<Notation>(`${environment.fbDbUrl}/posts/${id}.json`)
      .pipe(map((notation: Notation) => {
        return {
          ...notation,
          id,
          date: new Date(notation.date)
        }
      }))
  }

  deleteNotation(id: string): Observable<any> {
    return this.res.dialogResult().pipe(
      mergeMap(result => {
        if (result === "true") {
          return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`);
        } else {
          return of();
        }
      }
      ))
  }

  update(note: Notation): Observable<Notation> {
    return this.res.dialogResult().pipe(
      mergeMap(result => {
        if (result === "true") {
          return this.http.patch<Notation>(`${environment.fbDbUrl}/posts/${note.id}.json`, note);
        } else {
          return of(this.dNotation);
        }
      }
      ))
  }
}
