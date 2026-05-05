// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-main-layout',
//   imports: [],
//   templateUrl: './main-layout.html',
//   styleUrl: './main-layout.scss',
// })
// export class MainLayout {

// }



import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent {}
