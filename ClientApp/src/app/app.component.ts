import { Component, OnInit } from '@angular/core';

const url = "";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Angular Crud App';
  ngOnit(){
    console.log("Init");
    window.location.href ="/product-list";
    console.log("Redirected");
  }
  start();
  start(){
    window.location.href ="/product-list";
  }
}
