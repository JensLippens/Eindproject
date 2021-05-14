import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { MandjeService } from './mandje/mandje.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Eindproject';

  constructor(
    private authService: AuthService,
    private mandjeService: MandjeService
  ) {}

  ngOnInit(){
    this.authService.autoAuthUser();
    this.mandjeService.initMandje();
  }

}
