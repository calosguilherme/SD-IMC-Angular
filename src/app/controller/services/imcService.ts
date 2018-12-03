import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Imc } from '../../model/imc.model';

@Injectable()
export class ImcService {
  constructor(public http: HttpClient) {}

  getImc() {
    return this.http.get<Imc[]>(`https://sdbackend.herokuapp.com/imc`);
  }
  postImc(imc: Imc) {
    return this.http.post<Imc>(`https://sdbackend.herokuapp.com/imc`, JSON.stringify(imc));
  }

}
