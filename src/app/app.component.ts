import { CookieService } from 'ngx-cookie-service';
import { Component, HostListener, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  rememberme;
  userName;
  isadmin = 'false';

  constructor(private cookieservice: CookieService) {}
  ngOnInit(): void {
    environment.client.userId = this.cookieservice.get('userId');
    environment.client.isadmin = this.cookieservice.get('isadmin');
    environment.client.userName = this.cookieservice.get('userName');
    environment.client.rememberme = this.cookieservice.get('rememberme');
    this.isadmin = environment.client.isadmin;
    this.userName = environment.client.userName;
    this.rememberme = environment.client.rememberme;
    if (this.rememberme != 'true') {
      setTimeout(() => {
        this.cookieservice.deleteAll();
      }, 4000);
    }
  }
  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {}
  onActivate(event) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}


