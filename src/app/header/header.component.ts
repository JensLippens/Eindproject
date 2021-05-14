import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from "rxjs";

import { AuthService } from "../auth/auth.service";
import { MandjeService } from '../mandje/mandje.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  productenInMandje: number;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  private mandjeCountListenerSubs: Subscription;

  constructor(
    private authService: AuthService,
    private mandjeService: MandjeService,
  ) { }

  ngOnInit(): void {
    this.productenInMandje = this.mandjeService.getAantalProductenInMandje();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.mandjeCountListenerSubs = this.mandjeService
      .getMandjeCountUpdateListener()
      .subscribe(aantalInMandje => {
        this.productenInMandje = aantalInMandje;
      });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
    this.mandjeCountListenerSubs.unsubscribe();
  }
}
