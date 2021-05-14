import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  selectedCat: string[] = [];
  categories: string[] = [];

  @Input() alleProducten: Product[] = [];
  gefilterdeProducten: Product[] = [];
  @Output() nieuwFilterEvent = new EventEmitter<Product[]>();

  constructor(public productService: ProductService) { }

 /*  pasFiltersToe (value: Product[]) {
    this.nieuwFilterEvent.emit(value);
  } */

  ngOnInit(): void {
    this.categories = this.productService.categories;
  }

  onListChanged(list) {
    this.selectedCat = list.selectedOptions.selected.map(item => item.value);
  }

  filterProducten = (
    naamFilter: string,
    prijsMin: number,
    prijsMax: number,
    inhoudMin: number,
    inhoudMax: number,
    categorieFilter: string[]) => {

    this.gefilterdeProducten = this.alleProducten;
    if (naamFilter && naamFilter.trim().length !== 0) { // check voor whitespace-string
      naamFilter = naamFilter.trim();
      this.gefilterdeProducten = this.gefilterdeProducten.filter( p =>
        p.naam.toLowerCase().includes(naamFilter.toLowerCase()));
    }
    if (prijsMin) {
      this.gefilterdeProducten = this.gefilterdeProducten.filter( p =>
        p.prijs >= prijsMin);
    }
    if (prijsMax) {
      this.gefilterdeProducten = this.gefilterdeProducten.filter( p =>
        p.prijs <= prijsMax);
    }
    if (inhoudMin) {
      this.gefilterdeProducten = this.gefilterdeProducten.filter( p =>
        p.inhoud >= inhoudMin);
    }
    if (inhoudMax) {
      this.gefilterdeProducten = this.gefilterdeProducten.filter( p =>
        p.inhoud <= inhoudMax);
    }
    if (categorieFilter.length > 0) {
      this.gefilterdeProducten = this.gefilterdeProducten.filter( p =>
        categorieFilter.includes(p.categorie));
    }

    this.nieuwFilterEvent.emit(this.gefilterdeProducten);
    //console.log(this.alleProducten);

    /*
      this.gefilterdeProducten = this.alleProducten.filter( p =>
      p.naam.includes(naamFilter) &&
      p.prijs >= prijsMin &&
      p.prijs <= prijsMax &&
      p.inhoud >= inhoudMin &&
      p.inhoud <= inhoudMax &&
      categorie.includes(p.categorie)
    ) */


  }
}
