import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private config: Object = null;

  constructor(private http: HttpClient) {}

  load() {
    return new Promise((resolve, reject) => {
      this.http.get('api/config')
        .subscribe((res) => {
          this.config = res;

          resolve();
        }, (err) => {
          reject();
        })
    });
  }

  get(property: string) {
    return this.config[property];
  }
}
