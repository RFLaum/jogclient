import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RootComponent } from './misc/root/root.component';
import { UserWrapperComponent } from './users/single/user-wrapper/user-wrapper.component';
import { JogListDisplayComponent } from './jogs/all/jog-list-display/jog-list-display.component';
import { WeeksDisplayComponent } from './weeks/weeks-display/weeks-display.component';

const appRoutes: Routes = [
  { path: "", component: RootComponent },
  { path: "user", component: UserWrapperComponent },
  { path: "jogs", component: JogListDisplayComponent },
  { path: "weeks", component: WeeksDisplayComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
