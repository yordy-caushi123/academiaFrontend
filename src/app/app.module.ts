import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ToastrModule } from 'ngx-toastr';
import { ProgressBarModule } from "angular-progress-bar"
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgChatModule } from 'ng-chat';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

import { AppRoutingModule } from './app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';

import { RegistrarUsuarioComponent } from './pages/usuarios/registrar-usuario/registrar-usuario.component';
import { ListarUsuariosComponent } from './pages/usuarios/listar-usuarios/listar-usuarios.component';
import { ActualizarUsuarioComponent } from './pages/usuarios/actualizar-usuario/actualizar-usuario.component';

import {LoginComponent} from './pages/login/login.component';

import { InicioComponent } from './pages/inicio/inicio.component';
import { InterceptorService } from './servicios/interceptor.service';
import { CambiarContrasenaComponent } from './pages/usuarios/cambiar-contrasena/cambiar-contrasena.component';
import { AlumnosComponent } from './pages/alumnos/alumnos.component';
import { MatriculasComponent } from './pages/matriculas/matriculas.component';
import { MovimientosComponent } from './pages/movimientos/movimientos.component';
import { EscuelasComponent } from './pages/escuelas/escuelas.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    RegistrarUsuarioComponent,
    ListarUsuariosComponent,
    ActualizarUsuarioComponent,
    LoginComponent,
    InicioComponent,
    CambiarContrasenaComponent,
    AlumnosComponent,
    MatriculasComponent,
    MovimientosComponent,
    EscuelasComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    CollapseModule.forRoot(),
    ToastrModule.forRoot(),
    NgxDropzoneModule,
    ReactiveFormsModule,
    ProgressBarModule,
    NgChatModule,
    AutocompleteLibModule,
    NgxJsonViewerModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
