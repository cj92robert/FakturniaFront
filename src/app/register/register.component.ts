import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../services/user.service';
import {UserRegister} from '../Models/UserRegister';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  constructor(private userService: UserService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  register(loginForm: NgForm): void {
    const user: UserRegister = new UserRegister(loginForm.value.username, loginForm.value.password, loginForm.value.email);
    this.userService.register(user).subscribe(e => {
      this.messageService.add({ severity: 'success', summary: 'Zarejstrowano', detail: 'Rejstracja użytkownika przebiegła pomyślnie'});
      this.router.navigate(['login']);
    }, e => {
      this.messageService.add({ severity: 'error', summary: 'Bład', detail: 'Nie udało się zarejstrować'});
      console.log(e.error.description);
      if (e.error.description != null) {
        this.messageService.add({severity: 'error', summary: 'Bład', detail: e.error.description});
      }
    });
  }
}
