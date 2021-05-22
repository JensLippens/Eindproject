import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthData } from 'src/app/auth/auth-data.model';
import { AuthService } from 'src/app/auth/auth.service';
import { Bestelling } from '../bestelling.model';
import { BestellingService } from '../bestelling.service';

@Component({
  selector: 'app-bestelling-list',
  templateUrl: './bestelling-list.component.html',
  styleUrls: ['./bestelling-list.component.css']
})
export class BestellingListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['factuurNummer', 'volledigeNaam', 'gemeente', 'prijs', 'actions'];
  alleBestellingen: Bestelling[];

  dataSource: MatTableDataSource<Bestelling>;

  // user: AuthData;
  // userIsAuthenticated = false;

  private bestellingSub: Subscription;
  // private authStatusSub: Subscription;

  constructor(
    // private authService: AuthService,
    private bestellingService: BestellingService,
  ) { }

  ngOnInit(): void {
    this.bestellingService.getBestellingen();
    this.bestellingSub = this.bestellingService
      .getBestellingenUpdateListener()
      .subscribe((bestellingenData: Bestelling[]) => {

        this.alleBestellingen = bestellingenData;
        this.dataSource = new MatTableDataSource(bestellingenData);
        // console.log(this.dataSource);
        this.dataSource.filterPredicate = (data, filter) => {
          const dataStr = `${data._id} ${data.user.naam.toLowerCase()} ${data.user.voornaam.toLowerCase()}
                           ${data.user.gemeente.toLowerCase()} ${data.totaalPrijs.toFixed(2)}`;
          return dataStr.indexOf(filter.toString()) != -1;
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  verwijderBestelling(bestellingId: string) {
    this.bestellingService.deleteBestelling(bestellingId)
    .subscribe(() => {
      this.bestellingService.getBestellingen();
    });
  }

  ngOnDestroy() {
    this.bestellingSub.unsubscribe();
  }
}
