import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',

})
export class RelatoriosComponent implements OnInit {
  items: MenuItem[];
  activeItem: MenuItem;
  data: any;

  constructor() {
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    }
  }

  ngOnInit() {
    this.items = [
      { label: 'Stats', icon: 'fa fa-fw fa-bar-chart' },
      { label: 'Calendar', icon: 'fa fa-fw fa-calendar' },
      { label: 'Documentation', icon: 'fa fa-fw fa-book' },
      { label: 'Support', icon: 'fa fa-fw fa-support' },
      { label: 'Social', icon: 'fa fa-fw fa-twitter' }
    ];

    this.activeItem = this.items[2];




  }
  

  update(event: Event) {
    this.data = event
  }

}
