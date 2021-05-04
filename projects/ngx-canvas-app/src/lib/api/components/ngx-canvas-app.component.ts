import { Component, EventEmitter, Input, OnInit, Output, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { CreateCanvasDialogComponent } from '../../ui/components/dialogs/create-canvas-dialog/create-canvas-dialog.component';
import { infoDialogOptions } from '../../ui/components/dialogs/dialog-options';
import { Coordinate, DrawPoint, PlaneDrawService } from '../../site/services/plane-draw.service';
import { PlaneTransformationService } from '../../site/services/plane-transformation.service';
import { BackgroundLayer, PlaneService } from '../../site/services/plane.service';
import { ScreenLocation } from '../../site/site.component';

@Component({
    selector: 'ngx-canvas-app',
    templateUrl: './ngx-canvas-app.component.html',
    styleUrls: ['./ngx-canvas-app.component.scss']
})
export class NgxCanvasAppComponent implements OnInit, AfterViewInit {
    @ViewChild('ref', { static: false })
    public ref: ElementRef<HTMLElement>;

    @ViewChild('appContent', { static: true })
    public appContent: ElementRef<HTMLElement>;

    @Input()
    public hasToolbar = true;

    @Input()
    public showPaintingUtensils = true;

    @Input()
    public locationPaintingUtensils: ScreenLocation = 'left';

    @Input()
    public showPlaneHandler = true;

    @Input()
    public locationPaneHandler: ScreenLocation = 'right';

    @Input()
    public showFooter = true;

    @Input()
    public observeDrawing: Observable<DrawPoint>;

    @Input()
    public backgroundLayer: BackgroundLayer;

    @Input()
    public isPaintingEnabled = true;

    @Output()
    public cursorMove = new EventEmitter<Coordinate>();

    @Output()
    public cursorDraw = new EventEmitter<DrawPoint>();

    public get isVisible(): boolean {
        return this._isVisible;
    }

    private _isVisible = true;

    public constructor(
        private matDialog: MatDialog,
        private planeDrawService: PlaneDrawService,
        private planeService: PlaneService,
        private planeTransformation: PlaneTransformationService
    ) {}

    public ngOnInit(): void {
        this.planeDrawService.getDrawObservable().subscribe(event => this.cursorDraw.emit(event));
        this.planeDrawService.getMoveObservable().subscribe(event => this.cursorMove.emit(event));
        if (this.backgroundLayer) {
            this.planeService.initialize(this.backgroundLayer);
        }
        if (this.observeDrawing) {
            this.observeDrawing.subscribe(input => this.planeDrawService.onDrawingInput(input));
        }
    }

    public ngAfterViewInit(): void {
        if (this.ref && this.ref.nativeElement) {
            setTimeout(() => (this._isVisible = !!this.ref.nativeElement.children.length));
        }
        if (this.appContent && this.appContent.nativeElement) {
            this.appContent.nativeElement.addEventListener('wheel', event => this.onMouseWheel(event), {
                passive: true
            });
        }
    }

    public openCreateDialog(): void {
        this.matDialog.open(CreateCanvasDialogComponent, {
            ...infoDialogOptions,
            disableClose: true
        });
    }

    public onMouseWheel(event: WheelEvent): void {
        if (event.ctrlKey) {
            if (event.deltaY > 0) {
                this.planeTransformation.zoomOut();
            } else {
                this.planeTransformation.zoomIn();
            }
        } else if (event.altKey) {
            if (event.deltaY > 0) {
                this.planeTransformation.rotateLeft();
            } else {
                this.planeTransformation.rotateRight();
            }
        }
    }
}
