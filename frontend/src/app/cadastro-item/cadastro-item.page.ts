import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { Lista } from '../models/lista';
import { User } from '../models/user';
import { ListaService } from '../services/lista.service';

@Component({
  selector: 'app-cadastro-item',
  templateUrl: './cadastro-item.page.html',
  styleUrls: ['./cadastro-item.page.scss'],
})
export class CadastroItemPage implements OnInit {
  Form: Lista;
  UserLogged: User;

  constructor(
    private router: Router,
    private routerActvated: ActivatedRoute,
    public toastController: ToastController,
    private cookieService: CookieService,
    private listaService: ListaService,
  ) { }

  ngOnInit() {
    this.Form = this.limparForm();
    if(this.routerActvated.snapshot.paramMap.has("id")){
      this.Form.id = Number(this.routerActvated.snapshot.paramMap.get('id'));
      this.getInfoForm();
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

  salvar(){
    this.Form.user_id = Number(this.cookieService.get('user_id'));
    if(this.Form.descricao.length != 0){
      if(this.Form.data != undefined){
        if(this.Form.id){
          this.listaService.Update(this.Form).subscribe(r => {
            this.toast('Tarefa editada a lista com sucesso.','success');
            this.router.navigate(['/home']);
          });
        }else{
          this.listaService.setLista(this.Form).subscribe(r => {
            this.toast('Tarefa adicionada a lista com sucesso.','success');
            this.router.navigate(['/home']);
          });
        }
      }else{
        this.toast('Selecione um prazo.','danger');
      }
    }else{
      this.toast('Insira uma descrição.','danger');
    }
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
    this.router.navigate(['/home']);
  }

  getInfoForm(){
    this.listaService.getLista(this.Form).subscribe(r => {
      this.Form = r
    })
  }
}
