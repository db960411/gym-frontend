import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { Exercise } from 'src/app/interface/Exercise';
import { ProgressService } from 'src/app/services/progress.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent implements OnInit {
  data: any;
  showSubscriptionButton = false;
  activatedForm: boolean;
  form: FormGroup;
  editForm: FormGroup; 
  loading = false;
  filteredExercises!: Observable<Exercise[]>;
  selectedCategory!: Observable<any>;
  exercisesGroupsFilterCtrl = new FormControl();
  profileCreated = false;
  editProgressItem = "";

  categories: string[] = [
    'Upper Body',
    'Core',
    'Lower Body',
    'Cardio',
  ];

  exercises: Exercise[] = [
    { id: 1, name: 'Push-up', category: 'Upper Body' },
    { id: 2, name: 'Bench Press', category: 'Upper Body' },
    { id: 3, name: 'Pull-up', category: 'Upper Body' },
    { id: 4, name: 'Dumbbell Curls', category: 'Upper Body' },
    { id: 5, name: 'Chin-ups', category: 'Upper Body' },
    { id: 6, name: 'Push Press', category: 'Upper Body' },
    { id: 7, name: 'Crunches', category: 'Core' },
    { id: 8, name: 'Plank', category: 'Core' },
    { id: 9, name: 'Russian Twists', category: 'Core' },
    { id: 10, name: 'Mountain Climbers', category: 'Core' },
    { id: 11, name: 'Squats', category: 'Lower Body' },
    { id: 12, name: 'Deadlift', category: 'Lower Body' },
    { id: 13, name: 'Leg Press', category: 'Lower Body' },
    { id: 14, name: 'Lunges', category: 'Lower Body' },
    { id: 15, name: 'Box Jumps', category: 'Lower Body' },
    { id: 16, name: 'Running', category: 'Cardio' },
    { id: 17, name: 'Cycling', category: 'Cardio' },
    { id: 18, name: 'Swimming', category: 'Cardio' },
    { id: 19, name: 'Biking', category: 'Cardio' },
    { id: 20, name: 'Hiking', category: 'Cardio' },
  ];

  constructor(
    private progressService: ProgressService,
    private formBuilder: FormBuilder,
    private toastService: ToastrService,
  ) {
    this.activatedForm = false;

    this.form = this.formBuilder.group({
      exerciseType: ['', Validators.required],
      sets: [null],
      reps: [null],
      weight: [null],
      distance: [null],
      time: [null],
    });

    this.editForm = this.formBuilder.group({
      sets: this.formBuilder.control({ value: null, disabled: true }),
      reps: this.formBuilder.control({ value: null, disabled: true }),
      weight: this.formBuilder.control({ value: null, disabled: true }),
      distance: this.formBuilder.control({ value: null, disabled: true }),
      time: this.formBuilder.control({ value: null, disabled: true }),
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.progressService.getProgress().subscribe({
      next: (data) => {
        this.data = data;
        this.loading = false;
        this.profileCreated = true;
      },
      error: (error) => {
        if (error.status === 423) {
          this.profileCreated = false;
          this.loading = false;
          return;
        }
      }
    });

   this.filteredExercises = of(this.exercises);

   this.form
     .get('exerciseType')
     ?.valueChanges.subscribe((selectedType: string) => {
      const selectedCategory = this.exercises.find(exercise => exercise.name === selectedType)?.category;
       this.selectedCategory = of(selectedCategory);
     });
  }


  getFilteredExercises(category: string): Observable<Exercise[]> {
    const searchTerm = this.exercisesGroupsFilterCtrl?.value?.toLowerCase();
    
    if (searchTerm) {
      const filteredExercises = this.exercises.filter((exercise) =>
        (exercise.name.toLowerCase().includes(searchTerm) && exercise.category === category) ||
        (exercise.category.toLowerCase().includes(searchTerm) && exercise.category === category)
      );
  
      return of(filteredExercises);
    } else {
      const exercisesInCategory = this.exercises.filter((exercise) =>
        exercise.category === category
      );
  
      return of(exercisesInCategory);
    }
  }
  
  activateNewProgressForm(): void {
    this.activatedForm = true;
  }

  deActivateNewProgressForm(): void {
    this.activatedForm = false;
  }

  deleteProgress(exerciseId: string): void {
    this.progressService.deleteProgress(exerciseId).subscribe({
      next: () => {
        this.data = this.data.filter((item: any) => item.id !== exerciseId);
        this.toastService.success('Removed progress!');
      },
      error: () => {
        this.toastService.error("Couldn't remove progress!");
      },
    });
  }

  submitEditedForm(exerciseId: string): void {
    console.log(this.editForm.valid)
    console.log(this.editForm.value);
    
    if (this.editForm.valid) {
    this.progressService.editProgress(exerciseId, this.editForm.value).subscribe({
      next: () => {
        this.toastService.success('Edited progress!');
        this.editProgressItem = "";
      },
      error: () => {
        this.toastService.error("Couldn't edit progress!");
      },
    })
    }
  }

  editProgress(exerciseId: string): void {
    this.editProgressItem = this.editProgressItem === exerciseId ? '' : exerciseId;
    const formControls = ['sets', 'reps', 'weight', 'distance', 'time'];
    if (this.editProgressItem === exerciseId) {
      formControls.forEach((controlName) => {
        this.editForm.controls[controlName].enable();
      });
    } else {
      formControls.forEach((controlName) => {
        this.editForm.controls[controlName].disable();
      });
    }
  }


  addProgress(): void {
    if (this.form.invalid) {
      return;
    }

    const formData = this.form.value;
    this.progressService.addProgress(formData).subscribe({
      next: (response) => {
        this.activatedForm = false;
        this.form.reset();
        this.toastService.success('Added progress!');
        this.data = [...this.data, response];
      },
      error: (errorResponse) => {
        if (errorResponse.status === 403) {
          this.toastService.error('Only 9 progressions allowed for basic subscriptions');
          this.form.reset();
          this.activatedForm = false;
          this.showSubscriptionButton = true;
        }
        else if (errorResponse.status === 406) {
          this.toastService.error('You have already added this progress');
          this.form.reset();
          this.activatedForm = false;
        }
      },
    });
  }
}
