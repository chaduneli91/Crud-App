import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AddService {


  constructor(private _http: HttpClient) { }

  AddTeg(data: any): Observable<any>{
    return this._http.post('http://localhost:3000/add', data)
  };

  list(): Observable<any>{
    return this._http.get('http://localhost:3000/add')
  };

  delete(listId: any): Observable<any> {
    return this._http.delete(`http://localhost:3000/add/${listId}`)

  }

  editTeg(itemId: number, item:any ):Observable<any> {
    return this._http.put(`http://localhost:3000/add/${itemId}`, item);
  }


}
