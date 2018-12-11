import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../model/pessoa.model.js';
import { PessoaService } from '../controller/services/pessoaService';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {
  displayDialog: boolean;
  pessoa: Pessoa;

  selectedPessoa: Pessoa;

  newPessoa: boolean;

  pessoas: Pessoa[];

  cols: any[];

  constructor(
    private pessoaService: PessoaService,
    private router: Router) { }

  ngOnInit() {
    this.pessoaService
      .getAllPessoa()
      .subscribe(pessoa => (this.pessoas = pessoa));

    this.cols = [
      { field: 'cpf', header: 'CPF' },
      { field: 'nome', header: 'Nome' },
      { field: 'datanascimento', header: 'Data de Nascimento' },
      { field: 'peso', header: 'Peso' },
      { field: 'altura', header: 'Altura' },
      { field: 'sexo', header: 'Sexo' }
    ];
  }

  showDialogToAdd() {
    this.newPessoa = true;
    this.pessoa = new Pessoa;
    this.displayDialog = true;
  }

  save() {
    const pessoas = [...this.pessoas];
    let result;
    if (this.newPessoa) {
      pessoas.push(this.pessoa);
      result = this.pessoaService.postPessoa(this.pessoa)
        .subscribe(dados => console.log(dados))
      this.router.navigate(['/lista'])
    } else {
      pessoas[this.pessoas.indexOf(this.selectedPessoa)] = this.pessoa;
      result = this.pessoaService.updatePessoa(this.pessoa)
        .subscribe(dados => console.log(dados))
      this.router.navigate(['/lista'])
    }
    this.pessoas = pessoas;
    this.pessoa = null;
    this.displayDialog = false;
  }

  delete() {
    let result;
    const index = this.pessoas.indexOf(this.selectedPessoa);
    this.pessoas = this.pessoas.filter((val, i) => i !== index);
    result = this.pessoaService.deletePessoa(this.pessoa)
      .subscribe(dados => console.log(dados))
    this.router.navigate(['/lista'])
    this.pessoa = null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newPessoa = false;
    this.pessoa = this.clonePessoa(event.data);
    this.displayDialog = true;
  }

  clonePessoa(p: Pessoa): Pessoa {
    const pessoa = new Pessoa;
    // tslint:disable-next-line:forin
    for (const props in p) {
      pessoa[props] = p[props];
    }
    return pessoa;
  }
}
