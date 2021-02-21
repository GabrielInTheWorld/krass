import { Observable } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ScreenLocation } from '../../site/site.component';
import { Coordinates, DrawPoint } from '../../site/services/plane-draw.service';
import { BackgroundLayer } from '../../site/services/plane.service';

@Component({
    selector: 'ngx-canvas-app',
    templateUrl: './ngx-canvas-app.component.html',
    styles: []
})
export class NgxCanvasAppComponent implements OnInit {
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

    public constructor() {}

    public ngOnInit(): void {}
}
