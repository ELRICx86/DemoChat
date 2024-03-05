import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/user';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  myName : string ="";
  apiUrl : string ="https://localhost:7288";

  onlineUsers : any [] =[];
  
  private chatConnection?: HubConnection;
  constructor(private http : HttpClient) {

   }

   registerUser(user : User){
    return this.http.post(`${this.apiUrl}/api/Chat/register-user`,user, {responseType: 'text'});
   }

   createChatConnection(){
      this.chatConnection = new HubConnectionBuilder().withUrl(`${this.apiUrl}/hubs/chat`).withAutomaticReconnect().build();

      this.chatConnection.start().catch(error =>{
        console.log(error);
      });

      this.chatConnection.on("UserConnected",()=>{
        console.log(`${this.myName} has joined the chat`);
        this.addUserConnectionId();
      })

      this.chatConnection.on("OnlineUsers",(onlineUsers)=>{
        
        this.onlineUsers = [...onlineUsers];
        //console.log(onlineUsers);
      })
   }

   stopChatConnection(){
    this.chatConnection?.stop().catch(error =>{
      console.log(error);
    })
   }

   async addUserConnectionId(){
    return this.chatConnection?.invoke("addUserConnectionId", this.myName).catch(error =>{
      console.log(error);
    })
   }
}
