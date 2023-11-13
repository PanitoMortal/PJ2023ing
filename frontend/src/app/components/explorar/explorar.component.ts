import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendserviceService } from 'src/app/services/httpAccess/backendservice.service';
import { query } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';
import { CargarScriptsService } from 'src/app/services/cargar-scripts.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild, inject} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatIconModule} from '@angular/material/icon';
import {NgFor, AsyncPipe} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {LiveAnnouncer} from '@angular/cdk/a11y';

@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.component.html',
  styleUrls: ['./explorar.component.scss']
})
export class ExplorarComponent {
  id: number = 0;
  info: any = [];
  searchByIngredient: any = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  ingredientCtrl = new FormControl('');
  stringIngredients: string = '';
  ingredients: string[] = [];
  filteredIngredients: Observable<string[]>;
  allIngredients: string[] = ["Olive Oil","Salt","Pepper","Garlic","Onion","Tomato","Bell Pepper","Parsley","Bay Leaf","Oregano","Thyme","Cumin","Paprika","Cloves","Nutmeg","Vinegar","Mustard",
  "Honey","Lemon","Ginger","Cinnamon","Turmeric","Coriander","Basil","Mint","Chives","Red Pepper Flakes","Soy Sauce","Worcestershire Sauce","Olives","Capers","Pine Nuts","Almonds","Raisins","Sesame Oil","Fish Sauce",
  "Chicken Broth","Vegetable Broth","Coconut Milk","Heavy Cream","Parmesan Cheese","Mozzarella Cheese","Cheddar Cheese","Feta Cheese","Eggs","Chicken","Beef","Pork","Turkey","Fish","Shrimp","Lobster","Avocado","Carrot",
  "Zucchini","Broccoli","Spinach","Lettuce","Cabbage","Potatoes","Sweet Potatoes","Rice","Pasta","Bread","Flour","Sugar","Honey","Chocolate","Vanilla","Coffee","Tea","Red Wine","White Wine","Beer","Rum","Whiskey","Water",
  "Milk","Yogurt","Cream Cheese","Butter","Vegetable Oil","Peanut Butter","Jam","Maple Syrup","Ketchup","Mayonnaise","Soy Sauce","Barbecue Sauce","Hot Sauce","Teriyaki Sauce","Oyster Sauce","Miso","Wheat Flour","Cornmeal",
  "Yeast","Baking Soda","Red Pepper Flakes","Fish Sauce","Oyster Sauce","Sesame Oil","Coconut Oil","Canola Oil","Corn Oil","Sunflower Oil","Lard","Margarine","Balsamic Vinegar","Wine Vinegar","Rice Vinegar","White Vinegar",
  "Apple Cider Vinegar","Cider Vinegar","Baking Powder","Gelatin","Cornstarch","Chili Sauce","Hoisin Sauce","Curry Paste","Tomato Paste","Curry Powder","Chili Powder","Worcestershire Sauce","Dijon Mustard","Creole Mustard",
  "Tarragon Mustard","Honey Mustard","Whole Grain Mustard","Yellow Mustard","Mustard Powder","Cayenne Pepper","White Pepper","Allspice","Sichuan Pepper","Pink Pepper","Green Pepper","Red Pepper","Black Pepper","Herbes de Provence",
  "Italian Herbs","Tarragon","Basil","Coriander","Fennel","Rosemary","Thyme","Marjoram","Mint","Parsley","Dill","Nutmeg","Cinnamon","Cloves","Cardamom","Star Anise","Sweet Paprika","Hot Paprika","Turmeric","Cumin","Ginger",
  "Saffron","Ground Coriander","Cayenne Pepper","Curry Powder","Chili Powder","Paprika","Chipotle Powder","Sriracha Sauce","Tabasco Sauce","Chili Sauce","Frank's RedHot Sauce","Texas Pete's Hot Sauce","Valentina Hot Sauce",
  "Cholula Hot Sauce","Tapatio Hot Sauce","El Yucateco Hot Sauce","Louisiana Hot Sauce","Crystal Hot Sauce","Trappey's Hot Sauce","Texas Pete Hot Sauce","Blair's Hot Sauce","Mad Dog Hot Sauce","Dave's Insanity Hot Sauce",
  "Melinda's Hot Sauce","Da Bomb Hot Sauce","Pain is Good Hot Sauce","Secret Aardvark Hot Sauce","Marie Sharp's Hot Sauce","El Yucateco Hot Sauce","Cholula Hot Sauce","Tapatio Hot Sauce","Louisiana Hot Sauce","Tabasco Hot Sauce",
  "Crystal Hot Sauce","Texas Pete Hot Sauce","Frank's RedHot Sauce","Trappey's Hot Sauce", "banana"]

  @ViewChild('ingredientInput') ingredientInput: ElementRef<HTMLInputElement> = {} as ElementRef;

  announcer = inject(LiveAnnouncer);

  constructor(private router: Router, private http: BackendserviceService, private route: ActivatedRoute){ 
    this.filteredIngredients = this.ingredientCtrl.valueChanges.pipe(
      startWith(null),
      map((ingredient: string | null) => (ingredient ? this._filter(ingredient) : this.allIngredients.slice())),
    );
  } 

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if(value) {
      this.ingredients.push(value);
    }

    event.chipInput!.clear();
    this.ingredientCtrl.setValue(null);
  }

  remove(ingredient: string): void {
    const index = this.ingredients.indexOf(ingredient);
    if(index >= 0) {
      this.ingredients.splice(index, 1);
      this.announcer.announce(`Removed ${ingredient}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.ingredients.push(event.option.viewValue);
    this.ingredientInput.nativeElement.value = '';
    this.ingredientCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allIngredients.filter(ingredient => ingredient.toLowerCase().includes(filterValue));
  }
  
  searchIngredient(){
    this.stringIngredients = this.ingredients.join(',+');
    this.http.searchByIngredient(this.stringIngredients).subscribe({
      next: (data) => {
        this.searchByIngredient = data;
        //console.log(this.searchByIngredient);
        for(let item of this.searchByIngredient){
          this.getInformation(item.id);
        }
      }
    })
  }

  getInformation(id:number){
    this.http.getRecipeInformation(id).subscribe({
      next: (data) => {
        this.info.push(data);
        //console.log(this.info);
      }
    })
  }
  goToRecipe(id: number){
    this.id=id;
    this.route.paramMap.subscribe(params => {
      this.router.navigate(['/recipe', this.id]);
    });
  }
  NewUsuario(){
    this.router.navigateByUrl('/user');
  }

  login(){
    this.router.navigateByUrl('/login');
  }

  principal(){
    this.router.navigateByUrl('/principal');
  }

  AcercaDe(){
    this.router.navigateByUrl('/acerca_de');
  }

}
