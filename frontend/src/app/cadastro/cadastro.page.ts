import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  userForm: User = {
    name: '',
    email: '',
    password: '',
    password_repeat: '',
    id: 0,
    erro: ''
  };

  constructor(
    private userService: UserService,
    private router: Router,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    
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

  cadastro() {
    if(this.userForm.email.length != 0){
      if(this.userForm.name.length != 0){
        if(this.userForm.password.length != 0){
          if(this.userForm.password == this.userForm.password_repeat){
            
            this.userService.setUser(this.userForm).subscribe(r => {
              this.router.navigate(['/']);
            })
          }else{
            this.toast('As senhas devem ser iguais.','danger')
          }
        }else{
          this.toast('Insira a senha.','danger')
        }
      }else{
        this.toast('Insira o seu nome.','danger')
      }
    }else{
      this.toast('Insira o e-mail.','danger')
    }
  }

  cancel(){
    this.router.navigate(['/login']);
  }

}
