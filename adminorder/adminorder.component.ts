import { Component } from '@angular/core';
import { ApicallService } from '../apicall.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-adminorder',
  templateUrl: './adminorder.component.html',
  styleUrl: './adminorder.component.css'
})
export class AdminorderComponent {

  orderlist: any[] = []


  public productform:FormGroup
  info : any = {
    name:"",
    email:"",
    address:"",
    city:"",
    state:"",
    zip:"",
    nameCard:"",
    cardNum:"",
    expDate:"",
    cvv:""

  }
  order : any = {
    "name":"",
    "email":"",
    "address":"",
    "city":"",
    "state":"",
    "zip":"",
    "nameCard":"",
    "cardNum":"",
    "expDate":"",
    "cvv":"",
    "product_list":""

  }



  constructor(public api: ApicallService, public formbuilder:FormBuilder){
    this.productform = formbuilder.group({
      name:["",Validators.compose([Validators.required])],
      email:["",Validators.compose([Validators.required, Validators.email])],
      address:["",Validators.compose([Validators.required])],
      city:["",Validators.compose([Validators.required])],
      state:["",Validators.compose([Validators.required])],
      zip:["",Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(5)])],
      nameCard:["",Validators.compose([Validators.required])],
      cardNum:["",Validators.compose([Validators.required, Validators.minLength(16), Validators.maxLength(16)])],
      expDate:[],
// expDate already validated
      cvv:["",Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(3)])],
      productList: ['']
    })

    api.postData({},"getorder").then(res => {
      var response: any= res
      //console.log(res)
      this.orderlist = response.data

    })
  }

  editFlag = false
selectorder(order: any){
  this.editFlag = true
  this.order = order
  
  this.order.products = JSON.parse(this.order.products)
  console.log(this.order)
}


  updateorder(){
    this.api.postData(this.order, 'updateorder').then(res => {
      var response: any = res
      if (response.result == 1){
        alert("Order  "+this.order.id+" is succefully updated.")
        this.getorder()
  
      } else {
        alert("Something went wrong.")
      }
    })

  }

  deleteorder(){
    

  }

  getorder(){
    // API Service Call from AdminProductDetails
    this.api.postData({},"getproducts").then(res => {
      var response: any= res
      //console.log(res)
      this.orderlist = response.data

      this.orderlist.forEach(element => {
        element.images = JSON.parse(element.images)
        element.sizes = JSON.parse(element.sizes)
        
      });
    })
  
}

confirm(){
  this.order.orderstatus = "Confirmed"
  this.api.postData(this.order, 'updateorderstatus').then(res => {
    var response: any = res
    if (response.result == 1){
      alert("Order  "+this.order.id+" is succefully updated.")

    } else {
      alert("Something went wrong.")
    }
  })
}

shipped(){
  this.order.orderstatus = "Shipped"

  this.api.postData(this.order, 'updateorderstatus').then(res => {
    var response: any = res
    if (response.result == 1){
      alert("Order  "+this.order.id+" is succefully updated.")

    } else {
      alert("Something went wrong.")
    }
  })


}

delivered(){  
  this.order.orderstatus = "Delivered"

  this.api.postData(this.order, 'updateorderstatus').then(res => {
    var response: any = res
    if (response.result == 1){
      alert("Order  "+this.order.id+" is succefully updated.")

    } else {
      alert("Something went wrong.")
    }
  })


}
  


}
