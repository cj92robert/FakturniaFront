import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UsernameAndPassword} from '../Models/UsernameAndPassword';
import {Router} from '@angular/router';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
  status = '';
  constructor(private userService: UserService, private router: Router, private messageService: MessageService) { }

  ngAfterViewInit(): void {
       document.querySelector('body').classList.add('login');
    }
  ngOnInit(): void {
  }

  loginUser(loginForm: NgForm): void{
    console.log(loginForm.value);
    this.userService.login(new UsernameAndPassword(loginForm.value.username, loginForm.value.password)).subscribe((resp) => {
      localStorage.setItem('user', loginForm.value.username);
      this.status = 'sukces';
      this.messageService.add({ severity: 'success', summary: 'Sukces', detail: 'Logowanie przebiegło pomyślnie'});
      this.router.navigate(['/start']);
    }, () => {
      this.status = 'Błedne hasło lub login';
      this.messageService.add({ severity: 'error', summary: 'Blad', detail: 'Nie udało sie zalogować'});
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      }
    );
  }

  ngOnDestroy(): void {
    document.querySelector('body').classList.remove('login');
  }



}
