import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";

// NGRX
import { Store, Select } from "@ngxs/store";
import {
  Logout,
  FetchFirebaseArray,
  CreateFirebaseObject,
  DeleteFirebaseObject
} from "../store/main-app.state";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { AddTaskModalComponent } from "./add-task-modal/add-task-modal.component";

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
  constructor(
    private builder: FormBuilder,
    public store: Store,
    private router: Router,
    public modalController: ModalController
  ) {
    this.store.dispatch(new FetchFirebaseArray("new-test"));
  }

  doLogout() {
    this.store.dispatch(new Logout());
  }

  doDetail(item) {
    this.router.navigateByUrl(`home/${item.id}`);
  }

  doCreateObject(_inputData) {
    this.store.dispatch(
      new CreateFirebaseObject("new-test", {
        ..._inputData,
        created: new Date()
      })
    );
  }

  doDeleteObject(item) {
    this.store.dispatch(new DeleteFirebaseObject("new-test", item.id));
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: AddTaskModalComponent,
      componentProps: { value: 123, next: "foo" }
    });
    modal.onDidDismiss().then((d: any) => this.handleModalDismiss(d));
    return await modal.present();
  }

  handleModalDismiss = ({ data }) => {
    if (data.cancelled) {
      // alert that user cancelled
    } else {
      //save the data
      this.doCreateObject(data);
    }
  };
}
