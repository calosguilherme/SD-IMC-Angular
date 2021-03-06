import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Pessoa } from 'src/app/model/pessoa.model';




@Injectable()
export class PessoaService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };


  constructor(public http: HttpClient) { }


  getAllPessoa() {
    return this.http.get<Pessoa[]>(`https://sdbackend.herokuapp.com/pessoa`);
  }
  postPessoa(pessoa: Pessoa) {
    return this.http.post<Pessoa>('https://sdbackend.herokuapp.com/pessoa', JSON.stringify(pessoa), this.httpOptions);
  }
  updatePessoa(pessoa: Pessoa) {
    console.log(pessoa)
    return this.http.post<Pessoa>('https://sdbackend.herokuapp.com/pessoa/update', JSON.stringify(pessoa), this.httpOptions);
  }
  deletePessoa(pessoa: Pessoa) {
    return this.http.post<Pessoa>('https://sdbackend.herokuapp.com/pessoa/drop', JSON.stringify({ cpf: pessoa.cpf }),  this.httpOptions);
  }

}
