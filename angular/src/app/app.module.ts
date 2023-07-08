import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from '@angular/common';
import { TokenInterceptorService } from './auth/interceptors/token-interceptor.service';
import { ServicesModule } from './services/services.module';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { SharedModule } from './shared/shared.module';
import { ClientesModule } from './clientes/clientes.module';
import { MascotasModule } from './mascotas/mascotas.module';
import { DonacionesModule } from './donaciones/donaciones.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    SharedModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    ServicesModule,
    ToastModule,
    MessagesModule,
    ClientesModule,
    MascotasModule,
    DonacionesModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
