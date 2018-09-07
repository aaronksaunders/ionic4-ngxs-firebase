import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  @Select(state => state.auth.user)
  user$: Observable<any>;

  constructor(private router: Router) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    console.log(state);

    return this.user$.pipe(
      map(v => {
        return v ? true : false;
      })
    );
    // return this.user$
    //   .toPromise()
    //   .then(user => {
    //     debugger;
    //     console.log("home auth", user);
    //     return true;
    //   })
    //   .catch(err => {
    //     debugger;
    //     this.router.navigate(["/login"]);
    //     return false;
    //   });
  }
}
