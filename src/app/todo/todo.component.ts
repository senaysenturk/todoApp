import { Component, OnInit } from '@angular/core';
import { Model } from './model';
import { TodoItem } from './todoitem';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

  constructor() { }
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
      let items = [];
      items.push(data);
      localStorage.setItem("items", JSON.stringify(items));
      this.inputTxt = "";
    } else
      alert("Lütfen bir değer giriniz!")
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
}
