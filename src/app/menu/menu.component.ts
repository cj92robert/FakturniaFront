import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  isNotLogged(): boolean {
    return localStorage.getItem('user') == null;
  }

  logOut(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.messageService.add({ severity: 'info', summary: 'Informacja', detail: 'Wylogowano'});
    this.router.navigate(['/start']);
  }
}
