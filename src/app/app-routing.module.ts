import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioComponent } from './pages/inicio/inicio.component';

import { RegistrarUsuarioComponent } from './pages/usuarios/registrar-usuario/registrar-usuario.component';
import { ActualizarUsuarioComponent } from './pages/usuarios/actualizar-usuario/actualizar-usuario.component';
import { ListarUsuariosComponent } from './pages/usuarios/listar-usuarios/listar-usuarios.component';

import { ListarBitacorasComponent } from './pages/bitacoras/listar-bitacoras/listar-bitacoras.component';
import { VerBitacoraComponent } from './pages/bitacoras/ver-bitacora/ver-bitacora.component';

import { CambiarContrasenaComponent } from './pages/usuarios/cambiar-contrasena/cambiar-contrasena.component';

import { GuardService as guard} from './servicios/guard.service';
import { AlumnosComponent } from './pages/alumnos/alumnos.component';
import { MatriculasComponent } from './pages/matriculas/matriculas.component';
import { MovimientosComponent } from './pages/movimientos/movimientos.component';


const routes: Routes = [
  {path: 'inicio', component: InicioComponent},
  {path: '', component: InicioComponent},

  {path: 'registrarUsuario', component: RegistrarUsuarioComponent, canActivate: [guard], data: { expectedRol: ['administrador']}},
  {path: 'actualizarUsuario', component: ActualizarUsuarioComponent, canActivate: [guard], data: { expectedRol: ['administrador']}},
  {path: 'actualizarUsuario/:id', component: ActualizarUsuarioComponent, canActivate: [guard], data: { expectedRol: ['administrador']}},
  {path: 'listarUsuarios', component: ListarUsuariosComponent, canActivate: [guard], data: { expectedRol: ['administrador']}},
  {path: 'cambiarContrasena', component: CambiarContrasenaComponent, canActivate: [guard], data: { expectedRol: ['administrador', 'coordinador', 'sector', 'operador']}},

  {path: 'listarBitacoras', component: ListarBitacorasComponent, canActivate: [guard], data: { expectedRol: ['administrador']}},
  {path: 'verBitacora/:id', component: VerBitacoraComponent, canActivate: [guard], data: { expectedRol: ['administrador']}},

  {path: 'alumnos', component: AlumnosComponent, canActivate: [guard], data: { expectedRol: ['administrador']}},
  {path: 'matriculas', component: MatriculasComponent, canActivate: [guard], data: { expectedRol: ['administrador']}},
  {path: 'movimientos', component: MovimientosComponent, canActivate: [guard], data: { expectedRol: ['administrador']}},

  {path: '**', redirectTo: 'inicio', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }