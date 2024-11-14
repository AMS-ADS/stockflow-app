import { Component } from '@angular/core';
import { HeaderComponent } from '@components/header/header.component';
import { SidebarComponent } from '@components/sidebar/sidebar.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {

}
