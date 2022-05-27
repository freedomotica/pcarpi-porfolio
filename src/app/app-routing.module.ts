import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSessionComponent } from './componentes/inicio-session/inicio-session.component';
import { PorfolioComponent } from './componentes/porfolio/porfolio.component';
import { GuardGuard } from './servicios/guard.guard';

const routes: Routes = [
  {path:'porfolio',component:PorfolioComponent, canActivate:[GuardGuard]},
  {path:'login',component:InicioSessionComponent},
  {path:'',redirectTo:'login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
