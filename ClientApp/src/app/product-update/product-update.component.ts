import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../Product';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { APIWebServiceService } from '../apiweb-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  constructor(private route: ActivatedRoute, private WebService: APIWebServiceService,private fb : FormBuilder,private router : Router) { }
  id: number;
  product: Product;
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);

    this.WebService.getProduct(this.id).subscribe((res: any) => {
      this.product = res;
      console.log(this.product);
      this.onFinish();
    });

  }

  onFinish() {
    this.productForm = this.fb.group(
      {
        id: [this.product.id],
        sku: [this.product.sku, Validators.required],
        productName: [this.product.productName, Validators.required],
        description: [this.product.description, Validators.required],
        supplier: [this.product.supplier, Validators.required]
      }
    );
  }

  productForm = this.fb.group(
    {
      id: [''],
      sku: ['',Validators.required],
      productName: ['', Validators.required],
      description: ['', Validators.required],
      supplier: ['', Validators.required]
    }
  );

  onSubmit() {

    console.log("On Submit Called");
    console.log(this.productForm.value, this.productForm.status);
    if (this.productForm.status == "VALID") {
      this.WebService.updateProduct(this.id, this.productForm.value)
        .subscribe(
          funct => {
            this.router.navigateByUrl('/product-list');
          }
        );
      console.log("Submitted");
    }
  }

}
