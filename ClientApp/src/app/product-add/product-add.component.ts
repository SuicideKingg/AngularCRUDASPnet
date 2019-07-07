import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { APIWebServiceService } from '../apiweb-service.service';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  constructor(private fb: FormBuilder, private WebService: APIWebServiceService, private router: Router) { }

  productForm = this.fb.group(
    {
      sku: ['', Validators.required],
      productName: ['', Validators.required],
      description: ['', Validators.required],
      supplier: ['', Validators.required]
    }
  );

  public disabled: boolean = false;

  ngOnInit() {

  }

  onSubmit() {
    if (this.productForm.status == "VALID") {
      if (!this.disabled) {
        this.disabled = true;
        console.log("On Submit Called");
        console.log(this.productForm.value, this.productForm.status);
        if (this.productForm.status == "VALID") {
          this.WebService.addProduct(this.productForm.value)
            .subscribe(
              func => {
                this.router.navigateByUrl('/product-list');
              }
            );
          console.log("Submitted");
        }
      }
    }
  }

}
