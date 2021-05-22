import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";

import { AuthData } from '../auth-data.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-update-userdata',
  templateUrl: './update-userdata.component.html',
  styleUrls: ['./update-userdata.component.css']
})
export class UpdateUserdataComponent implements OnInit {
  isLoading: boolean = false;
  ingelogdeUser: AuthData;
  form: FormGroup;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.ingelogdeUser = this.authService.getUser();
    this.form = new FormGroup({
      naam: new FormControl(this.ingelogdeUser.naam, { validators: [Validators.required] }),
      voornaam: new FormControl(this.ingelogdeUser.voornaam, { validators: [Validators.required] }),
      straat: new FormControl(this.ingelogdeUser.straat, { validators: [Validators.required] }),
      huisnummer: new FormControl(this.ingelogdeUser.huisnummer, { validators: [Validators.required] }),
      gemeente: new FormControl(this.ingelogdeUser.gemeente, { validators: [Validators.required] }),
      telefoon: new FormControl(this.ingelogdeUser.telefoon, { validators: [Validators.required] }),
    })
    this.form.setValue({
      naam: this.ingelogdeUser.naam,
      voornaam: this.ingelogdeUser.voornaam,
      straat: this.ingelogdeUser.straat,
      huisnummer: this.ingelogdeUser.huisnummer,
      gemeente: this.ingelogdeUser.gemeente,
      telefoon: this.ingelogdeUser.telefoon,
    });
  }

  onUpdate() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.updateUser(
        this.ingelogdeUser._id,
        this.form.value.voornaam,
        this.form.value.naam,
        this.form.value.straat,
        this.form.value.huisnummer,
        this.form.value.gemeente,
        this.form.value.telefoon,
        this.ingelogdeUser.email,
        this.ingelogdeUser.password,
    );
  }
}


