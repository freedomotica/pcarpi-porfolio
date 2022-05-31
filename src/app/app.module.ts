import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { InicioSessionComponent } from './componentes/inicio-session/inicio-session.component';
import { PorfolioComponent } from './componentes/porfolio/porfolio.component';
import { AcercaDeComponent } from './componentes/acerca-de/acerca-de.component';
import { ExperienciaComponent } from './componentes/experiencia/experiencia.component';
import { EducacionComponent } from './componentes/educacion/educacion.component';
import { LogrosComponent } from './componentes/logros/logros.component';
import { SkillsComponent } from './componentes/skills/skills.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { InterceptorService } from './servicios/interceptor.service';
import { PorfolioService } from './servicios/porfolio.service';
import { CoreModule } from './core/core/core.module';
import { EstadoService } from './servicios/estado.service';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InicioSessionComponent,
    PorfolioComponent,
    AcercaDeComponent,
    ExperienciaComponent,
    EducacionComponent,
    LogrosComponent,
    SkillsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CoreModule
  ],
  providers: [PorfolioService,
              {provide:HTTP_INTERCEPTORS,useClass:InterceptorService, multi:true},
              EstadoService
            ],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
