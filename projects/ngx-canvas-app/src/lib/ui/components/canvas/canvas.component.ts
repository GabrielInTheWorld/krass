import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewChild,
    OnDestroy,
    ChangeDetectorRef,
    ChangeDetectionStrategy
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { BaseComponent } from '../../../core/base-components/base.component';
import {
    Color,
    Coordinate,
    DrawCoordinate,
    DrawingMode,
    DrawPoint,
    PlaneDrawService
} from './../../../site/services/plane-draw.service';
import { PlaneService, Plane } from '../../../site/services/plane.service';

@Component({
    selector: 'ngx-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['./canvas.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CanvasComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('canvas', { static: true })
    public readonly canvasWrapper: ElementRef<HTMLCanvasElement>;

    @Input()
    public isPreview = false;

    @Input()
    public plane: Plane;

    // @Input()
    // public set color(color: string) {
    //     this._color = color;
    //     this.initConfig();
    // }

    // @Input()
    // public set isActive(active: Observable<boolean>) {
    //     this.subscribeToActive(active);
    // }

    // @Input()
    // public startDrawing: Observable<Coordinate>;

    // @Input()
    // public draw: Observable<Coordinate>;

    // @Input()
    // public endDrawing: Observable<Coordinate>;

    @Input()
    public observeDrawing: Observable<DrawPoint>;

    @Input()
    public drawObservable: Observable<DrawPoint>;

    @Input()
    public previewDrawObservable: Observable<DrawPoint>;

    @Input()
    public clearSiteObservable: Observable<void>;

    // @Input()
    // public set drawingMode(mode: DrawingMode) {
    //     this._drawingMode = mode;
    //     // this.initDrawingMode();
    // }

    // @Input()
    public width = 210;

    // @Input()
    public height = 297;

    // @Input()
    // public set strokeWidth(width: number) {
    //     this._strokeWidth = width;
    //     this.initConfig();
    // }

    public get zIndex(): number {
        if (this.isPreview) {
            return 1000;
        } else {
            return this.plane?.index || 0;
        }
    }

    private canvas: HTMLCanvasElement;

    private context: CanvasRenderingContext2D;

    // private mousePointer: Coordinate = { x: 0, y: 0 };
    // private secondPointer: Coordinate = { x: 0, y: 0 };

    // private activeSubscription: Subscription = null;

    // private _strokeWidth = 2;
    // private _color = '#000';
    // private _drawingMode: DrawingMode = 'pen';

    // private activeMouseFn: () => void = () => {};

    public constructor(
        private cd: ChangeDetectorRef,
        private planeService: PlaneService,
        private planeDrawService: PlaneDrawService
    ) {
        super();
    }

    public ngOnInit(): void {}

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    public ngAfterViewInit(): void {
        if (this.canvasWrapper) {
            this.canvas = this.canvasWrapper.nativeElement;
            this.context = this.canvas.getContext('2d');
            // this.initConfig();
        }
        // this.initDrawListeners();
        // this.initDrawingMode();
        this.initSubscriptions();
    }

    // private onMouseDown(event: Coordinate): void {
    //     // console.log('mousedown', this.plane.id, event);
    //     // this.mousePointer.x = this.secondPointer.x;
    //     // this.mousePointer.y = this.secondPointer.y;
    //     // this.secondPointer = { ...event };
    //     // console.log('activeMouseFn:', this.mousePointer, this.secondPointer);
    // }

    // private onMouseUp(): void {
    //     // this.resetPointer();
    // }

    // private onMouseMove(event: Coordinate): void {
    //     // this.mousePointer.x = this.secondPointer.x;
    //     // this.mousePointer.y = this.secondPointer.y;
    //     // this.secondPointer.x = event.x;
    //     // this.secondPointer.y = event.y;
    //     // this.activeMouseFn();
    // }

    // private setColor(color: string): void {
    //     this.context.strokeStyle = color;
    // }

    // private setStrokeWidth(width: number): void {
    //     this.context.lineWidth = width;
    // }

    private onDrawingInput(input: DrawPoint): void {
        console.log('onDrawingInput', input);
        switch (input.mode) {
            case 'pen':
                this.onDrawFreeHand(input.drawCoordinates, input.color, input.size);
                break;
            case 'eraser':
                this.onErase(input.drawCoordinates, input.size);
                break;
            case 'delete':
                this.onClear(input.drawCoordinates[0].previousPointer, input.drawCoordinates[0].nextPointer);
                break;
            case 'circle':
                this.onDrawCircle(input.drawCoordinates[0], input.size, input.color);
                break;
            case 'rectangle':
                break;
        }
    }

    private onDrawFreeHand(
        // firstPointer: Coordinates,
        // secondPointer: Coordinates,
        drawCoordinates: DrawCoordinate[],
        color: string,
        strokeWidth: number
    ): void {
        // console.log('onDrawFreeHand', drawCoordinates);
        this.context.lineJoin = 'round';
        this.context.strokeStyle = color;
        this.context.lineWidth = strokeWidth;
        this.context.globalCompositeOperation = 'source-over';
        this.context.beginPath();
        drawCoordinates.forEach(drawCoordinate => {
            this.context.moveTo(drawCoordinate.previousPointer.x, drawCoordinate.previousPointer.y);
            this.context.lineTo(drawCoordinate.nextPointer.x, drawCoordinate.nextPointer.y);
        });
        this.context.closePath();
        this.context.stroke();
    }

    private onErase(drawCoordinates: DrawCoordinate[], clearSize: number): void {
        this.context.lineWidth = clearSize;
        this.context.globalCompositeOperation = 'destination-out';
        this.context.beginPath();
        // this.context.arc(secondPointer.x, secondPointer.y, clearSize / 2, 0, Math.PI * 2, false);
        // this.context.fill();
        // this.context.moveTo(firstPointer.x, firstPointer.y);
        // this.context.lineTo(secondPointer.x, secondPointer.y);
        this.context.closePath();
    }

    private onClear(
        firstCoordinate: Coordinate = { x: 0, y: 0 },
        secondCoordinate: Coordinate = { x: this.width, y: this.height }
    ): void {
        this.context.clearRect(firstCoordinate.x, firstCoordinate.y, secondCoordinate.x, secondCoordinate.y);
    }

    private onDrawCircle(drawCoordinate: DrawCoordinate, size: number, color: Color): void {
        const { previousPointer, nextPointer } = drawCoordinate;
        const radius = this.getRadius(previousPointer, nextPointer);
        this.context.beginPath();
        this.context.arc(previousPointer.x, previousPointer.y, radius, 0, 2 * Math.PI);
        this.context.closePath();
        this.context.stroke();
    }

    // private initConfig(): void {
    //     if (this.context) {
    //         this.setColor(this._color);
    //         this.setStrokeWidth(this._strokeWidth);
    //     }
    // }

    // private initDrawingMode(): void {
    //     // switch (this._drawingMode) {
    //     //     case 'pen':
    //     //         this.activeMouseFn = () =>
    //     //             this.onDrawFreeHand(this.mousePointer, this.secondPointer, this._color, this._strokeWidth);
    //     //         break;
    //     //     case 'eraser':
    //     //         this.activeMouseFn = () => this.onErase(this.mousePointer, this.secondPointer, this._strokeWidth);
    //     //         break;
    //     // }
    // }

    // private resetPointer(): void {
    //     this.mousePointer = { x: 0, y: 0 };
    //     this.secondPointer = { x: 0, y: 0 };
    // }

    private initDrawListeners(): void {
        // console.log('initDrawListeners', this.plane.id);
        // if (!this.startDrawing || !this.endDrawing || !this.draw) {
        //     return;
        // }
        if (!this.drawObservable) {
            return;
        }
        this.subscriptions.push(
            // this.startDrawing.subscribe(pointer => this.onMouseDown(pointer)),
            // this.endDrawing.subscribe(() => this.onMouseUp()),
            // this.draw.subscribe(pointer => this.onMouseMove(pointer)),
            this.drawObservable.subscribe(drawPoint => this.onDrawingInput(drawPoint)),
            this.observeDrawing.subscribe(input => this.onDrawingInput(input))
        );
    }

    private initSubscriptions(): void {
        this.subscriptions.push(
            this.clearSiteObservable.subscribe(() => this.onClear()),
            this.planeService.sizeObservable.subscribe(currentSize => {
                console.log('currentSize:', currentSize);
                setTimeout(() => {
                    this.width = currentSize.width;
                    this.height = currentSize.height;
                    this.cd.markForCheck();
                    this.cd.detectChanges();
                });
            })
        );
        if (!this.isPreview) {
            this.subscriptions.push(
                this.planeService.getActivePlane().subscribe(activePlane => {
                    if (activePlane === this.plane) {
                        this.cd.reattach();
                        this.initDrawListeners();
                    } else {
                        this.removeDrawListeners();
                        this.cd.detach();
                    }
                })
            );
        } else {
            this.subscriptions.push(this.previewDrawObservable.subscribe(drawPoint => this.onDrawingInput(drawPoint)));
        }
    }

    private removeDrawListeners(): void {
        this.cleanSubscriptions();
    }

    private getRadius(firstCoordinate: Coordinate, secondCoordinate: Coordinate): number {
        return Math.sqrt(
            Math.abs(firstCoordinate.x - secondCoordinate.x) ** 2 + Math.abs(firstCoordinate.y - secondCoordinate.y)
        );
    }

    // private subscribeToActive(observable: Observable<boolean>): void {
    //     // if (!observable || this.activeSubscription) {
    //     //     return;
    //     // }
    //     // this.activeSubscription = observable.subscribe(isActive => {
    //     //     if (isActive) {
    //     //         this.initDrawListeners();
    //     //         this.cd.reattach();
    //     //     } else {
    //     //         this.removeDrawListeners();
    //     //         this.cd.detach();
    //     //     }
    //     // });
    // }
}
