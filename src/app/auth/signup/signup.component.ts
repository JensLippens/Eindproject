import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

import { AuthService } from "../auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLoading = false;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
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
  }

}