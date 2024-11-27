import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { AllemployeesComponent } from "./allemployees.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "AllemployeesComponent",
      urls: [{ title: "Allemployees", url: "/allemployees" }, { title: "Allmployees" }],
    },
    component: AllemployeesComponent,
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
export class AllemployeesModule {}
