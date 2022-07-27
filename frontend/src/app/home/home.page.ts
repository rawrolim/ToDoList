import { UserService } from './../services/user.service';
import { User } from './../models/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { Lista } from '../models/lista';
import { ListaService } from '../services/lista.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  Form: Lista;
  listaActive: Lista[];
  listaInactive: Lista[];
  lista_aux: Lista;
  UserLogged: User;

  constructor(
    private listaService: ListaService,
    private router: Router,
    public toastController: ToastController,
    private cookieService: CookieService,
    private storage: Storage,
    private userService: UserService
  ) {
  }

  async ngOnInit(){
    this.UserLogged = new User();
    this.storage.create();
    this.getInfoUser();
    await this.atualizaListas();
    this.trasformaDatas();
  }

  async atualizaListas(){
    this.listaService.getAllListaActive().subscribe(r => {
      this.listaActive = r;
    });
    this.listaService.getAllListaInactive().subscribe(r => {
      this.listaInactive = r;
    });
  }

  trasformaDatas(){
    if(this.listaActive !== undefined){
      for(let i=0;i<this.listaActive.length;i++){
        this.listaActive[i].data = new Date();
      }
    }
  }

  async toast(msg,color){
    const toast = await this.toastController.create({
      message: msg,
      color: color,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

  Check(id){
    this.lista_aux = new Lista();
    this.lista_aux.id = id
    console.log(this.lista_aux)
    this.listaService.getLista(this.lista_aux).subscribe(r => {
      this.lista_aux = r;
      if(this.lista_aux.status){
        this.lista_aux.status = false;
        this.toast('Tarefa marcada como pendente.','success')
      }else{
        this.toast('Tarefa marcada como finalizada.','success')
        this.lista_aux.status = true;
      }
  
      this.listaService.Update(this.lista_aux).subscribe(r => {
        this.atualizaListas(); 
      });
    })    
  }

  Edit(id){
    this.router.navigate(['/cadastro-item',id]);
  }

  Cadastrar(){
    this.router.navigate(['/cadastro-item']);
  }

  Delete(id){
    this.listaService.Delete(id).subscribe(r => {
      this.toast('Tarefa apagada com sucesso.','success')
      this.atualizaListas()
    })
  }

  LogOut(){
    this.storage.clear();
    this.cookieService.deleteAll();
    this.router.navigate(['/login']);
  }

  getInfoUser(){
    this.userService.getCurrentUser().subscribe(u => {
      this.UserLogged = u;
    });
  }

  ionViewDidEnter(){
    this.atualizaListas();
  }

}
