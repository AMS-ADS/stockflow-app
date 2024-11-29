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
  public chart: any

  constructor(
    private dashboardService: DashboardService
  ){ }

  public async ngOnInit(){ 


    const data: any = await this.getBarChartData();

    // setTimeout(()=>{
      console.log(data);

    // }, 2000)

  const labels = data.labels;
  const barCanvasEle: any = document.getElementById('MyChart')
  const barChart = new Chart(barCanvasEle.getContext('2d'), {
    type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Sales',
          data: data.amount,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
      }
  });

  }

  private getBarChartData(){
    this.http$ = this.dashboardService.getDataBar()


    return new Promise((resolve, reject)=>{
      this.http$.subscribe({
        next: (data: any) => {
          if(data.status){  
            console.log(data.body);
            // return data.body;
            resolve(data.body);
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
