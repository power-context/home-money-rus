import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, Params } from '@angular/router';

import { UsersService } from 'src/app/shared/services/users.service';
import { User } from 'src/app/shared/models/user.model';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'curat-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form : FormGroup;
  
  constructor(
    private usersService : UsersService,
    private route : Router,
    private title : Title,
    private meta : Meta
  ) {
    title.setTitle('Страница регистрации');
    meta.addTags([
      {name : 'keywords', content: 'регистрация'},
      {name : 'description', content: 'Страница регистрации'}
    ])
   }

  ngOnInit() {

  this.form = new FormGroup({
    'email' : new FormControl('', [Validators.required, Validators.email], this.forbiddenEmails.bind(this)),
    'password' : new FormControl('', [Validators.required, Validators.minLength(6)]),
    'name' : new FormControl('', [Validators.required]),
    'agree' : new FormControl(false, [Validators.requiredTrue]),
  })
  }

  onSubmit(){
    const {email, password, name} = this.form.value;
    const user = new User(email, password, name);

    this.usersService.createNewUser(user)
    .subscribe((params : Params) => {
      this.route.navigate(['/login'], {
        queryParams : {
          nowYouCanLogin : true
        }
      })
    })
  }

  forbiddenEmails(control: FormControl) : Promise<any>{
    return new Promise((resolve, reject) => {
      this.usersService.getUserByEmail(control.value)
      .subscribe((user : User) => {
        if(user){
          resolve({
            forbiddenEmail : true
          })
        } else {
          resolve(null)
        }
      })
    })
  }
}
