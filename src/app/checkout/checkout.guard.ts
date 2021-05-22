import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { AuthService } from "../auth/auth.service";
import { MandjeService } from "../mandje/mandje.service";

@Injectable()
export class CheckoutGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private mandjeService: MandjeService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.authService.getIsAuth();
    const isMandjeNietLeeg = (this.mandjeService.getAantalProductenInMandje() > 0);
    if (!isAuth) {
      this.router.navigate(['/login']);
      return isAuth;
    } else if (!isMandjeNietLeeg) {
      this.router.navigate(['/']);
    }
    return isMandjeNietLeeg;
  }
}
