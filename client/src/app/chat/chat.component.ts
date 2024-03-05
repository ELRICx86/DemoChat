import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  @Output() logoutEmmiter = new EventEmitter<any> ();
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  Logout(){
    this.logoutEmmiter.emit();
  }
}
