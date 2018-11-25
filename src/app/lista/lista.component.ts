import { Component, OnInit } from '@angular/core';
import {Pessoa} from '../model/pessoa.model.js';
import {PessoaService} from '../controller/services/pessoaService.js';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
})
export class ListaComponent implements OnInit {

  displayDialog: boolean;
  pessoa: Pessoa;

  selectedPessoa: Pessoa;

  newPessoa: boolean;

  pessoas: Pessoa[];

  cols: any[];

  constructor(private pessoaService: PessoaService) { }

  ngOnInit() {
      this.pessoaService.getAllPessoa().subscribe(pessoa => this.pessoas = pessoa);

      this.cols = [
          { field: 'cpf', header: 'CPF' },
          { field: 'nome', header: 'Nome' },
          { field: 'datanascimento', header: 'Data de Nascimento'},
          { field: 'peso', header: 'Peso' },
          { field: 'altura', header: 'altura' }
      ];
  }

  showDialogToAdd() {
      this.newPessoa = true;
      this.pessoa = {};
      this.displayDialog = true;
  }

  save() {
      const pessoas = [...this.pessoas];
      if (this.newPessoa) {
          pessoas.push(this.pessoa);
      } else {
          pessoas[this.pessoas.indexOf(this.selectedPessoa)] = this.pessoa;
      }
      this.pessoas = pessoas;
      this.pessoa = null;
      this.displayDialog = false;
  }

  delete() {
      const index = this.pessoas.indexOf(this.selectedPessoa);
      this.pessoas = this.pessoas.filter((val, i) => i !== index);
      this.pessoa = null;
      this.displayDialog = false;
  }

  onRowSelect(event) {
      this.newPessoa = false;
      this.pessoa = this.clonePessoa(event.data);
      this.displayDialog = true;
  }

  clonePessoa(p: Pessoa): Pessoa {
      const pessoa = {};
      // tslint:disable-next-line:forin
      for (const props in p) {
          pessoa[props] = p[props];
      }
      return pessoa;
  }
}
