import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NotesService } from 'src/app/services/notes.service';
import { PlansService } from 'src/app/services/plans.service';
import { ProgressService } from 'src/app/services/progress.service';

@Component({
  selector: 'app-plan-id',
  templateUrl: './plan-id.component.html',
  styleUrls: ['./plan-id.component.scss']
})
export class PlanIdComponent implements OnInit {
  planId: string | null = null;
  loading = true;
  planData: any;
  currentDay!: number; 
  finishedPlan!: boolean;
  notes: any;
  newNoteToggle!: boolean;
  notesForm: FormGroup;
  toggleShowingNotes= false;
  progress: any;
  toggleShowingProgress = false;


  constructor(private progressService: ProgressService, private notesService: NotesService, private route: ActivatedRoute, private router: Router, private http: HttpClient, private plansService: PlansService, private toastService: ToastrService, private formBuilder: FormBuilder) {
    this.notesForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      category: ['plan', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.plansService.checkPlanStatus().subscribe((response) => {
      if (response.errorMessage) {
        this.router.navigate(['/plans']);
      } else {
        if (response.day > 30) {
          this.finishedPlan = true;
        }
        this.currentDay = response.day;
        this.route.paramMap.subscribe((params) => {
          this.planId = params.get('planId');
          this.fetchPlanData(this.currentDay); 
        });
      }
    });
  }

  fetchPlanData(userCurrentDay: number) {
    this.http.get(`assets/json/${this.planId}.json`).subscribe(
      (res: any) => {
        const planDataArray: any = res;
        const currentDayData = planDataArray.find((data: any) => data.day === userCurrentDay);

        if (currentDayData) {
          this.planData = currentDayData;
          this.loading = false;
        } else {
          console.error('Data not found for the current day:', this.currentDay);
          this.loading = false;
        }
      },
      (error) => {
        console.error('Error fetching JSON data:', error);
        this.loading = false;
      }
    );
  }

  nextDay() {
    this.plansService.updatePlanProgressionDay().subscribe({
      next: (response) => {
        if (response.day <= 30) {
          this.currentDay = response.day;
          this.fetchPlanData(this.currentDay);
        }
      },
      error: (response) => {
        if (response.error.day > 30) {
          this.finishedPlan = true;
          this.toastService.success("You have finished the plan! 🎉");
        }
      }
    })
  }

  toggleNewNoteToggle() {
    this.newNoteToggle = !this.newNoteToggle;
  }

  toggleNoteContainer() {
    this.toggleShowingNotes = !this.toggleShowingNotes;

    if (!this.notes) {
      this.getPlanNotes();
    }
  }

  toggleProgressContainer() {
    this.toggleShowingProgress = !this.toggleShowingProgress;

    if (!this.progress) {
      this.getPlanNotes();
    }
  }

  toggleDescription(exercise: any) {
    exercise.showDescription = !exercise.showDescription;
  }

  toggleDoneExercise(exercise: any) {
    exercise.isDone = !exercise.isDone;
  }

  onSubmitNewNoteForm() {
    if (this.notesForm.valid) {
    this.notesService.addNewNote(this.notesForm.value).subscribe({
      next: (response) => {
        this.notes.unshift(response.body);
        this.toggleNewNoteToggle();
        this.notesForm.reset();
      },
      error: (response) => {
        console.log(response)
        this.toggleNewNoteToggle();
      }
    })
  }
  }

  getPlanNotes(): void {
    this.notesService.getNotesByUser(0, 3, "plan").subscribe({
      next: (response) => {
        this.notes = response.notes;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  removePlanFromUser() {
    this.plansService.cancelPlanProgressionByUser().subscribe({
      next: (response) => {
        console.log(response);
        this.toastService.success("Updated your plan!");
        this.router.navigate([`/plans`]);
      },
      error: (response) => {
        console.log(response);
      }
    })
  }
}
