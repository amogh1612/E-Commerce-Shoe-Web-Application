import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApicallService } from '../apicall.service';


@Component({
  selector: 'app-adminusermanagement',
  templateUrl: './adminusermanagement.component.html',
  styleUrl: './adminusermanagement.component.css'
})

export class AdminusermanagementComponent {
  public userform:FormGroup
  user : any = {
    name:"",
    email:"",
    password:"",
    usertype:"",
  }

  Userlist: any[] = []

  constructor(public api: ApicallService, public formbuilder:FormBuilder){
    this.userform = formbuilder.group({
      name:["",Validators.compose([Validators.required])],
      email:["",Validators.compose([Validators.required, Validators.email])],
      password:["",Validators.compose([Validators.required])],
      usertype:["",Validators.compose([Validators.required])],



    })

    api.postData({},"getuser").then(res => {
      var response: any= res
      //console.log(res)
      this.Userlist = response.data

    })



  }

  
  

  addUser(){
  
    this.api.postData(this.user, 'addUser').then(res => {
      var response: any = res
      console.log(response.result)
      if (response.result == 1){
        alert("New User  "+this.user.name+" is succefully inserted.")
      }
    })
  }
  

}
