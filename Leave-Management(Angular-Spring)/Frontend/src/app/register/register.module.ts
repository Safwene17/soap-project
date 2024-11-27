import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { RegisterComponent } from "./register.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Register",
      urls: [{ title: "Register", url: "/register" }, { title: "Register" }],
    },
    component: RegisterComponent,
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
export class RegisterModule {}
