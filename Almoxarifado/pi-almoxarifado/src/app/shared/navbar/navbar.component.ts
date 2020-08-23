import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  constructor() { }


  ngOnInit(): void {
    this.usuario = {
      nome: "Matheus Mendes"
    }
  }


  public usuario = {
    nome: "Matheus Mendes"
  };


  toggleSidebar() {
    var sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("hide");
  }


}
