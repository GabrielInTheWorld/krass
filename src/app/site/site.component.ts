import { infoDialogOptions } from './../common/dialogs/dialog-options';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateCanvasDialogComponent } from '../common/dialogs/create-canvas-dialog/create-canvas-dialog.component';

@Component({
    selector: 'app-site',
    templateUrl: './site.component.html',
    styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {
    constructor(private matDialog: MatDialog) {}

    ngOnInit(): void {}

    public openCreateDialog(): void {
        this.matDialog.open(CreateCanvasDialogComponent, {
            ...infoDialogOptions,
            disableClose: true
        });
    }
}
