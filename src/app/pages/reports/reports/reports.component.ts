import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// MDBootstrap
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

// Chart
import Chart from 'chart.js/auto';

// Components
import { HeaderComponent } from '@components/header/header.component';
import { SidebarComponent } from '@components/sidebar/sidebar.component';

// Services
import { DashboardService } from '@services/dashboard.service';


@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, MdbFormsModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent implements OnInit { 

  
  http$: Observable<any> = new Observable();
  public barChart: any
  public pieChart: any
  
  private backgroundValues = [
    'rgba(75, 192, 192, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(201, 203, 207, 0.2)',
    'rgba(255, 99, 132, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 205, 86, 0.2)',
  ];

  private borderValues = [
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)',
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
  ];

  constructor(
    private dashboardService: DashboardService
  ){ }

  public async ngOnInit(){ 


    const data: any = await this.getData();
    if(!data) return;

    this.generateBarchart(data.quantity);
    this.generatePiechart(data.sum);

  }

  private generateBarchart(data: any){
    const labels = data.labels;
    const barCanvasEle: any = document.getElementById('barChart')
    this.barChart = new Chart(barCanvasEle.getContext('2d'), {
      type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Quantidade',
            data: data.amount,
            backgroundColor: this.backgroundValues,
            borderColor:     this.borderValues,
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
              y: {
                  beginAtZero: true
              }
          },
          plugins: {
            title: {
              display: true,
              text: 'Quantidade | Movimentações',
              padding: {
                  top: 10,
                  bottom: 10
              }
          },
            legend: {
              display: false, // Hides the legend
            },
          },
        }
    });
  }

  private generatePiechart(data: any){
    const labels = data.labels;
    const pieCanvasEle: any = document.getElementById('pieChart')
    this.pieChart = new Chart(pieCanvasEle.getContext('2d'), {
      type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: 'Valor',
            data: data.sum,
            backgroundColor: this.backgroundValues,
            borderColor:     this.borderValues,
            hoverOffset: 4
          }]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Valor | Movimentações',
              padding: {
                  top: 10,
                  bottom: 10
              }
          },
            legend: {
              display: false, // Hides the legend
            },
          },
        }
    });
  }

  private getData(){
    this.http$ = this.dashboardService.getDataBar()

    return new Promise((resolve, reject)=>{
      this.http$.subscribe({
        next: (data: any) => {
          if(data.status){  
            console.log(data);
            resolve(data);
          }
        },
        error: (error) => {
          console.log(error)
          reject(false);
        }
      })
    })
  }

  public search(){

  }
}
