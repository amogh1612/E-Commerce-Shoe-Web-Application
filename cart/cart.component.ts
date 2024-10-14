import { Component } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApicallService } from '../apicall.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  public cartlist: any[] = [];
  orderFlag = false;


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
    payableamount:0,
    orderstatus:"Placed"

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
      orderamount:['']



    })

  }


  
  localStorage = document.defaultView?.localStorage;


  ngOnInit() {

    const savedCartlist = localStorage.getItem("proddetails");
    if (savedCartlist) {
      this.cartlist = JSON.parse(savedCartlist);
      this.info.productList = JSON.stringify(this.cartlist);
      this.checkoutform.patchValue({ productList: this.info.productList });
    }
  }

  

  calculateTotalPrice(): number {
    var subtotal =  this.cartlist.reduce((total: number, item: any) => total + Number(item.totalPrice), 0);
    return subtotal 
  }

  calculateTax(): any{
    var subtotal = this.cartlist.reduce((total: number, item: any) => total + Number(item.totalPrice), 0);
    var discountprice = subtotal - (subtotal * 20 * 0.01)
    var tax = (discountprice * 0.04);

    this.info.orderamount = subtotal

    return parseFloat(tax.toFixed(2))
  }

  finalPrice(): number{
    var finalamount = this.calculateTotalPrice() - (this.calculateTotalPrice() * 20 * 0.01) + this.calculateTax()
    this.info.payableamount = finalamount
    return finalamount

  }
  
  

  
  

  checkout(){
    console.log(this.info);
    console.log(this.checkoutform);
    this.api.postData(this.info, 'addorder').then(res => {
      var response: any = res
      if (response.result == 1){
        console.log("New Order " + this.info.name + " is successfully inserted.")
        this.cartlist = []
        localStorage.setItem("proddetails",JSON.stringify(this.cartlist));
      }
    })

  }

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



  //add discount
}
