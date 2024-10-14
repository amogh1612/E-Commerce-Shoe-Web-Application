import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { ApicallService } from '../apicall.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  Userlist: any[] = [];

  public userform:FormGroup
  user : any = {
    name: "",
    email:"",
    password:"",
    userType:""
  }
  constructor(public formbuilder:FormBuilder, public api: ApicallService){
    this.userform = formbuilder.group({
      name:["",Validators.compose([Validators.required])],
      email:["",Validators.compose([Validators.required, Validators.email])],
      password:["",Validators.compose([Validators.required, Validators.maxLength(8)])],
      userType:["",Validators.compose([Validators.required])]

    })

  
  }
  //  Validators.pattern("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/"
  
  signup(){
    this.api.postData(this.user, 'addUser').then(res => {
      var response: any = res
      if (response.result == 1){
        console.log("New User " + this.user.name + " is successfully inserted.")
      }
    })
  }
}
