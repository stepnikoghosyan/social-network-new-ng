import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

// modules
import {AppRoutingModule} from './app-routing.module';

// components
import {AppComponent} from './app.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
