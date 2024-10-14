import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { ApicallService } from '../apicall.service';
import { CommonModule, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'

})



export class ProductsComponent {
  
  //Productlist:any=[];


 
  Productlist: any[] = [
    // {
    //   id: 1,
    //   title: "Nike React Infinity Run Flyknit",
    //   description: "A high-performance running shoe from Nike.",
    //   price: 160,
    //   discountPercentage: 0, // Add appropriate discount if needed
    //   rating: 4.5, // Add appropriate rating if needed
    //   stock: 3,
    //   brand: "NIKE",
    //   category: "RUNNING",
    //   thumbnail: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-665455a5-45de-40fb-945f-c1852b82400d/react-infinity-run-flyknit-mens-running-shoe-zX42Nc.jpg",
    //   images: ["https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-665455a5-45de-40fb-945f-c1852b82400d/react-infinity-run-flyknit-mens-running-shoe-zX42Nc.jpg","assets/reactNikeimg2.jpeg"],
    //   sizes: ["7", "8", "9", "10", "11"],
    //   defaultsize: "7",
    //   currentImage: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-665455a5-45de-40fb-945f-c1852b82400d/react-infinity-run-flyknit-mens-running-shoe-zX42Nc.jpg" // Set the initial 


    

  
  ];
  
  prodObject: any

  cartlist:any=[]

  // declared brandlist
  brandlist: any=[]

  selectedSize: string = '';
  selectedPrice: number = 0;
  selectedBrands: { [key: string]: boolean } = {
    Adidas: false,
    'Adidas Originals': true,
    Reebok: false,
    Nike: false,
    'Air Jordan': false,
  };

  constructor(public api: ApicallService, @Inject(DOCUMENT) private document: Document){
    const localStorage = document.defaultView?.localStorage;

    if (localStorage){
      var cartlist = localStorage.getItem("proddetails")
      if (cartlist){
        this.cartlist = JSON.parse(cartlist)
      }
    }

    // API Service Call from AdminProductDetails
    api.postData({},"getproducts").then(res => {
      var response: any= res
      //console.log(res)
      this.Productlist = response.data

      // get distinct brand name from the ProductList and then add to brandlist
      this.Productlist.forEach((product) => {
        this.brandlist.push(product.brand);
        let brandlist2 = [...new Set(this.brandlist)];
        this.brandlist = brandlist2;
    });
      console.log(this.brandlist)

      

      this.Productlist.forEach(element => {
        element.images = JSON.parse(element.images)
        element.sizes = JSON.parse(element.sizes)
        
      });
      
      this.filteredlist = JSON.parse(JSON.stringify(this.Productlist))




    })
    
    

    /*
    var obj = {
      sName:"Addiads 230",
      sBrand:"Addidas",
      sAvailablesize:["7","8","9"],
      sAvailablecolor:["gray","white","lightblue"],
      fPrice:250,
      fOfferprice:210
    }

    var obj2 = {
      sName:"Nike 100",
      sBrand:"Nike",
      sAvailablesize:["7","8","9"],
      sAvailablecolor:["gray","white","lightblue"],
      fPrice:250,
      fOfferprice:210
    }
    this.Productlist.push(obj);
    this.Productlist.push(obj);
    this.Productlist.push(obj);
    this.Productlist.push(obj);
    this.Productlist.push(obj2);
    */
    console.log(this.Productlist);

  }
  
checkmycart(product:any){
  const cartItem = this.cartlist.find((item:any) => item.id === product.id);
 return cartItem;
}

getProduct(product:any){
  const cartItem = this.cartlist.find((item:any) => item.id === product.id);
 return cartItem;
}

setdefault(product:any, size:any){
  const cartItem = this.filteredlist.find((item:any) => item.id === product.id);
  console.log(size)
  console.log(cartItem)
  cartItem.defaultSize = size;

}
  addcart(product: any) {
    const cartItem = this.cartlist.find((item:any) => item.id === product.id && item.size === product.defaultSize);


    if (cartItem) {
      cartItem.quantity += 1;
      cartItem.totalPrice = cartItem.quantity * product.price;

      // storing change in quantity 
      const localStorage = document.defaultView?.localStorage;
      if (localStorage) {
      
      localStorage.setItem("proddetails",JSON.stringify(this.cartlist))

    }
    } else {
      console.log(product)
      this.cartlist.push({
        id: product.id,
        title: product.title,
        quantity: 1,
        price: product.price,
        size: product.defaultSize,
        totalPrice: product.price
      });
      console.log(this.cartlist)
      

      const localStorage = document.defaultView?.localStorage;
      if (localStorage) {
      
      localStorage.setItem("proddetails",JSON.stringify(this.cartlist))

    }
  }



  }


