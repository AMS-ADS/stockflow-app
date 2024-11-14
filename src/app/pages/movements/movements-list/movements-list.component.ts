import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// MDBootstrap
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

// Components
import { SidebarComponent } from '@components/sidebar/sidebar.component';
import { HeaderComponent }  from '@components/header/header.component';
import { TableComponent }   from '@components/table/table.component';
import { ModalComponent }   from '../modal/modal.component';
import { CategoryService } from '@services/category.service';
import { Observable } from 'rxjs';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { ModalAddComponent } from '../modal-add/modal-add.component';
import { ModalRemoveComponent } from '../modal-remove/modal-remove.component';
import { MovementService } from '@services/movement.service';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-movements-list',
  standalone: true,
  imports: [CommonModule, SidebarComponent, HeaderComponent, MdbFormsModule, MdbRippleModule, MdbDropdownModule, RouterLink, TableComponent, ModalComponent, ModalAddComponent, ModalRemoveComponent],
  templateUrl: './movements-list.component.html',
  styleUrl: './movements-list.component.scss'
})
export class MovementsListComponent {

  modalRef: MdbModalRef<ModalComponent> | null = null;

  categories: any[];
  http$: Observable<any> = new Observable();
  notyf: Notyf;

  public headers = ["Produto", "Categoria", "Unidade", "Quantidade", "Responsável", "Data", "Movimentação"]; // Esse
  public indexes = ["movement_id", "product", "category", "unity", "quantity", "user", "created_at", "type", "movement_id"]; 
  public data: any[];

  constructor(
    private modalService: MdbModalService,
    private categoryService: CategoryService,
    private movementService: MovementService
  ){}

  ngOnInit(){
    this.getCategories()
    this.getMovements()

    this.notyf  = new Notyf({
      position: {
        x: 'right',
        y: 'top',
      }
    });
  }

  getMovements(){
    this.http$ = this.movementService.getItems()
    this.http$.subscribe({
      next: (data) => {
        const allData = data.body;
        allData.forEach((item: any) => {

          if(item.type == "E"){
            item.type = `
              <span class="badge rounded-pill badge-success">Entrada</span>
            `;
          } 

          if(item.type == "S"){
            item.type = `
              <span class="badge rounded-pill badge-danger">Saída</span>
            `;
          }
        });

        this.data = data.body
      }
    })
  }

  getCategories(){
    this.http$ = this.categoryService.getItems()
    this.http$.subscribe({
      next: (data) => {
        if(data.status){
          this.categories = data.body
        }
      }
    })
  }

  openModal(type: string){

    switch (type) {
      case 'add':
        this.modalRef = this.modalService.open(ModalAddComponent);
        this.modalRef.onClose.subscribe({
          next: () => {
            this.getMovements()
          }
        })
        break;
      case 'remove':
        this.modalRef = this.modalService.open(ModalRemoveComponent)
        this.modalRef.onClose.subscribe({
          next: () => {
            this.getMovements()
          }
        })
        break;
      default:
        break;
    }
  }

  openDeleteModal(){

  }

  searchItems(){

  }
}
