import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }


  listarEstados = () =>{
    return this.http.get<any>('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
  }

  listarCidades = (uf:string) =>{
    return this.http.get<any>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
  }
  
}
