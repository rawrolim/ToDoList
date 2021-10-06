import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Lista } from '../models/lista';
import { ListaService } from '../services/lista.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  Form: Lista = {
    id: 0,
    descricao: '',
    user_id: 0,
    data: undefined,
    status: false,
    erro: ''
  }
  lista: Lista[]

  constructor(
    private listaService: ListaService,
    private router: Router,
    public toastController: ToastController,
    private cookieService: CookieService
  ) {}

  async toast(msg,color){
    const toast = await this.toastController.create({
      message: msg,
      color: color,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }


  salvar(){
    this.Form.user_id = Number(this.cookieService.get('user_id'))

    if(this.Form.descricao.length != 0){
      if(this.Form.data.toString().length != 0){
        this.listaService.setLista(this.Form).subscribe(r => {
          this.toast('Tarefa adicionada a lista com sucesso.','success')
          this.Form.data = undefined
          this.Form.status = false
          this.Form.descricao = ''
          this.atualizaLista()
        })
      }else{
        this.toast('Selecione um prazo.','danger')
      }
    }else{
      this.toast('Insira uma descrição.','danger')
    }
  }

  editar(id){
    alert(id)
  }

  ngOnInit(){
    this.atualizaLista()
  }

  atualizaLista(){
    this.listaService.getAllLista().subscribe(r => {
      this.lista = r
    })
  }
}
