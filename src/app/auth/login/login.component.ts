import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/Models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;

  constructor(public authService: AuthService) {
    this.user = {name: "", email: "", password:""};
   }

  ngOnInit(): void {
  }

  onLogin(form: NgForm){
    if(form.invalid){
      return;
    }
    this.authService.login(form.value.email, form.value.password)
  }

}
