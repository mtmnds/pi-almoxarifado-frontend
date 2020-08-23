import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {


  constructor() { }


  ngOnInit(): void {
    this.setActiveCurrentElement();
  }


  setActiveCurrentElement() {
    const currentResource = window.location.href.split("?")[0].trim();
    const sideBarItems = document.getElementsByClassName("menu-item");

    Array.from(sideBarItems).forEach(sideBarItem => {
      var links = sideBarItem.getElementsByTagName("a");

      Array.from(links).forEach(link => {
        if (link.href === currentResource) {
          if (link.classList.contains("sidebar-link")) {
            this.setActive(sideBarItem);
          }
        }
      });
    });
  }


  setActive(element) {
    element.classList.add("active");
  }


}
