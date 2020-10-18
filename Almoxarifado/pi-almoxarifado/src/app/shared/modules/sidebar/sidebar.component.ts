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


  toggleMenuItem(menuItemId) {
    document.getElementById(menuItemId).classList.toggle("collapse");
  }


  setActiveCurrentElement() {
    const currentResource = window.location.href.split("?")[0].trim();
    const sideBarItems = document.getElementsByClassName("sidebar-item");

    Array.from(sideBarItems).forEach(sideBarItem => {
      var links = sideBarItem.getElementsByTagName("a");

      Array.from(links).forEach(link => {
        if (link.href === currentResource) {
          if (link.classList.contains("sidebar-link")) {
            this.setActive(sideBarItem);
            
            if (sideBarItem.getElementsByTagName("ul").length > 0) {
              var idUl = sideBarItem.getElementsByTagName("ul")[0].id;
              this.toggleMenuItem(idUl);
            }
          }
        }
      });
    });
  }


  setActive(element) {
    let parentLi = element;
    while (parentLi.tagName !== 'LI') {
      parentLi = parentLi.parentElement;
    }

    parentLi.classList.add("active");
  }

}
