import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DropdownComponent } from './users/dropdown/dropdown.component';
import { UserEditComponent } from './users/single/user-edit/user-edit.component';
import { MaybeRequiredDirective } from './users/single/user-edit/maybe-required.directive';
import { AuthInterceptor } from './communication/auth.interceptor';
import { ShowUserComponent } from './users/single/show-user/show-user.component';
import { JogEditComponent } from './jogs/single/jog-edit/jog-edit.component';
import { CheckNumberDirective } from './jogs/single/jog-edit/check-number.directive';
import { JogShowComponent } from './jogs/single/jog-show/jog-show.component';
import { JogWrapperComponent } from './jogs/single/jog-wrapper/jog-wrapper.component';
import { JogListDisplayComponent } from './jogs/all/jog-list-display/jog-list-display.component';
import { PaginationComponent } from './templates/pagination/pagination.component';
import { HeaderComponent } from './header/header.component';
import { MatchValidateDirective } from './users/single/user-edit/match-validate.directive';
import { AppRoutingModule } from './app-routing.module';
import { RootComponent } from './misc/root/root.component';
import { UserWrapperComponent } from './users/single/user-wrapper/user-wrapper.component';
import { WeeksDisplayComponent } from './weeks/weeks-display/weeks-display.component';
import { DateFilterComponent } from './jogs/all/date-filter/date-filter.component';
import { ShowWeekComponent } from './weeks/show-week/show-week.component';

@NgModule({
  declarations: [
    AppComponent,
    DropdownComponent,
    UserEditComponent,
    MaybeRequiredDirective,
    ShowUserComponent,
    JogEditComponent,
    CheckNumberDirective,
    JogShowComponent,
    JogWrapperComponent,
    JogListDisplayComponent,
    PaginationComponent,
    HeaderComponent,
    MatchValidateDirective,
    RootComponent,
    UserWrapperComponent,
    WeeksDisplayComponent,
    DateFilterComponent,
    ShowWeekComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
