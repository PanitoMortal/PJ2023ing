import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablaComponent } from './components/tabla/tabla.component';
import { DialogComponent } from './components/dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { DialogErrorComponent } from './components/dialog-error/dialog-error.component';
import { ErrorcontraComponent } from './components/errorcontra/errorcontra.component';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ModComicComponent } from './components/mod-comic/mod-comic.component';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatRadioModule} from '@angular/material/radio';
import { MenuComponent } from './components/menu/menu.component';
import { MensajeinsertComponent } from './components/mensajeinsert/mensajeinsert.component';
import { MensajemodComponent } from './components/mensajemod/mensajemod.component';
import { PrincipalComponent } from './components/principal/principal.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { CargarScriptsService } from './services/cargar-scripts.service';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule, Routes }   from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild, inject} from '@angular/core';
import {MatAutocompleteSelectedEvent, MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {NgFor, AsyncPipe} from '@angular/common';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { ExplorarComponent } from './components/explorar/explorar.component';
import { RecetaComponent } from './components/receta/receta.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { ToastrModule } from 'ngx-toastr';
import { AddTokenInterceptor } from './utils/add-token.interceptor';
import { RecetasPropiasComponent } from './components/recetas-propias/recetas-propias.component';
import { VerRecetasSubidasComponent } from './components/ver-recetas-subidas/ver-recetas-subidas.component';
import { AcerdaDeComponent } from './components/acerda-de/acerda-de.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    TablaComponent,
    DialogComponent,
    DialogErrorComponent,
    ErrorcontraComponent,
    ModComicComponent,
    MenuComponent,
    MensajeinsertComponent,
    MensajemodComponent,
    PrincipalComponent,
    ExplorarComponent,
    RecetaComponent,
    SpinnerComponent,
    RecetasPropiasComponent,
    VerRecetasSubidasComponent,
    AcerdaDeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    MatExpansionModule,
    MatTooltipModule,
    MatChipsModule,
    NgFor,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  providers: [
    CargarScriptsService,
    { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
