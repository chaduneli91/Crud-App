import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { CrudInterface } from '../interface/crud-interface';
@Injectable({
  providedIn: 'root'
})
export class AddService {
  
  readonly ROOT_URL = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  AddTeg(data: CrudInterface): Observable< CrudInterface >{
    return this._http.post< CrudInterface >(`${this.ROOT_URL}/add`, data)
  };

  list(): Observable< CrudInterface []>{
    return this._http.get< CrudInterface []>(`${this.ROOT_URL}/add`)
  };

  delete(listId: number): Observable< CrudInterface > {
    return this._http.delete< CrudInterface >(`${this.ROOT_URL}/add/${listId}`)

  }

  editTeg(itemId: number, item: CrudInterface ): Observable<CrudInterface> {
    return this._http.put<CrudInterface>(`${this.ROOT_URL}/add/${itemId}`, item);
  }


}
