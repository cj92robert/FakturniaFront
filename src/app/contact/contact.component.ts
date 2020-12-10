import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    document.querySelector('body').classList.add('contact');
  }

  ngOnDestroy(): void {
    document.querySelector('body').classList.remove('contact');
  }

  sendMessage(): void{
    this.messageService.add({ severity: 'success', summary: 'Udało się!', detail: 'Wiadomość wysłana'});
    // todo write logic
  }
}
