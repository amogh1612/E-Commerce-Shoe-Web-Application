import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { ApicallService } from '../apicall.service';
import { CommonModule, DOCUMENT } from '@angular/common';




@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit{

  public userform:FormGroup
  user : any = {
    email:"",
    password:""
  }
  router: any;

  userObject: any


  constructor(public formbuilder: FormBuilder, public api: ApicallService, @Inject(DOCUMENT) public document: Document) {
    this.userform = formbuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: ["", Validators.compose([Validators.required, Validators.maxLength(8)])]
    })

    
    


  }
  ngOnInit(): void {
    const localStorage = document.defaultView?.localStorage;

    if (localStorage){
      var userdetails = localStorage.getItem("userdetails");
      if (userdetails){
        var userObject = JSON.parse(userdetails)
        if(userObject.usertype === "Admin"){
          
          window.location.href = '/admindashboard'; 
         
       } else {
          window.location.href = '/';
       }
        
      }
    } 
  }



  signin(user: any) {
    if (this.userform.valid) {
      this.api.postData(this.user, "validateuser").then(
        (response: any) => {
          if (response.result === 1) {
            alert('Sign in successful');
            console.log('User type:', this.user.usertype);
          
            // cookies or local storage
            localStorage.setItem("userdetails",JSON.stringify(response.data[0]))

            // Redirect to dashboard or another page
            if(response.data[0].usertype === "Admin"){
               window.location.href = '/admindashboard'; 
              
            } else {
               window.location.href = '/';
            }
              // Adjust the path as necessary  {RESULT:1,}
            console.log(response)

          } else {
            alert('Invalid email or password');
          }
        },
        // (error) => {
        //   console.error('Error occurred during sign in:', error);
        // }
      );
    }
  }

  

}
