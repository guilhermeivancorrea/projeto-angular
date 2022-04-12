import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../modelo/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http:HttpClient) { }

  listar():Observable<Usuario[]>{

    return this.http.get<Usuario[]>('http://localhost:3000/usuario');
  }
  
  cadastrar(u:Usuario):Observable<Usuario>{
  
    return this.http.post<Usuario>('http://localhost:3000/usuario',u);
  }
  
  getUsuario(indice:number):Observable<Usuario>{
  
    return this.http.get<Usuario>('http://localhost:3000/usuario/'+indice);
  }
  
  putUsuario(u:Usuario):Observable<Usuario>{
  
    return this.http.put<Usuario>('http://localhost:3000/usuario/'+u.id,u);
  }
  
  deleteUsuario(u:Usuario):Observable<Usuario>{
  
    return this.http.delete<Usuario>('http://localhost:3000/usuario/'+u.id);
  }

}
