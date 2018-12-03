import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Imc } from '../model/imc.model';
import { ImcService } from '../controller/services/imcService';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',

})
export class RelatoriosComponent implements OnInit {
  items: MenuItem[];
  activeItem: MenuItem;
  data: any;
  imcs: Imc[];

  constructor(private imcService: ImcService) {

  }

  ngOnInit() {
    this.imcService.getImc().subscribe(imcs => {
      console.log(imcs )
      this.imcs = imcs
      this.data = this.calculaGrafico(this.imcs)
    })

    this.items = [
      { label: 'Stats', icon: 'fa fa-fw fa-bar-chart' },
      { label: 'Calendar', icon: 'fa fa-fw fa-calendar' },
      { label: 'Documentation', icon: 'fa fa-fw fa-book' },
      { label: 'Support', icon: 'fa fa-fw fa-support' },
      { label: 'Social', icon: 'fa fa-fw fa-twitter' }
    ];

    let i = 30


    this.activeItem = this.items[0];
  
  }


  calculaGrafico(imcs) {
    let mtMagro, magro, normal, gordo, obesoi, obesoii, obesoiii;
    mtMagro = magro = normal = gordo = obesoi = obesoii = obesoiii = 0
    for (let imc of imcs) {
      console.log(imc.valorimc)
      if (imc.valorimc < 17)
        mtMagro++
      if (imc.valorimc > 16 && imc.valorimc < 18.50)
        magro++
      if (imc.valorimc > 18.49 && imc.valorimc < 25)
        normal++
      if (imc.valorimc > 24.99 && imc.valorimc < 30)
        gordo++
      if (imc.valorimc > 29.99 && imc.valorimc < 35)
        obesoi++
      if (imc.valorimc > 34.99 && imc.valorimc < 40)
        obesoii++
      if (imc.valorimc > 40)
        obesoiii++
    }
    return ({
      labels: ['Grafico de Situação de IMC'],
      datasets: [
        {
          label: 'Muito abaixo do peso',
          data: [mtMagro],
          borderColor: '#FF4500',
          backgroundColor: '#FF0000',
        },
        {
          label: 'Abaixo do peso',
          data: [magro],
          borderColor: '#BCEE68',
          backgroundColor: '#CAFF70',
        },
        {
          label: 'Peso Normal',
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: [normal]
        },
        {
          label: 'Acima do peso',
          data: [gordo],
          borderColor: '#BCEE68',
          backgroundColor: '#CAFF70',
        },
        {
          label: 'Obesidade I',
          data: [obesoi],
          backgroundColor:'#FFFF00',
          borderColor:'#CDCD00',
        },
        {
          label: 'Obesidade II',
          data: [obesoii],
          borderColor:'#FFA500',
          backgroundColor:'#FF7F00',
        },
        {
          label: 'Obesidade III',
          data: [obesoiii],
          bordeColor: '#FF4500',
          backgroundColor: '#FF0000',
        },
      ]
    })

  }

  update(event: Event) {
    this.data = event
  }

}
