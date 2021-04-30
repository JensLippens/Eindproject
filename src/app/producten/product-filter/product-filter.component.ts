import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  selectedCat: string[];
  categories: string[] = ["gelaat", "haar", "douche", "makeup", "parfum"];

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.categories = this.productService.categories;
  }

  onListChanged(list){
    this.selectedCat = list.selectedOptions.selected.map(item => item.value);
}
  filterProducten = (naam: string, prijsMin: number, prijsMax: number, categorie: string[]) => {

  }
}
