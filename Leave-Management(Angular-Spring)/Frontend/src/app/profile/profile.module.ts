import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { ProfileComponent } from "./profile.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Profile",
      urls: [{ title: "Profile", url: "/profile" }, { title: "Profile" }],
    },
    component: ProfileComponent,
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
export class ProfileModule {}
