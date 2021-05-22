import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from '../auth/auth-data.model';
import { OrderItem } from '../mandje/orderitem.model';
import { Bestelling } from './bestelling.model';

import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl + "/bestellingen/";

@Injectable({
  providedIn: 'root'
})
export class BestellingService {

  private bestellingen: Bestelling[];
  private bestellingenUpdated = new Subject<Bestelling[]>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getBestellingenUpdateListener() {
    return this.bestellingenUpdated.asObservable();
  }

  plaatsBestelling( user: AuthData, orderItems: OrderItem[], totaalPrijs: number) {
    const bestellingData = {
      user: user,
      orderItems: orderItems,
      totaalPrijs: totaalPrijs,
    };
    this.http
      .post<{ message: string, bestelling: Bestelling }>(
        BACKEND_URL,
        bestellingData
      )
      .subscribe(() => {
        this.getBestellingen();
        this.router.navigate(["/"]);
      });
  }

  getBestellingen() {
    this.http
      .get<{ message: string; bestellingen: Bestelling[] }>(BACKEND_URL)
      .subscribe(opgehaaldeBestellingen => {
        this.bestellingen = opgehaaldeBestellingen.bestellingen;
        this.bestellingenUpdated.next([...this.bestellingen]);
      })
  }

  getBestelling(id: string) {
    return this.http.get<Bestelling>(
      BACKEND_URL + id
    );
  }

  deleteBestelling(bestellingId: string) {
    return this.http
      .delete(BACKEND_URL + bestellingId);
  }
}
