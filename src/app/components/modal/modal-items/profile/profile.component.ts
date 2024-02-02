import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-modal-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileModalComponent implements OnInit {
  @Input() profileForm!: FormGroup;
  @Output() submitForm: EventEmitter<void> = new EventEmitter<void>();
  languages = [
    {value: 'ENG', viewValue: 'English'},
    {value: 'SWE', viewValue: 'Swedish'},
    {value: 'POR', viewValue: 'Portuguese'},
  ];
  goals = [
    {value: 'LoseWeight', viewValue: 'Lose weight'},
    {value: 'Strength', viewValue: 'Strength training'},
    {value: 'None', viewValue: 'No goals'},
  ];
  maxDate!: Date;


  ngOnInit(): void {
    const newDate = new Date();
    newDate.setFullYear(newDate.getFullYear() - 12);
    this.maxDate = newDate;
  }
  
  onSubmit(): void {
    if (this.profileForm.invalid) return;
    
    this.submitForm.emit();
  }
}