  calculateTotalPrice(): number {
    return this.cartlist.reduce((total: number, item: any) => total + Number(item.totalPrice), 0);
  }
  

  getqty(product: any){
    // add local storage
    const localStorage = document.defaultView?.localStorage;
      if (localStorage) {
      
      localStorage.setItem("proddetails",JSON.stringify(this.cartlist))

    }
    const cartItem = this.cartlist.find((item:any) => item.id === product.id && item.size === product.defaultSize);

    
    if(cartItem){
      return cartItem.quantity;
    } else{
      return 0;
    }

    

  }

  minusqty(product:any){
    const cartItem = this.cartlist.find((item:any) => item.id === product.id);

    if (cartItem) {
      if(cartItem.quantity > 1){
        cartItem.quantity -= 1;
        cartItem.totalPrice = cartItem.quantity * product.price;
      }
      else{
        var index = this.cartlist.findIndex((x:any) => x.id === cartItem.id);
        this.cartlist.splice(index,1);
      }
      
    } else {
      this.cartlist.push({
        id: product.id,
        title: product.title,
        quantity: 1,
        price: product.price,
        totalPrice: product.price
      });
    }
    const localStorage = document.defaultView?.localStorage;
      if (localStorage) {
      
      localStorage.setItem("proddetails",JSON.stringify(this.cartlist))

    }
  }

  onMouseEnter(product: any): void {
    if (product.images.length > 1) {
      //product.currentImage = product.images[1];
    }
  }
  
  onMouseLeave(product: any): void {
    //product.currentImage = product.images[0];
  }
  

  filteredlist: any = []
  filter(){
    console.log(this.selectedPrice)
    console.log(this.selectedBrandList)
    console.log(this.selectedSize)
    // filter a productlist to derive or to get a distinct products with matching selected price (the price selected will be max price use <), selected brand (it is an array so check if it is in the array), and selected size. 
    // save this filtered list to a new varibale filtered list
    
    this.filteredlist = []; // Clear the filtered list

    for (let i = 0; i < this.Productlist.length; i++) {
        const product = this.Productlist[i];

        // Check if the product price is less than or equal to the selected price
        const priceMatch = product.price <= this.selectedPrice;

        // Check if the product brand is in the selectedBrandList
        const brandMatch = this.selectedBrandList.includes(product.brand);

        // Check if the product size matches the selected size
        const sizeMatch = product.size === this.selectedSize;

        // Add the product to filteredlist if all conditions are true
        if (priceMatch || brandMatch || sizeMatch) {
            this.filteredlist.push(product);
        }
    }

  }
  

  selectedBrandList: any[] = [];

selectbrand(brand: any) {
    // Check if the brand is already in selectedBrandList
    const index = this.selectedBrandList.indexOf(brand);

    if (index === -1) {
        // Brand is not in the list add it
        this.selectedBrandList.push(brand);
    } else {
        // Brand is in the list remove it
        this.selectedBrandList.splice(index, 1);
    }
}

 
}

// Create a table for orders. Should have email, phone number, etc. 
// Can get it from local storage because user should be logged in to purchase
// write python api to insert records into order table 
// implement event to add order to table for checkout button (call python api)
// add another page in admin management for order management where show all orders