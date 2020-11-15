import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-create-canvas-dialog',
    templateUrl: './create-canvas-dialog.component.html',
    styleUrls: ['./create-canvas-dialog.component.scss']
})
export class CreateCanvasDialogComponent implements OnInit {
    public createDialogForm: FormGroup;

    public constructor(
        public dialogRef: MatDialogRef<CreateCanvasDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public dialogData: any,
        private fb: FormBuilder
    ) {}

    public ngOnInit(): void {
        this.createDialogForm = this.fb.group({
            name: ['', Validators.required],
            width: ['', Validators.required],
            height: ['', Validators.required],
            backgroundColor: ['', Validators.required]
        });
    }

    public confirmCreating(): void {
        this.dialogRef.close(this.createDialogForm.value);
    }

    public cancelCreating(): void {
        this.dialogRef.close();
    }
}
