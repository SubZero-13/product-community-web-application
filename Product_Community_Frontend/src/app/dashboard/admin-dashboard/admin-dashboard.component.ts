import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/dataTypes/product';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>();
  displayedColumns: string[] = ['productCode', 'productName', 'productBrand', 'productPrice', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  products: Product[] = [];

  constructor(private productService: ProductService, private _liveAnnouncer: LiveAnnouncer) {}

  ngOnInit() {
    this.getAllProducts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(
      (products: Product[] | string) => {
        if (Array.isArray(products)) {
          this.dataSource = new MatTableDataSource<Product>(products);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          // console.error('Failed to fetch products:', products);
        }
      },
      (error: any) => {
        // console.error('Error:', error);
      }
    );
  }
}
