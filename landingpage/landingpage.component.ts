import { Component, Inject } from '@angular/core';
import { ApicallService } from '../apicall.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'
})
export class LandingpageComponent {
  filteredlist: any[] = []
  product: any
  index = 0

  constructor(public api: ApicallService, @Inject(DOCUMENT) private document: Document){
    api.postData({},"getfeaturedproduct").then(res => {
      var response: any= res
      //console.log(res)
      this.filteredlist = response.data

      // first featured product
      this.product = this.filteredlist[this.index]


    });


    // this.filter()
    console.log("filtered" + this.filteredlist)
    // console.log("prodcuts" + this.Productlist)

    
  }


  // filteredlist: any = []
  // filter(){
    

  //   this.filteredlist = []; 

  //   for (let i = 0; i < this.Productlist.length; i++) {
  //       const product = this.Productlist[i];
  //       if(product.featured === "Yes"){
  //         this.filteredlist.push(product);
  //         break
  //       }        
  //   }

  // }

  next(){
    this.index += 1
    this.product = this.filteredlist[this.index]
  }

  
  prev(){
    if (this.index > 0){
      this.index -= 1
      this.product = this.filteredlist[this.index]
    }
    
  }

  // add previous 
}
