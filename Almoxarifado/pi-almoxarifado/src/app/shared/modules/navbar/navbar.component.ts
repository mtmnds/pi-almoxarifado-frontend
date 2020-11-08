import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public dadosUsuario;


  constructor() { }


  ngOnInit(): void {
    this.dadosUsuario = JSON.parse(sessionStorage.getItem("dadosUsuario"));
  }


  toggleClass(idElement: string, classToToggle: string) {
    document.getElementById(idElement).classList.toggle(classToToggle);
  }

}
