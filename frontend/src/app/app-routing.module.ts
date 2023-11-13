import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { ModComicComponent } from './components/mod-comic/mod-comic.component';
import { MenuComponent } from './components/menu/menu.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { ExplorarComponent } from './components/explorar/explorar.component';
import { RecetaComponent } from './components/receta/receta.component';
import { AuthGuard } from './utils/auth.guard';
import { RecetasPropiasComponent } from './components/recetas-propias/recetas-propias.component';
import { VerRecetasSubidasComponent } from './components/ver-recetas-subidas/ver-recetas-subidas.component';
import { AcerdaDeComponent } from './components/acerda-de/acerda-de.component';

const routes: Routes = [
  { path: '', redirectTo:'main', pathMatch: 'full' },
  { path:"user", component:UserComponent },
  { path:"login", component:LoginComponent },
  { path:"table", component:TablaComponent },
  { path:"modify", component:ModComicComponent },
  { path:"menu", component:MenuComponent, canActivate: [AuthGuard] },
  { path:"main", component:PrincipalComponent },
  { path:'menu/:nameuser', component: MenuComponent, canActivate: [AuthGuard] },
  { path:'sms/:nameuser', component: DialogComponent },
  { path:"explorar", component:ExplorarComponent },
  { path:"principal", component: PrincipalComponent },
  { path:"recipe/:id", component: RecetaComponent },
  { path:"search/:recipe", component: PrincipalComponent },
  { path:"recetas", component:RecetasPropiasComponent},
  { path:"ver", component: VerRecetasSubidasComponent},
  { path:"verReceta/:nameuser", component: VerRecetasSubidasComponent},
  { path:"acerca_de", component: AcerdaDeComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
