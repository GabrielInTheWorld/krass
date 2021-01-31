import { BaseComponent } from '../core/base-components/base.component';
import { Observable } from 'rxjs';
import { infoDialogOptions } from '../ui/components/dialogs/dialog-options';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateCanvasDialogComponent } from '../ui/components/dialogs/create-canvas-dialog/create-canvas-dialog.component';
import { Plane } from './services/plane.service';
import { Coordinates, DrawPoint, PlaneDrawService } from './services/plane-draw.service';

export type ScreenLocation = 'left' | 'top' | 'right' | 'bottom';

@Component({
    selector: 'app-site',
    templateUrl: './site.component.html',
    styleUrls: ['./site.component.scss']
})
export class SiteComponent extends BaseComponent implements OnInit {
    @Input()
    public hasToolbar = true;

    @Input()
    public showPaintingUtensils = true;

    @Input()
    public locationPaintingUtensils: ScreenLocation = 'left';

    @Input()
    public showPaneHandler = true;

    @Input()
    public locationPaneHandler: ScreenLocation = 'right';

    @Input()
    public observeDrawing: Observable<DrawPoint>;

    @Input()
    public backgroundLayer: Plane;

    @Output()
    public cursorMove = new EventEmitter<Coordinates>();

    @Output()
    public cursorDraw = new EventEmitter<DrawPoint>();

    public constructor(private matDialog: MatDialog, private planeDrawService: PlaneDrawService) {
        super();
    }

    public ngOnInit(): void {
        this.planeDrawService.getDrawObservable().subscribe(event => this.cursorDraw.emit(event));
        this.planeDrawService.getMoveObservable().subscribe(event => this.cursorMove.emit(event));
    }

    public openCreateDialog(): void {
        this.matDialog.open(CreateCanvasDialogComponent, {
            ...infoDialogOptions,
            disableClose: true
        });
    }
}
