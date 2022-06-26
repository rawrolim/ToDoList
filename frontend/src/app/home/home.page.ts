import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { CookieService } from 'ngx-cookie-service';
import { Lista } from '../models/lista';
import { ListaService } from '../services/lista.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  @ViewChild(IonModal) modal: IonModal;

  Form: Lista
  listaActive: Lista[]
  listaInactive: Lista[]
  lista_aux: Lista

  constructor(
    private listaService: ListaService,
    private router: Router,
    public toastController: ToastController,
    private cookieService: CookieService
  ) {}

  ngOnInit(){
    this.Form = this.limparForm();
    this.lista_aux = this.limparForm();
    this.atualizaListas();
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

  salvar(){
    this.Form.user_id = Number(this.cookieService.get('user_id'))
    if(this.Form.descricao.length != 0){
      if(this.Form.data != undefined){
        if(this.Form.id){
          this.listaService.Update(this.Form).subscribe(r => {
            this.toast('Tarefa editada a lista com sucesso.','success')
            this.Form = this.limparForm()
            this.atualizaListas()
          })
        }else{
          this.listaService.setLista(this.Form).subscribe(r => {
            this.toast('Tarefa adicionada a lista com sucesso.','success')
            this.Form = this.limparForm()
            this.atualizaListas()
          })
        }
      }else{
        this.toast('Selecione um prazo.','danger')
      }
    }else{
      this.toast('Insira uma descrição.','danger')
    }
  }

  atualizaListas(){
    this.listaService.getAllListaActive().subscribe(r => {
      this.listaActive = r
    })
    this.listaService.getAllListaInactive().subscribe(r => {
      this.listaInactive = r
    })
  }

  Check(id){
    this.lista_aux.id = id
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
    this.Form = this.limparForm()
    this.Form.id = id
    this.listaService.getLista(this.Form).subscribe(r => {
      this.Form = r
    })
  }

  Delete(id){
    this.listaService.Delete(id).subscribe(r => {
      this.toast('Tarefa apagada com sucesso.','success')
      this.atualizaListas()
    })
  }

  limparForm(){
    let Form: Lista = {
      id: 0,
      descricao: '',
      user_id: 0,
      data: undefined,
      status: false,
      erro: '',
    }
    return Form
  }

  Cancelar(){
    this.Form = this.limparForm();
  }

}
