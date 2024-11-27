import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { EmployeesComponent } from "./employees.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Employees",
      urls: [{ title: "Employees", url: "/employees" }, { title: "Employees" }],
    },
    component: EmployeesComponent,
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
export class EmployeesModule {}
