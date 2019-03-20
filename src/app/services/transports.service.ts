import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { TokenStorage } from '../auth/token.storage';
@Injectable({
  providedIn: 'root'
})
export class TransportsService {
  
  constructor(private http : HttpClient, private token: TokenStorage) {}
  
  public $userSource = new Subject<any>();
  
  allTransports(search) : Observable <any> {
    return Observable.create(observer => {
      this.http.get('/api/transport',{params:search}).subscribe((data : any) => {
      
        observer.next(data);
        observer.complete();
      })
    });
  }
  getById(transport){
    return Observable.create(observer => {
      this.http.get('/api/transport/'+transport._id,{params:transport}).subscribe((data : any) => {
      
        observer.next(data);
        observer.complete();
      })
    });
  }
  
}
