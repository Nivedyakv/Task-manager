import { Component, OnInit } from '@angular/core';
import { Chart ,registerables} from 'chart.js';
import { TaskmanagerService } from '../../shared/Task/taskmanager.service';
Chart.register(...registerables);

@Component({
  selector: 'app-piechart',
  standalone: true,
  imports: [],
  templateUrl: './piechart.component.html',
  styleUrl: './piechart.component.scss'
})
export class PiechartComponent {
  ngOnInit(): void {
    this.TaskmanagerService.Getalltasks().subscribe(
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

  createPieChart(lowCount: number, medCount: number, highCount: number): void {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    const pieChart = new Chart(ctx, {
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
        responsive: true,
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