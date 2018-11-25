import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from '../../../lista/lista.component';
import { RelatoriosComponent } from '../../../relatorios/relatorios.component';
import { HomeComponent } from '../../../home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'lista',
    component: ListaComponent
  },
  {
    path: 'relatorios',
    component: RelatoriosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
