import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from "rxjs";
import { AuthData } from '../auth/auth-data.model';

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
  user: AuthData;
  private authListenerSubs: Subscription;
  private mandjeCountListenerSubs: Subscription;
  private userListenerSubs: Subscription;

  constructor(
    private authService: AuthService,
    private mandjeService: MandjeService,
  ) { }

  ngOnInit(): void {
    this.productenInMandje = this.mandjeService.getAantalProductenInMandje();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.user = this.authService.getUser();
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
    this.userListenerSubs = this.authService
      .getUserStatusListener()
      .subscribe(userData => {
        this.user = userData;
      });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
    this.mandjeCountListenerSubs.unsubscribe();
    this.userListenerSubs.unsubscribe();
  }
}
