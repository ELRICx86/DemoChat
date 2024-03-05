import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ChatService } from '../services/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit,OnDestroy {
sendMessage(content:string) {
  this.chatService.sendMessage(content);
}

  /**
   *
   */
  constructor(public chatService : ChatService) {
    
    
  }
  ngOnDestroy(): void {
    this.chatService.stopChatConnection();
    //console.log(this.chatService.onlineUsers);
  }
  @Output() logoutEmmiter = new EventEmitter<any> ();
  ngOnInit(): void {
    this.chatService.createChatConnection();
  }


  Logout(){
    this.logoutEmmiter.emit();
  }
}
