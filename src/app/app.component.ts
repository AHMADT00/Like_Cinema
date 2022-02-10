import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  userName;
  isadmin = 'false';
  constructor(private cookieservice: CookieService) {}
  ngOnInit(): void {
    this.isadmin = this.cookieservice.get('isadmin');
    this.userName = this.cookieservice.get('userName');
  }
}
