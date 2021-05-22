import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Subscription } from 'rxjs';

import { AuthService } from "../auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    )
  }

  valideerPaswoord(paswoord: string, herhaalPaswoord: string) {
    return paswoord == herhaalPaswoord;
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.valideerPaswoord(form.value.password, form.value.validatiePassword)){
      this.isLoading = true;
      this.authService.createUser(
        form.value.voornaam,
        form.value.naam,
        form.value.straat,
        form.value.huisnummer,
        form.value.gemeente,
        form.value.telefoon,
        form.value.email,
        form.value.password,
      );
    } else {
      alert("Paswoorden komen niet overeen");
    }
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
