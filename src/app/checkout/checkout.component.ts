import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { AuthData } from '../auth/auth-data.model';
import { AuthService } from '../auth/auth.service';
import { BestellingService } from '../bestelling/bestelling.service';
import { MandjeService } from '../mandje/mandje.service';
import { OrderItem } from '../mandje/orderitem.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  displayedColumns: string[] = ['productnaam', 'eenheidsprijs', 'aantal', 'subtotaal'];
  orderItems: OrderItem[];
  user: AuthData;
  totaalPrijs: number;

  dataSource: MatTableDataSource<OrderItem>;

  // paymentHandler: any;

  constructor(
    private authService: AuthService,
    private mandjeService: MandjeService,
    private bestellingService: BestellingService,
  ) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.orderItems = this.mandjeService.getMandje();
    this.totaalPrijs = this.mandjeService.getPrijsZonderBtw() * 1.21;
    this.dataSource = new MatTableDataSource(this.orderItems);
    // this.invokeStripe();
  }

  plaatsBestelling() {
    this.bestellingService.plaatsBestelling( this.user, this.orderItems, this.totaalPrijs);
    this.mandjeService.clearMandje();
  }

  // makePayment(amount) {
  //   const paymentHandler = (<any>window).StripeCheckout.configure({
  //     key: 'pk_test_51IsJ5vIqUsT0k6UWDi5Ms1kwSzP4FxO7u9fVNflXFAEaBNAD1nwJ64ZovszirjU3d65JcWKug3LxYaeFwwPNHI1G00cfDKyOxn',
  //     locale: 'auto',
  //     token: function (stripeToken: any) {
  //       console.log(stripeToken)
  //       alert('Stripe token generated!');
  //     }
  //   });

  //   paymentHandler.open({
  //     name: this.user.naam + " " + this.user.voornaam,
  //     amount: amount * 100
  //   });
  // }

  // invokeStripe() {
  //   if(!window.document.getElementById('stripe-script')) {
  //     const script = window.document.createElement("script");
  //     script.id = "stripe-script";
  //     script.type = "text/javascript";
  //     script.src = "https://checkout.stripe.com/checkout.js";
  //     script.onload = () => {
  //       this.paymentHandler = (<any>window).StripeCheckout.configure({
  //         key: 'pk_test_51IsJ5vIqUsT0k6UWDi5Ms1kwSzP4FxO7u9fVNflXFAEaBNAD1nwJ64ZovszirjU3d65JcWKug3LxYaeFwwPNHI1G00cfDKyOxn',
  //         locale: 'auto',
  //         token: function (stripeToken: any) {
  //           console.log(stripeToken)
  //           alert('Payment has been successfull!');
  //         }
  //       });
  //     }

  //     window.document.body.appendChild(script);
  //   }
  // }

}
