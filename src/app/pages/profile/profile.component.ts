import { Component } from '@angular/core';

// MDBootstrap
import { MdbRippleModule }  from 'mdb-angular-ui-kit/ripple';
import { MdbFormsModule }   from 'mdb-angular-ui-kit/forms';

// Components
import { HeaderComponent }  from  '@components/header/header.component';
import { SidebarComponent } from  '@components/sidebar/sidebar.component';
import { Observable } from 'rxjs';
import { UserService } from '@services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, MdbFormsModule, MdbRippleModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export default class ProfileComponent {

  http$: Observable<any> = new Observable()
  userId: string = this.cookieService.get('id');
  image: string = ""

  form: FormGroup = new FormGroup({
    id: new FormControl(""),
    name: new FormControl("", [Validators.required]),
    role: new FormControl({value: "", disabled: true}, [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    rm: new FormControl("", [Validators.required])
  })


  constructor(
    private userService: UserService,
    private cookieService: CookieService
  ){
    
  }

  ngOnInit(){
    this.getUserById();
  }

  getUserById(){
    this.http$ = this.userService.getItem(this.userId)
    this.http$.subscribe({
      next: (data) => {
        if(data.status){
          this.form.patchValue({
            id: data.body.id,
            name: data.body.name,
            role: data.body.role,
            email: data.body.email,
            rm: data.body.rm
          })

          this.image = data.body.image
        }
        console.log(data)
      }
    })
  }

  addImage(){
    
  }

}
