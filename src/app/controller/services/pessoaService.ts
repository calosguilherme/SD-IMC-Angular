import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Pessoa } from '../../model/pessoa.model';

@Injectable()
export class PessoaService {
  constructor(public http: HttpClient) {}

  getAllPessoa() {
    return this.http.get<Pessoa[]>(`https://sdbackend.herokuapp.com/pessoa`);
  }
}
