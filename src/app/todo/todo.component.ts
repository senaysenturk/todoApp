import { Component, OnInit } from '@angular/core';
import { Model } from './model';
import { TodoItem } from './todoitem';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

  constructor() {
    this.model.items = this.getItemsFormList();
   }

  message: string = "";
  model = new Model();
  displayAll: boolean = false;
  inputTxt: string = "";

  getName() {
    return this.model.name;
  }

  getItems() {
    if (this.displayAll)
      return this.model.items;
    else
      return this.model.items.filter(item => !item.action);
  }
  addItem() {
    let data = { description: this.inputTxt, action: false };
    if (this.inputTxt != "") {
      this.model.items.push(data);

      let items = this.getItemsFormList();
      items.push(data);
      localStorage.setItem("items", JSON.stringify(items));
      this.inputTxt = "";
    } else
      alert("Lütfen bir değer giriniz!")
  }
  getItemsFormList(){
    let items:TodoItem[] = [];
    let value = localStorage.getItem("items");

    if(value != null){
      items = JSON.parse(value);
    }

    return items;
  }
  displayCount() {
    return this.model.items.filter(i => i.action).length;
  }
  getBtnClasses() {
    return {
      'disabled': this.inputTxt.length == 0,
      'btn-secondary': this.inputTxt.length == 0,
      'btn-primary': this.inputTxt.length > 0
    }
  }
  onActionChanged(item: TodoItem){
    let items = this.getItemsFormList();
    localStorage.clear();

    items.forEach(i=>{
      if(i.description == item.description){
        i.action = item.action;
      }
    });
    localStorage.setItem("items",JSON.stringify(items));
    console.log(item);
  }
}
