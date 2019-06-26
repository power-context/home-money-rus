import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../../shared/models/category.model';
import { CategoriesService } from '../../shared/services/categories.service';
import { Message } from 'src/app/shared/models/message.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'curat-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  @Input() categories : Category[] = [];
  @Output() onCategoryEdit = new EventEmitter<Category>();

  currentCategoryId = 1;
  currentCategory : Category;
  message : Message;
  sub : Subscription

  constructor(private categoriesService : CategoriesService) { }

  ngOnInit() {
    this.message = new Message('success', '');

    this.onCategoryChange();
  }

  onCategoryChange(){
    this.currentCategory = this.categories
    .find(c => c.id === +this.currentCategoryId)
  }

  onSubmit(form : NgForm){
    let { capacity, name } = form.value;
    if(capacity < 0) capacity *= -1;

    const category = new Category(name, capacity, +this.currentCategoryId);

    this.sub = this.categoriesService.changeCategory(category)
    .subscribe((category : Category) => {
      this.onCategoryEdit.emit(category)
      this.message.text = 'Edit category was success!';
      window.setTimeout(()=>{
        this.message.text = '';
      }, 3000)
    })

  }

  ngOnDestroy(){
    if(this.sub) this.sub.unsubscribe();
  }

}
