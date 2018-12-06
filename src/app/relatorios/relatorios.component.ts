import { Component, OnInit, ViewChild } from '@angular/core';
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
  data2: any;
  m: number = 0;
  h: number = 0;
  imcs: Imc[];
  newImcs: Imc[];
  @ViewChild('menuItems') menu: MenuItem[];

  constructor(private imcService: ImcService) {
  }

  ngOnInit() {
    this.imcService.getImc().subscribe(imcs => {
      console.log(imcs)
      this.imcs = imcs
      this.newImcs = this.imcs.sort(function (a, b) { //ORDENA POR DATA
        if (a.data > b.data) {
          return 1;
        }
        if (a.data < b.data) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });


      this.imcs = this.removeRepetido(this.imcs)
      this.m = this.contMulher()
      this.h = this.contHomem()
      this.data = this.calculaGrafico(this.imcs)
      this.data2 = this.geraRosca()

    })

    this.items = [
      { label: 'Grafico de Situação', icon: 'fa fa-fw fa-bar-chart' },
      { label: 'Grafico de Sexo dos Paricipantes', icon: 'fa fa-fw fa-bar-chart' },

    ];
    this.activeItem = this.items[0];
   
  }

  removeRepetido(imcs: Imc[]) {
    let oldImc: Imc[] = Object.assign([{}], imcs)
    let j = 0
    for (let j = 0; j < oldImc.length; j++) {
      for (let i = j; i + 1 < oldImc.length; i++) {
        if (oldImc[j].pessoa.idpessoa == oldImc[i + 1].pessoa.idpessoa) {
          oldImc.splice(i + 1, 1)
        }
      }
    }
    return oldImc
  }

  activateMenu() {
    this.activeItem = this.menu['activeItem'];
  }

  print() {
    console.log(this.activeItem)
  }

  geraRosca() {
    return ({
      labels: ['Mulher', 'Homem',],
      datasets: [
        {
          data: [this.m, this.h],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
          ]
        }]
    });

  }

  contMulher() {
    let i = 0
    for (let imc of this.imcs)
      if (imc.pessoa.sexo == "Feminino")
        i++
    return(i)
  }
  contHomem() {
    let i = 0
    for (let imc of this.imcs) {
      if (imc.pessoa.sexo == "Masculino")
        i++
    }
    return(i)
  }

  calculaGrafico(imcs) {
    let mtMagro, magro, normal, gordo, obesoi, obesoii, obesoiii;
    mtMagro = magro = normal = gordo = obesoi = obesoii = obesoiii = 0
    for (let imc of imcs) {
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
