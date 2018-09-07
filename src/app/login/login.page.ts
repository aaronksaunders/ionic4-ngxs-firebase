import { Component, OnInit } from "@angular/core";
import { CreateAccount, Login } from "../store/main-app.state";
import { Store, Select } from "@ngxs/store";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  submitted = false;
  loginForm: FormGroup;
  storeInfo;
  credentials: { email?: string; password?: string } = {};

  @Select(state => state.auth.user)
  user$: Observable<any>;
  constructor(
    private builder: FormBuilder,
    public store: Store,
    private router: Router
  ) {}
  ngOnInit() {

  }
  doLogin(_credentials) {
    if (_credentials.valid) {
      this.store.dispatch(new Login(_credentials.value));
    }
  }

  doCreateUser(_credentials) {
    debugger;

    if (_credentials.valid) {
      this.store.dispatch(new CreateAccount(_credentials.value));
    }
  }
}
