import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, share} from 'rxjs/operators';
import {SERVER_API_URL} from '../appcostants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  url = SERVER_API_URL;
  login(user): Observable<any>{
    return this.httpClient.post(this.url + 'login', user, {observe: 'response'}).pipe(
      share(), map( res => {
        if (res.headers.get('Authorization').startsWith('Bearer')) {
        sessionStorage.setItem('token', res.headers.get('Authorization'));
        }
        return res;
      })
    );
  }

  register(userDto: {nickname: string, password: string, email: string}): Observable<any>{
    return this.httpClient.post(this.url + 'api/v1/signup/', userDto);
  }
}
