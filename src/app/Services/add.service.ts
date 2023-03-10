import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class AddService {
  readonly ROOT_URL = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  AddTeg(data: any): Observable<any>{
    return this._http.post(`${this.ROOT_URL}/add`, data)
  };

  list(): Observable<any>{
    return this._http.get(`${this.ROOT_URL}/add`)
  };

  delete(listId: any): Observable<any> {
    return this._http.delete(`${this.ROOT_URL}/add/${listId}`)

  }

  editTeg(itemId: number, item:any ):Observable<any> {
    return this._http.put(`${this.ROOT_URL}/add/${itemId}`, item);
  }


}
