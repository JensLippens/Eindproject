import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { AuthData } from "./auth-data.model";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any; // type NodeJS.Timer;
  private user: AuthData;
  //private userId: string;
  private authStatusListener = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  /* getUserId() {
    return this.userId;
  } */

  getUser() {
    return this.user;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(voornaam: string, naam: string, straat: string, huisnummer: number, gemeente: string, telefoon: string, email: string, password: string) {
    const authData = {
      voornaam: voornaam,
      naam: naam,
      straat: straat,
      huisnummer: huisnummer,
      gemeente: gemeente,
      telefoon: telefoon,
      email: email,
      password: password,
      isAdmin: false,
    };
    this.http
      .post("http://localhost:3000/api/user/signup", authData)
      .subscribe(response => {
        console.log(response);
        this.login(email, password);
        this.router.navigate(["/"]);
      });
  }

  login(email: string, password: string) {
    const loginData = { email: email, password: password };
    this.http
      .post<{ token: string; expiresIn: number, user: AuthData }>( // userId: string,
        "http://localhost:3000/api/user/login",
        loginData
      )
      .subscribe(response => {
        console.log(response);
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.user = response.user;
          //this.userId = response.userId;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000 // omzetting seconden naar milliseconden
          );
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate, this.user); // this.userId,
          this.router.navigate(["/"]);
        }
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    // getTime() zorgt voor een waarde in milliseconden ten opzichte
    // van een vast tijdstip (1 januari 1970)
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      //this.userId = authInformation.userId;
      this.user = authInformation.user;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
      console.log(authInformation);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    //this.userId = null;
    this.user = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000); // transformatie seconden naar milliseconden
  }

  private saveAuthData(token: string, expirationDate: Date,user: AuthData) { // userId: string,
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    //localStorage.setItem("userId", userId);
    localStorage.setItem("user", JSON.stringify(user));
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    // localStorage.removeItem("userId");
    localStorage.removeItem("user");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    //const userId = localStorage.getItem("userId");
    const user = localStorage.getItem("user");
    if (!token || !expirationDate || !user) { // || !userId
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      //userId: userId,
      user: JSON.parse(user),
    }
  }
}
