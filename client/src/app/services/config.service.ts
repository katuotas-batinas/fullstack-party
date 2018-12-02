import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private config: Object = null;

  constructor(private http: Http) {}

  load() {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:8000/api/config')
        .subscribe((res) => {
          this.config = res.json();

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
