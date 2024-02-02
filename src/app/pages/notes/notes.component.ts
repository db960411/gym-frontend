import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit, OnDestroy{
  activatedForm = false;
  notesData: any[] = [];
  notesLength!: number;
  pageSize = 5;
  pageIndex = 0;
  category = "";
  form: FormGroup;
  private categoryChanged: Subject<string> = new Subject<string>();
  private categorySubscription: Subscription;


  constructor(private notesService: NotesService, private formBuilder: FormBuilder, private toastService: ToastrService) {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      category: ['', Validators.required],
    });

    this.categorySubscription = this.categoryChanged.pipe(debounceTime(900))
      .subscribe(() => {
        this.loadNotes(this.pageIndex, this.pageSize, this.category);
      });
  }

  ngOnInit(): void {
     this.loadNotes(0, this.pageSize, this.category);
  }

  ngOnDestroy(): void {
      this.categorySubscription.unsubscribe();
  }

  loadNotes(page: number, size: number, category: string): void {
    this.notesService.getNotesByUser(page, size, category).subscribe({
      next: (response) => {
        this.notesData = response.notes;
        this.notesLength = response.totalNotes;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  pageEvent(event: any): void {
    this.pageIndex = event.pageIndex;
    this.loadNotes(this.pageIndex, event.pageSize, this.category);
  }

  pageSizeEvent(event: any): void {
    this.loadNotes(0, event.pageSize, this.category);
  }

  deleteNote(noteId: string): void {
    this.notesService.deleteNote(noteId).subscribe({
      next: (response) => {
        if (response === true) {
          this.toastService.success("Successfully deleted this note");
        } else {
          this.toastService.error("There was an error deleting this note");
        }
      }
    });
    this.notesData = this.notesData.filter(note => note.id !== noteId);
  }

  addNewNote(): void {
    if (this.form.valid) {
      this.notesService.addNewNote(this.form.value).subscribe({
        next: (response) => {
          this.toastService.success("Successfully added new note!");
          this.deActivateNewProgressForm();
          this.resetForm();
          this.notesData.unshift(response.body)},
        error: (error) => {
          console.log(error);
          this.toastService.error("There was an error adding new note");
          this.deActivateNewProgressForm();
          this.resetForm();
        }
      })
    }
  }

  onCategoryChange(): void {
    this.categoryChanged.next(this.category);
  }

  activateForm(): void {
    this.activatedForm = true;
  }

  deActivateNewProgressForm(): void {
    this.activatedForm = !this.activatedForm;
  }

  resetForm(): void {
    this.form.reset();
  }

}
