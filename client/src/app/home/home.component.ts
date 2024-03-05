import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '../services/chat.service';
import { error } from 'console';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  userform: FormGroup = new FormGroup([]);
  submitted : boolean = false;
  apiErrorMessages: string[] = [];
  openChat = false;
    UserName: any;
  /**
   *
   */
  constructor(private formBuilder : FormBuilder,private chatService: ChatService) {
    
    
  }
  
  ngOnInit(): void {
     this.initializeform();
  }

  initializeform(){
    this.userform = this.formBuilder.group({
      name: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(15)]]
    })
  }

  

  submitForm(){
    this.submitted = true;
    if(this.userform.valid){
      this.chatService.registerUser(this.userform.value).subscribe({
        next:() =>{
          this.openChat = true;
          console.log("openchat");
        },
        error: error =>{
          if(typeof(error.error)!=='object'){
            this.apiErrorMessages.push(`${this.UserName} is Taken`);
          }
        }
      })
    }
  }

  Close(){
    this.openChat = false;
  }


}
