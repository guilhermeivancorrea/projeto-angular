import { Component } from '@angular/core';
import { Usuario } from './modelo/Usuario';
import { ApiService } from './servicos/api.service';
import { UsuariosService } from './servicos/usuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  usuarios:Usuario[] = [];
  estados:any[] = [];
  cidades:any[] = [];
  estadoCounts:any[] = [];
  
  objUsuario:Usuario = new Usuario();

  btnVisivel:boolean = true;

  alerta:string = "";
  alertVisivel:boolean = false;

  indiceVetor:number = 0; 

  constructor(private servico:UsuariosService , private api:ApiService) { }

  ngOnInit(): void {
    this.listarUsuarios()
    this.listarUF()
    
  }

  listarUF = () =>{
    this.api.listarEstados().subscribe(retorno => this.estados = retorno)
  }

  listarCidades = (uf:string) =>{
    this.api.listarCidades(uf).subscribe(retorno => this.cidades = retorno)
  }

  listarUsuarios = () =>{
    this.servico.listar()
    .subscribe(retorno => this.usuarios = retorno);
   
    
  }

  validarEmail(email: string){
   
   if(email!=''){
    let regex = email.match(
      /^[a-z0-9.-]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if (regex) {
      return true
    } else {
      return false
    }
  }else{
    return false
  }
  }

  validaFone():boolean{

    if(this.objUsuario.telefone.length == 15) {
      return  true;
    }else {
      return false;
    }
  }

  validaCidade(){
    if(this.objUsuario.cidade != ''){
      return true;

    }else{
      return false;
    }
  }

  

  validaEstado(){
    if(this.objUsuario.uf != ''){
      return true;

    }else{
      return false;
    }
  }


  

  validaNome(nomeAtual?:string){

    if(this.objUsuario.nome!=''){

      var existe = false;
      for(var i = 0 ; i<this.usuarios.length;i++){
          if(this.usuarios[i].nome == this.objUsuario.nome){
            existe = true
            break;
          }
      }
      if(this.objUsuario.nome == nomeAtual ){
        existe = false
      }
      if(existe){
        return false
      }else {
        return true
      }

    }else{
      return false
    }
   
  }


  cadastrar = () =>{


    
    if(!this.validaNome()){
      this.alerta = "Campo nome não é valido"
    this.alertVisivel = true
    setTimeout(() => { 
      this.alertVisivel = false
    },2000)
    }else if(!this.validarEmail(this.objUsuario.email)){
      this.alerta = "Campo email não é valido"
    this.alertVisivel = true
    setTimeout(() => { 
      this.alertVisivel = false
    },2000)
    }else if(!this.validaEstado()){
      this.alerta = "Campo estado é obrigatório"
      this.alertVisivel = true
      setTimeout(() => { 
        this.alertVisivel = false
      },2000)
    }else if (!this.validaCidade()){

      this.alerta = "Campo cidade é obrigatório"
      this.alertVisivel = true
      setTimeout(() => { 
        this.alertVisivel = false
      },2000)
    }else if(!this.validaFone()){
      this.alerta = "Campo telefone inválido"
      this.alertVisivel = true
      setTimeout(() => { 
        this.alertVisivel = false
      },2000)
    }else{

      this.servico.cadastrar(this.objUsuario).subscribe(retorno =>this.usuarios.push(retorno))
      this.alerta = "Cadastrado com sucesso"
      this.alertVisivel = true
      setTimeout(() => { 
        this.alertVisivel = false
      },1000)
      this.cancelar()

    }
    
  }

  selecionar = (indice:number) =>{
    this.indiceVetor = this.usuarios.findIndex(objLinha => {return objLinha.id === indice})
     if(this.objUsuario.cidade != this.usuarios[this.indiceVetor].cidade){
      this.listarCidades(this.usuarios[this.indiceVetor].uf)
     }
 
    this.servico.getUsuario(indice).subscribe(retorno => this.objUsuario = retorno)
    
    this.btnVisivel = false;

  }

  alterar = () => {

      if(!this.validaNome(this.usuarios[this.indiceVetor].nome)){
      this.alerta = "Campo nome não é valido"
    this.alertVisivel = true
    setTimeout(() => { 
      this.alertVisivel = false
    },2000)
    }else if(!this.validarEmail){
      this.alerta = "Campo email não é valido"
    this.alertVisivel = true
    setTimeout(() => { 
      this.alertVisivel = false
    },2000)
    }else if(!this.validaEstado()){
      this.alerta = "Campo estado é obrigatório"
      this.alertVisivel = true
      setTimeout(() => { 
        this.alertVisivel = false
      },2000)
    }else if (!this.validaCidade()){

      this.alerta = "Campo cidade é obrigatório"
      this.alertVisivel = true
      setTimeout(() => { 
        this.alertVisivel = false
      },2000)
    }else if(!this.validaFone()){
      this.alerta = "Campo telefone inválido"
      this.alertVisivel = true
      setTimeout(() => { 
        this.alertVisivel = false
      },2000)
    }else{

      this.servico.putUsuario(this.objUsuario)
      .subscribe(retorno => {
         this.usuarios[this.indiceVetor] = retorno
      })
       this.alerta = "Alterado com sucesso"
       this.alertVisivel = true
       setTimeout(() => { 
         this.alertVisivel = false
       },1000)
       this.cancelar()

    }

   

  }

  deletar = () =>{

    this.servico.deleteUsuario(this.objUsuario)
    .subscribe(retorno => {
      this.usuarios.splice(this.indiceVetor,1)
    })
    this.alerta = "Deletado com sucesso"
    this.alertVisivel = true
    setTimeout(() => { 
      this.alertVisivel = false
    },1000)
    this.cancelar()

  }

  cancelar = () =>{

    this.btnVisivel = true;
    this.objUsuario.id = 0;
    this.objUsuario.nome = '';
    this.objUsuario.email= '';
    this.objUsuario.uf = '';
    this.objUsuario.cidade = '';
    this.objUsuario.telefone = '';
    
  }

  filtrar(){

    var estadosValidos:string[] = [];
    for(var i = 0;i<this.usuarios.length;i++){

      estadosValidos.push(this.usuarios[i].uf)
    }
    estadosValidos = [...new Set(estadosValidos)]
    
    this.estadoCounts = [];

    for(var i = 0;i<estadosValidos.length;i++){
      
      this.estadoCounts.push(
        {
          "estado" : estadosValidos[i],
          "count" : this.contarEstado(estadosValidos[i])
        }
      )
    }
  }

  contarEstado(sigla:string){

    var contador:number = 0;
    for(var i = 0;i<this.usuarios.length;i++){
      if(this.usuarios[i].uf == sigla){
        contador++
      }
    }
    return contador
  }

}
