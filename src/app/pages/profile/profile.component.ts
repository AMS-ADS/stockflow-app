import { Component } from '@angular/core';

// MDBootstrap
import { MdbRippleModule }  from 'mdb-angular-ui-kit/ripple';
import { MdbFormsModule }   from 'mdb-angular-ui-kit/forms';

// Components
import { HeaderComponent }  from  '@components/header/header.component';
import { SidebarComponent } from  '@components/sidebar/sidebar.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, MdbFormsModule, MdbRippleModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export default class ProfileComponent {

}
