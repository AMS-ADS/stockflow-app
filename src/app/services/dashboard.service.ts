import { Injectable } from '@angular/core';
import { ServiceService } from './service.service';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends ServiceService{

  constructor(
    http: HttpClient,
    cookie: CookieService
    ){
      super(http, cookie)
      this.endPoint = 'dashboard';
    }

    getDataBar(): Observable<any>{
      return this.http.get(`${this.apiUrl}/${this.endPoint}/bar`, this.requestOptions);
    }
}
