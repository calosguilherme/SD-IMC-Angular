import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './controller/modulos/app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { ListaComponent } from './lista/lista.component';
import { HomeComponent } from './home/home.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { AccordionModule } from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { DataTableModule } from 'primeng/datatable';
import { OrderListModule } from 'primeng/orderlist';
import { DialogModule } from 'primeng/dialog';
import { HttpClientModule } from '@angular/common/http';
import { PessoaService } from './controller/services/pessoaService';
import { TabMenuModule } from 'primeng/tabmenu';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { ImcService } from './controller/services/imcService';


@NgModule({
  declarations: [
    AppComponent,
    ListaComponent,
    HomeComponent,
    RelatoriosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule,
    BrowserAnimationsModule,
    TableModule,
    DataTableModule,
    OrderListModule,
    DialogModule,
    FormsModule,
    HttpClientModule,
    TabMenuModule,
    ChartModule,
    ButtonModule,

  ],
  providers: [PessoaService, ImcService],
  bootstrap: [AppComponent]
})
export class AppModule {}
