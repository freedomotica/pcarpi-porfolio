import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { InicioSessionComponent } from './componentes/inicio-session/inicio-session.component';
import { PorfolioComponent } from './componentes/porfolio/porfolio.component';
import { AcercaDeComponent } from './componentes/acerca-de/acerca-de.component';
import { AptitudesComponent } from './componentes/aptitudes/aptitudes.component';
import { ExperienciaEducacionComponent } from './componentes/experiencia-educacion/experiencia-educacion.component';
import { LogrosComponent } from './componentes/logros/logros.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InicioSessionComponent,
    PorfolioComponent,
    AcercaDeComponent,
    AptitudesComponent,
    ExperienciaEducacionComponent,
    LogrosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
