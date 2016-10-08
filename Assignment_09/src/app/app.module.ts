import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { PokemonBoxComponent } from './components/pokemon-box/pokemon-box.component';
import { FilterPanelComponent } from './components/filter-panel/filter-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    PokemonCardComponent,
    PokemonBoxComponent,
    FilterPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
