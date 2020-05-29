import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import {ToiletObject, FilterConfig} from './models';
const API_URL = environment.apiUrl;
const PORT = environment.port;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  public sendHttps(cmd: string, obj: string = ""): Observable<ToiletObject[]> {
    var dataObj = {
          "command": cmd,
          "dataObject": obj
    }
    var encoded = btoa(JSON.stringify(dataObj));

    if (cmd == "getAllToiletObjects") {
      return this.getAllToilets();
    }
  }

  public getAllToilets(): Observable<ToiletObject[]>{
    return this.http.get<ToiletObject[]>(API_URL + '/toilet');
  }

  public getFilterConfig(): Observable<FilterConfig> {
    // return this.http.get<FilterConfig>(API_URL + '/s/filter');
    return this.http.get<FilterConfig>(API_URL + '/setup');

  }


}