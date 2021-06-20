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

  selectedVerp: string[] = [];
  verpakkingen: string[] = []

  @Input() alleProducten: Product[] = [];
  gefilterdeProducten: Product[] = [];
  @Output() nieuwFilterEvent = new EventEmitter<Product[]>();

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.categories = this.productService.categories;
    this.verpakkingen = this.productService.verpakkingen
  }

  onCatListChanged(list) {
    this.selectedCat = list.selectedOptions.selected.map(item => item.value);
  }

  onVerpListChanged(list) {
    this.selectedVerp = list.selectedOptions.selected.map(item => item.value);
  }

  filterProducten = (
    naamFilter: string,
    prijsMin: number,
    prijsMax: number,
    inhoudMin: number,
    inhoudMax: number,
    categorieFilter: string[],
    verpakkingFilter: string[]) => {

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
    if (verpakkingFilter.length > 0) {
      this.gefilterdeProducten = this.gefilterdeProducten.filter( p =>
        verpakkingFilter.includes(p.verpakking));
    }

    this.nieuwFilterEvent.emit(this.gefilterdeProducten);
  }
}
