import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full", canActivate: [AuthGuard] },
  {
    path: "home",
    loadChildren: "./home/home.module#HomePageModule",
    canActivate: [AuthGuard]
  },
  { path: "login", loadChildren: "./login/login.module#LoginPageModule" },
  {
    path: "createAccount",
    loadChildren:
      "./create-account/create-account.module#CreateAccountPageModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
