import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { DemandComponent } from "./demand.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Demand",
      urls: [{ title: "Demand", url: "/demand" }, { title: "Demand" }],
    },
    component: DemandComponent,
  },
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
  ],
})
export class DemandModule {}
