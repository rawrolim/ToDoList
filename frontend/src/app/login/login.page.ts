import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
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
    public toastController: ToastController,
    private cookieService: CookieService,
    private storage: Storage
  ) { }

  async ngOnInit( ) {
    await this.storage.create();
    let id = await this.storage.get('id')
    if(id){
      this.cookieService.set('user_id',id);
      this.router.navigate(['/home']);
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

  logar(){
    if(this.userForm.email.length != 0){
      if(this.userForm.password.length != 0){
        this.userService.getUserLogin(this.userForm).subscribe(r => {
          if(r.email.length != 0){
            this.cookieService.set('user_id',r.id.toString());
            this.storage.set("id",r.id.toString());
            this.router.navigate(['/home']);
          }else{
            this.toast('Usuário e/ou senha incorretos.', 'danger')
          }
        })
      }else{
        this.toast('Insira a senha..','danger')
      }
    }else{
      this.toast('Insira o e-mail.','danger')
    }
  }
}
