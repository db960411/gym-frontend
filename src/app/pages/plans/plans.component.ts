import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NotesService } from 'src/app/services/notes.service';
import { PlansService } from 'src/app/services/plans.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {
  selectedPlan!: string;
  success = false;
  error = false;  
  loading = false;
  plans = [
    { route: 'strength', label: 'Strength', imageSrc: '/assets/HERO.webp' },
    { route: 'mix', label: 'Mix', imageSrc: '/assets/BEACH_BODY.webp' },
    { route: 'lose-weight', label: 'Lose weight', imageSrc: '/assets/SLIM_SHREDDED_BODY.webp' },
  ];
  isModalActive = false;
  

  constructor(private plansService: PlansService, private toastr: ToastrService, private router: Router){
  }

  ngOnInit(): void {
    this.loading = true;
    this.plansService.checkPlanStatus().subscribe((response) => {
      if(response.plan) {
        this.router.navigate([`plans/${response.successMessage.toLowerCase()}`]);
      } else {
        console.log(response)
      }
      this.loading = false;
    });
    this.plansService.modalState$.subscribe((modalState) => {
      this.isModalActive = modalState;
    });
  }

  openModal(): void {
    this.isModalActive = true;
  }

  closeModal() {
    this.plansService.closeModal();
  }

  assignPlanToUser(plan: string) {
    this.plansService.assignPlan(plan).subscribe((response) => {
      console.log(response);
      if (response.successMessage) {
        this.success = true;
        this.error = false;
        this.toastr.success(`Joined plan ${plan.toLowerCase()}`);
        this.closeModal();
        this.router.navigate([`plans/${plan.toLowerCase()}`]);
      } else {
        this.success = false;
        this.error = true;
        this.toastr.error("Already on a plan");
        this.closeModal();
      }
    });
  }
  

}
