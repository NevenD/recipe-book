import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AlertComponent } from './shared/alert/alert.component';
import { CoreModule } from './core.module';
import { StoreModule } from '@ngrx/store';
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { DropdownDirective } from './shared/dropdown.directive';

@NgModule({
  declarations: [AppComponent, HeaderComponent, DropdownDirective],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot({ shoppingList: shoppingListReducer }),
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [CoreModule],
  bootstrap: [AppComponent],
  entryComponents: [AlertComponent],
})
export class AppModule {}
