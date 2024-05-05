import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Chart ,registerables} from 'chart.js';
import { TaskmanagerService } from '../../shared/Task/taskmanager.service';
import { Router } from '@angular/router';
Chart.register(...registerables);

@Component({
  selector: 'app-piechart',
  standalone: true,
  imports: [],
  templateUrl: './piechart.component.html',
  styleUrl: './piechart.component.scss'
})
export class PiechartComponent {
 
  constructor(public taskmanagerservice:TaskmanagerService){
  }
  @Input() isUpdateChart!: boolean;

  ngOnInit(): void {
    this.taskmanagerservice.Getalltasks().subscribe(
      (res: any) => {
        const data = res ?? [];
        let highCount = 0;
        let medCount = 0;
        let lowCount = 0;

        data.forEach((task: any) => {
          if (task.priority === 'High') {
            highCount++;
          } else if (task.priority === 'Medium') {
            medCount++;
          } else if (task.priority === 'Low') {
            lowCount++;
          }
        });

        this.createPieChart(lowCount, medCount, highCount);
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    ); 
  }
  ngOnChanges(changes: SimpleChanges) {
   if(this.isUpdateChart==true){
    window.location.reload();
   }
  }
  createPieChart(lowCount: number, medCount: number, highCount: number): void {
    const ctx = document.getElementById('piechart') as HTMLCanvasElement;
    const pieChart = new Chart('piechart', {
      type: 'pie',
      data: {
        labels: ['High', 'Medium', 'Low'],
        datasets: [{
          label: 'Priority Tasks',
          data: [highCount, medCount, lowCount],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Tasks with priority'
          }
        }
      }
    });
  }
}