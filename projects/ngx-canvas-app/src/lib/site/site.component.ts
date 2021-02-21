import { BaseComponent } from '../core/base-components/base.component';
import { Observable } from 'rxjs';
import { infoDialogOptions } from '../ui/components/dialogs/dialog-options';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateCanvasDialogComponent } from '../ui/components/dialogs/create-canvas-dialog/create-canvas-dialog.component';
import { BackgroundLayer, PlaneService } from './services/plane.service';
import { Coordinates, DrawPoint, PlaneDrawService } from './services/plane-draw.service';
import { PlaneTransformationService } from './services/plane-transformation.service';

export type ScreenLocation = 'left' | 'top' | 'right' | 'bottom';

@Component({
    selector: 'app-site',
    templateUrl: './site.component.html',
    styleUrls: ['./site.component.scss']
})
export class SiteComponent extends BaseComponent implements OnInit, AfterViewInit {
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

    @Output()
    public cursorMove = new EventEmitter<Coordinates>();

    @Output()
    public cursorDraw = new EventEmitter<DrawPoint>();

    public constructor(
        private matDialog: MatDialog,
        private planeDrawService: PlaneDrawService,
        private planeService: PlaneService,
        private planeTransformation: PlaneTransformationService
    ) {
        super();
    }

    public ngOnInit(): void {
        this.planeDrawService.getDrawObservable().subscribe(event => this.cursorDraw.emit(event));
        this.planeDrawService.getMoveObservable().subscribe(event => this.cursorMove.emit(event));
        if (this.backgroundLayer) {
            this.planeService.initialize(this.backgroundLayer);
        }
    }

    public ngAfterViewInit(): void {
        if (this.appContent.nativeElement) {
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
