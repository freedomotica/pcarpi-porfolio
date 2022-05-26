import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSessionComponent } from './componentes/inicio-session/inicio-session.component';
import { PorfolioComponent } from './componentes/porfolio/porfolio.component';

const routes: Routes = [
  {path:'porfolio',component:PorfolioComponent},
  {path:'iniciar-sesion',component:InicioSessionComponent},
  {path:'',redirectTo:'porfolio',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
