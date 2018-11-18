import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: []
})
export class FooterComponent {
  adminName: string = "John Bryce - full stack";
  currentYear:number=(new Date()).getFullYear();
}
