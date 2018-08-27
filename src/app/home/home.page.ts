import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";

// NGRX
import { Store, Select } from "@ngxs/store";
import { Login, CheckAuth, Logout, CreateAccount } from "../store/main-app.state";
import { Observable } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  submitted = false;
  loginForm: FormGroup;
  storeInfo;
  credentials: { email?: string; password?: string } = {};

  @Select(state => state.auth.authChecked) authChecked$: Observable<any>;
  @Select(state => state.auth.user) user$: Observable<any>;  
  @Select(state => state.auth.error) error$: Observable<any>;
  constructor(private builder: FormBuilder, public store: Store) {

    this.store.dispatch(new CheckAuth()).subscribe(v => console.log(v));
  }

  doLogout() {
    this.store.dispatch(new Logout());
  }

  doLogin(_credentials) {
    this.submitted = true;

    if (_credentials.valid) {
      this.store.dispatch(new Login(_credentials.value));
    }
  }

  doCreateUser(_credentials) {
    debugger;
    this.submitted = true;

    if (_credentials.valid) {
      this.store.dispatch(new CreateAccount(_credentials.value));
    }
  }
}
