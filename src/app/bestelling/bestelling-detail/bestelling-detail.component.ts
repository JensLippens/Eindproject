import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OrderItem } from 'src/app/mandje/orderitem.model';
import { Bestelling } from '../bestelling.model';
import { BestellingService } from '../bestelling.service';

@Component({
  selector: 'app-bestelling-detail',
  templateUrl: './bestelling-detail.component.html',
  styleUrls: ['./bestelling-detail.component.css']
})
export class BestellingDetailComponent implements OnInit {
  displayedColumns: string[] = ['productnaam', 'eenheidsprijs', 'aantal', 'subtotaal'];
  bestellingDetail: Bestelling;
  bestellingId: string;

  dataSource: MatTableDataSource<OrderItem>;

  constructor(
    private bestellingService: BestellingService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.bestellingId = paramMap.get('bestellingId');
      this.bestellingService.getBestelling(this.bestellingId)
        .subscribe(opgehaaldeBestelling => {
          this.bestellingDetail = opgehaaldeBestelling;
          this.dataSource = new MatTableDataSource(opgehaaldeBestelling.orderItems);
          // console.log(opgehaaldeBestelling.orderItems);
        });
    });
  }

}
