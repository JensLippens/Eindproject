import { Categorie } from "./enums/categorie";
import { Verpakking } from "./enums/verpakking";

export interface Product {
  id: string;
  naam: string;
  omschrijving: string;
  prijs: number;
  verpakking: string;
  inhoud: number;
  categorie: string;
}
