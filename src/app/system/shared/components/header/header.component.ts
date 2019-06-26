import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'curat-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  date : Date = new Date();
  user : User;

  constructor(
    private authService : AuthService,
    private router : Router
    ) { }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
  }

  onLogOut(){
    this.authService.logout();
    //this.router.navigate(['/login'])
    this.router.navigateByUrl('/login')
  }

}
