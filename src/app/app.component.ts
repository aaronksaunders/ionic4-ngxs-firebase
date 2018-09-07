import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Store, Select } from "@ngxs/store";
import { CheckAuth } from "./store/main-app.state";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {
  @Select(state => state.auth.user)
  user$: Observable<any>;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public store: Store,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // listen for changes to user status to
      // automatocally rroute back to login page
      this.user$.subscribe(v => {
        console.log("CheckAuth", v);
        if (v) {
          this.router.navigateByUrl("/home");
        } else {
          this.router.navigateByUrl("/login");
        }
      });

      // check if i already have firebase user
      this.store
        .dispatch(new CheckAuth())
        .subscribe(v => {
          console.log("CheckAuth", v);
        })
        .unsubscribe();
    });
  }
}
