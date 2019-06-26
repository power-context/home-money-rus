import { Component, OnDestroy, Output, EventEmitter  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/models/category.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'curat-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnDestroy{

  sub : Subscription;

  @Output() onCategoryAdd = new EventEmitter();

  constructor(private categoriesService : CategoriesService) { }

  onSubmit(form : NgForm){
    let { name, capacity } = form.value;

    if(capacity < 0){
      capacity *= -1;
    }

    const category = new Category(name, capacity);

    this.sub = this.categoriesService.addCategory(category)
    .subscribe((category : Category) => {
      this.onCategoryAdd.emit(category)
    })

    form.reset()
  }

  ngOnDestroy(){
    if(this.sub) this.sub.unsubscribe();
  }

}
