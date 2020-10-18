import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {
  }


  toggleClass(idElement: string, classToToggle: string) {
    document.getElementById(idElement).classList.toggle(classToToggle);
  }

}
