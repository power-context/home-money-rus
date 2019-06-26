import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UsersService } from 'src/app/shared/services/users.service';
import { User } from 'src/app/shared/models/user.model';
import { Message } from 'src/app/shared/models/message.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { fadeStateTrigger } from 'src/app/shared/animations/fade.animation';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'curat-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeStateTrigger]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message : Message;

  constructor(
    private usersService : UsersService,
    private authService : AuthService,
    private router : Router,
    private route : ActivatedRoute,
    private title : Title,
    private meta : Meta
  ) {
    title.setTitle('Вход в систему');
    meta.addTags([
      {name : 'keywords', content : 'логин, пароль'},
      {name : 'description', content : 'Страница входа в систему'}
    ])
  }

  ngOnInit() {
    this.message = new Message('danger', '');

    this.route.queryParams
    .subscribe((params : Params) => {
      if(params['nowYouCanLogin']){
        this.showMessage({text : 'Теперь Вы можете войти в систему', type: 'success'})
      } else if (params['accessDenided']){
        this.showMessage({text : 'Вам необходимо авторизоваться', type: 'warning'})
      }
    })

    this.form = new FormGroup({
      'email' : new FormControl('', [Validators.required, Validators.email]),
      'password' : new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  showMessage(message : Message){
    this.message = message;
    window.setTimeout(() => {
    this.message['text'] = '';
    }, 5000)
  }

  onSubmit(){
    const formData = this.form.value;
    this.usersService.getUserByEmail(formData.email)
    .subscribe((user : User) => {
      if(user) {
        if(user['password'] === formData.password){
          this.authService.login();
          window.localStorage.setItem('user', JSON.stringify(user))
          this.showMessage['text'] = '';  
          this.router.navigate(['/system', 'bill']);
        } else {
          this.showMessage({text : 'Wrong password', type: 'danger'})
        }
      } else{
        this.showMessage({text : 'Accept denided', type: 'danger'})
      }
    })
  }

}
