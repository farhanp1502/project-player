import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-project-details',
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent {
@Input()projectDetails: any = {};
getCategoryLabels(): string {
  return this.projectDetails.categories.map((item: { label: any; }) => item.label).join(', ');
}
}