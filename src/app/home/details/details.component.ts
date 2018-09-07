import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngxs/store";
import { AuthState } from "../../store/main-app.state";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"]
})
export class DetailsComponent implements OnInit {
  id;
  currentItem$;

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");

    this.currentItem$ = this.store
      .select(AuthState.getObjectById)
      .pipe(map(fn => fn(this.id)));
  }
}
