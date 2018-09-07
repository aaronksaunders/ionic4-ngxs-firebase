import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";

// NGRX
import { Store, Select } from "@ngxs/store";
import { Logout, FetchFirebaseArray } from "../store/main-app.state";
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

  @Select(state => state.auth.authChecked)
  authChecked$: Observable<any>;
  @Select(state => state.auth.user)
  user$: Observable<any>;
  @Select(state => state.auth.error)
  error$: Observable<any>;
  @Select(state => state.auth.dataArray)
  data$: Observable<any>;
  constructor(private builder: FormBuilder, public store: Store) {
    this.store.dispatch(new FetchFirebaseArray("new-test"));
  }

  doLogout() {
    this.store.dispatch(new Logout());
  }
}
