import { Component } from '@angular/core';
import { ApicallService } from '../apicall.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-adminproductdetails',
  templateUrl: './adminproductdetails.component.html',
  styleUrl: './adminproductdetails.component.css'
})
export class AdminproductdetailsComponent {
  

  public productform:FormGroup
  product : any = {
    "title": "",
    "description":"",
    "price":null,
    "discountPercentage":null,
    "rating": null,
    "stock": null,
    "brand": "",
    "category":"",
    "thumbnail":"assets/genericShoe.png",
    "images":["assets/genericShoe.png","assets/genericShoe.png"],
    "sizes": [""],
    "defaultsize":"",
    "currentImage":"assets/genericShoe.png",
    "featured":""

  }

// constructor(public api: ApicallService){
  
// }
Productlist: any[] = []

cartlist:any=[]
constructor(public api: ApicallService, public formbuilder:FormBuilder){
  
  this.getproducts()


  this.productform = formbuilder.group({
    title:["",Validators.compose([Validators.required])],
    description:["",Validators.compose([Validators.required])],
    price:[0,Validators.compose([Validators.required])],
    discountPercentage:[0,Validators.compose([Validators.required])],
    rating:[0.0,Validators.compose([Validators.required])],
    stock:[0,Validators.compose([Validators.required])],
    brand:["",Validators.compose([Validators.required])],
    category:["",Validators.compose([Validators.required])],
    thumbnail:[["assets/genericShoe.png"],Validators.compose([Validators.required])],
    images:[["assets/genericShoe.png"],Validators.compose([Validators.required])],
    sizes:[["0"],Validators.compose([Validators.required])],
    defaultsize:["0",Validators.compose([Validators.required])],
    currentImage:["assets/genericShoe.png",Validators.compose([Validators.required])],
    featured:["",Validators.compose([])]

  })

  
}

submit(){
  console.log(this.productform);
}

onImagesJsonChange(newJson: string) {
  try {
    this.product.images = JSON.parse(newJson);
  } catch (e) {
    // Handle JSON parse error (optional)
    console.error('Invalid JSON:', e);
  }
}

sizesJson: string = JSON.stringify(this.product.sizes, null, 2);

  // Watch for changes in the JSON textarea and update the product sizes
  onSizesJsonChange(newJson: string) {
    try {
      this.product.sizes = JSON.parse(newJson);
    } catch (e) {
      // Handle JSON parse error (optional)
      console.error('Invalid JSON:', e);
    }
  }

addproduct(){
  //console.log(this.product.images)
  //this.product.images = this.product.images.split(",")

  this.product.sizes = this.product.sizes.split(",")

  this.api.postData(this.product, 'addproduct').then(res => {
    var response: any = res
    if (response.result == 1){
      alert("New Product  "+this.product.title+" is succefully inserted.")
      this.getproducts()

    }
  })
}

editFlag = false
selectproduct(product: any){
  this.editFlag = true
  this.product = product
}


updateproduct(){
  this.api.postData(this.product, 'updateproduct').then(res => {
    var response: any = res
    if (response.result == 1){
      alert("Product  "+this.product.title+" is succefully updated.")
      this.getproducts()

    } else {
      alert("Something went wrong.")
    }
  })}


deleteproduct(){
  this.api.postData(this.product, 'deleteproduct').then(res => {
    var response: any = res
    if (response.result == 1){
      alert("Product  "+this.product.title+" is succefully deleted.")
      this.getproducts()
    }
  })}

  getproducts(){
        // API Service Call from AdminProductDetails
        this.api.postData({},"getproducts").then(res => {
          var response: any= res
          //console.log(res)
          this.Productlist = response.data
    
          this.Productlist.forEach(element => {
            element.images = JSON.parse(element.images)
            element.sizes = JSON.parse(element.sizes)
            
          });
        })
      
  }

  

}


// call get product api in landing page, but only select product with featured = Yes
// New API getfeaturedproduct and have to show on the landing page banner (first record)

// write getlatestproduct api and should select the latest 4 products, and show in landing page

// make proper checkout page
// calculate payable amount and add discount functionality
// can have a static 10% and 20% discount then make dynamic with the column discountPercentage
