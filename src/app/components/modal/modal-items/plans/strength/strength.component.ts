import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlansService } from 'src/app/services/plans.service';


@Component({
  selector: 'app-strength-modal',
  templateUrl: './strength.component.html',
  styleUrls: ['../plans-modal.scss']
})
export class StrengthModalComponent {
  @Input() selectedPlan!: string;
  @Output() assignPlan = new EventEmitter<string>();

  constructor(private plansService: PlansService){}

  assignPlanToUser(plan: string) {
    this.assignPlan.emit(plan);
  }

  closeModal() {
    this.plansService.closeModal();
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
