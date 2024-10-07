import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SecureResourceComponent } from './secure-resource/secure-resource.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { TokenInterceptorService } from './services/token-interceptor.service';

const routes: Routes = [
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'secure-resource',
      component: SecureResourceComponent
    }
  ]
  
@NgModule({
  declarations: [LoginComponent, SecureResourceComponent, AppComponent],
  exports: [SecureResourceComponent, LoginComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
