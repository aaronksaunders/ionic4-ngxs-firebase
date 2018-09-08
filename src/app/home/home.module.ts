import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { HomePage } from "./home.page";
import { DetailsComponent } from "./details/details.component";
import { AddTaskModalComponent } from "./add-task-modal/add-task-modal.component";

@NgModule({
  entryComponents: [AddTaskModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: "",
        component: HomePage
      },
      {
        path: ":id",
        component: DetailsComponent
      }
    ])
  ],
  declarations: [HomePage, DetailsComponent, AddTaskModalComponent]
})
export class HomePageModule {}
