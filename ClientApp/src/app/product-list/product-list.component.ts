import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { Product } from '../Product';
import { APIWebServiceService } from '../apiweb-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  private products = [];
  public isLoading: boolean = true;
  displayedColumns: string[] = ['id', 'sku', 'productName', 'description', 'supplier','actions'];
  dataSource = new MatTableDataSource<Product>(this.products);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private WebService: APIWebServiceService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private router: Router) {
    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-delete-24px.svg'));
    iconRegistry.addSvgIcon(
      'update',
      sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-update-24px.svg'));
    this.WebService.get_products().subscribe((res: any[]) => {
      this.products = res;
      console.log(this.products);
      this.isLoading = false;
      this.dataSource = new MatTableDataSource<Product>(this.products);
      this.dataSource.paginator = this.paginator;
      this.dataSource = new MatTableDataSource<Product>(this.products);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnInit() {
    //this.dataSource.paginator = this.paginator;
  }

  deleteProduct(id: number) {
    console.log("delete started ")
    this.WebService.deleteProduct(id).subscribe(
      func => {
        console.log('deleted ended');
        this.WebService.get_products().subscribe((res: any[]) => {
          this.products = res;
          console.log(this.products);
          this.dataSource = new MatTableDataSource<Product>(this.products);
          this.dataSource.paginator = this.paginator;
        });
      }
    );
    console.log("deleted : " + id)
  }

  updateProduct(id: number) {
    this.router.navigateByUrl('/product-update/' + id);
  }

}
