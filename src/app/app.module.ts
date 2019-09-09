import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

// guards
import {AuthGuard} from './shared/guards/auth.guard';
import {SigninGuard} from './shared/guards/signin.guard';

// modules
import {CoreModule} from './core/core.module';
import {AppRoutingModule} from './app-routing.module';

// components
import {AppComponent} from './app.component';
import {FooterComponent} from './shared/components/footer/footer.component';
import {LayoutComponent} from './layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LayoutComponent
  ],
  imports: [
    CoreModule.forRoot(),
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    SigninGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
