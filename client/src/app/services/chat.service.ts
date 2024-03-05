import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  apiUrl : string ="https://localhost:7288";

  constructor(private http : HttpClient) {

   }

   registerUser(user : User){
    return this.http.post(`${this.apiUrl}/api/Chat/register-user`,user, {responseType: 'text'});
   }
}
