import { Component, EventEmitter, Input, Output} from '@angular/core';
import { PlansService } from 'src/app/services/plans.service';

@Component({
  selector: 'app-lose-weight-modal',
  templateUrl: './lose-weight.component.html',
  styleUrls: ['../plans-modal.scss']
})
export class LoseWeightModalComponent {
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
