import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { ApicallService } from '../apicall.service';
import { DOCUMENT } from '@angular/common';
import { Renderer2 } from '@angular/core';



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  orderFlag = false;
  public cartlist: any[] = [];


  localStorage = document.defaultView?.localStorage;




  public checkoutform:FormGroup
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
    cvv:"",
    cartlist:[],
    orderamount:0,
    discount:0,
    payableamount:0

  }

  

  constructor(public formbuilder:FormBuilder, public api: ApicallService){
    this.checkoutform = formbuilder.group({
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
      productList: [''],
      orderamount:['']



    })

  }

  formatProductList(products: any[]): string {
    return products.map(product => `${product.title} - Quantity: ${product.quantity}`).join('\n');
  }

  ngOnInit() {
    const savedCartlist = localStorage.getItem("proddetails");
    if (savedCartlist) {
      this.cartlist = JSON.parse(savedCartlist);
      this.info.productList = this.formatProductList(this.cartlist);
      this.checkoutForm.patchValue({ productList: this.info.productList });
    }
  }
  

  checkout(){
    console.log(this.info);
    console.log(this.checkoutform);
    this.api.postData(this.info, 'addorder').then(res => {
      var response: any = res
      if (response.result == 1){
        console.log("New Order " + this.info.name + " is successfully inserted.")
      }
    })

  }


   //ngOnInit() {
  //   // const form = document.getElementById('checkout-form') as HTMLFormElement;
  //   // const notification = document.getElementById('notification') as HTMLDivElement;

  //   // form.addEventListener('submit', (event) => {
  //   //     event.preventDefault(); // Prevent the default form submission

  //       // Display the notification
  //       notification.classList.remove('hidden');

  //       // Redirect to the landing page after a delay
  //       setTimeout(() => {
  //           window.location.href = '/landingpage'; // Replace 'landing.html' with the path to your landing page
  //       }, 3000); // 3-second delay
  //   });
 // }

  submit(){
        //event.preventDefault(); // Prevent the default form submission

        // Display the notification
        //notification.classList.remove('hidden');
        this.orderFlag = true;

        // Redirect to the landing page after a delay
        setTimeout(() => {
            window.location.href = '/landingpage'; // Replace 'landing.html' with the path to your landing page
        }, 3000); // 3-second delay

  }
}

// --standalone=true
