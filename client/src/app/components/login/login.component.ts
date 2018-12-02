import { Component, OnInit } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public config: ConfigService) { }

  ngOnInit() {
  }

}
