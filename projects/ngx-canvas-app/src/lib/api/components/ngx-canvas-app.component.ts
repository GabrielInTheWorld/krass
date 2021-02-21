import { Component, EventEmitter, Input, OnInit, Output, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';

import { Coordinates, DrawPoint } from '../../site/services/plane-draw.service';
import { BackgroundLayer } from '../../site/services/plane.service';
import { ScreenLocation } from '../../site/site.component';

@Component({
    selector: 'ngx-canvas-app',
    templateUrl: './ngx-canvas-app.component.html',
    styles: []
})
export class NgxCanvasAppComponent implements OnInit, AfterViewInit {
    @ViewChild('ref', { static: false })
    public ref: ElementRef<HTMLElement>;

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
    public cursorMove = new EventEmitter<Coordinates>();

    @Output()
    public cursorDraw = new EventEmitter<DrawPoint>();

    public get isVisible(): boolean {
        return this._isVisible;
    }

    private _isVisible = true;

    public constructor() {}

    public ngOnInit(): void {}

    public ngAfterViewInit(): void {
        if (this.ref && this.ref.nativeElement) {
            setTimeout(() => (this._isVisible = !!this.ref.nativeElement.children.length));
        }
    }
}
