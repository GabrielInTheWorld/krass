import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { BaseComponent } from '../../../core/base-components/base.component';
import { Coordinates, DrawingMode, DrawPoint } from './../../../site/services/plane-draw.service';
import { Plane } from '../../../site/services/plane.service';

@Component({
    selector: 'app-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('canvas', { static: true })
    public readonly canvasWrapper: ElementRef<HTMLCanvasElement>;

    @Input()
    public plane: Plane;

    @Input()
    public set color(color: string) {
        this._color = color;
        this.initConfig();
    }

    @Input()
    public set isActive(active: Observable<boolean>) {
        this.subscribeToActive(active);
    }

    @Input()
    public startDrawing: Observable<Coordinates>;

    @Input()
    public draw: Observable<Coordinates>;

    @Input()
    public endDrawing: Observable<Coordinates>;

    @Input()
    public observeDrawing: Observable<DrawPoint>;

    @Input()
    public clearSiteObservable: Observable<void>;

    @Input()
    public set drawingMode(mode: DrawingMode) {
        this._drawingMode = mode;
        this.initDrawingMode();
    }

    @Input()
    public width = 210;

    @Input()
    public height = 297;

    @Input()
    public set strokeWidth(width: number) {
        this._strokeWidth = width;
        this.initConfig();
    }

    private canvas: HTMLCanvasElement;

    private context: CanvasRenderingContext2D;

    private mousePointer: Coordinates = { x: 0, y: 0 };
    private secondPointer: Coordinates = { x: 0, y: 0 };

    private activeSubscription: Subscription = null;

    private _strokeWidth = 2;
    private _color = '#000';
    private _drawingMode: DrawingMode = 'pen';

    private activeMouseFn: () => void = () => {};

    public constructor() {
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
            this.initConfig();
        }
        this.initDrawListeners();
        this.initDrawingMode();
        this.initSubscriptions();
    }

    public onMouseDown(event: Coordinates): void {
        this.mousePointer.x = this.secondPointer.x;
        this.mousePointer.y = this.secondPointer.y;
        this.secondPointer = { ...event };
    }

    public onMouseUp(): void {
        this.resetPointer();
    }

    public onMouseMove(event: Coordinates): void {
        this.mousePointer.x = this.secondPointer.x;
        this.mousePointer.y = this.secondPointer.y;
        this.secondPointer.x = event.x;
        this.secondPointer.y = event.y;
        this.activeMouseFn();
    }

    public setColor(color: string): void {
        this.context.strokeStyle = color;
    }

    public setStrokeWidth(width: number): void {
        this.context.lineWidth = width;
    }

    private onDrawingInput(input: DrawPoint): void {
        switch (input.mode) {
            case 'pen':
                this.onDrawFreeHand(input.previousPointer, input.nextPointer, input.color, 2);
                break;
            case 'eraser':
                this.onErase(input.nextPointer);
                break;
        }
    }

    private onDrawFreeHand(
        firstPointer: Coordinates,
        secondPointer: Coordinates,
        color: string,
        strokeWidth: number
    ): void {
        this.context.beginPath();
        this.context.globalCompositeOperation = 'source-over';
        this.context.moveTo(firstPointer.x, firstPointer.y);
        this.context.lineTo(secondPointer.x, secondPointer.y);
        this.context.strokeStyle = color;
        this.context.lineWidth = strokeWidth;
        this.context.stroke();
        this.context.closePath();
    }

    private onErase(pointer: Coordinates): void {
        this.context.beginPath();
        this.context.globalCompositeOperation = 'destination-out';
        this.context.arc(pointer.x, pointer.y, 8, 0, Math.PI * 2, false);
        this.context.fill();
        this.context.closePath();
    }

    private onClear(): void {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    private initConfig(): void {
        if (this.context) {
            this.setColor(this._color);
            this.setStrokeWidth(this._strokeWidth);
        }
    }

    private initDrawingMode(): void {
        switch (this._drawingMode) {
            case 'pen':
                this.activeMouseFn = () =>
                    this.onDrawFreeHand(this.mousePointer, this.secondPointer, this._color, this._strokeWidth);
                break;
            case 'eraser':
                this.activeMouseFn = () => this.onErase(this.secondPointer);
                break;
        }
    }

    private resetPointer(): void {
        this.mousePointer = { x: 0, y: 0 };
        this.secondPointer = { x: 0, y: 0 };
    }

    private initDrawListeners(): void {
        if (!this.startDrawing || !this.endDrawing || !this.draw) {
            return;
        }
        this.subscriptions.push(
            this.startDrawing.subscribe(pointer => this.onMouseDown(pointer)),
            this.endDrawing.subscribe(() => this.onMouseUp()),
            this.draw.subscribe(pointer => this.onMouseMove(pointer)),
            this.observeDrawing.subscribe(input => this.onDrawingInput(input))
        );
    }

    private initSubscriptions(): void {
        if (this.clearSiteObservable) {
            this.subscriptions.push(this.clearSiteObservable.subscribe(() => this.onClear()));
        }
    }

    private removeDrawListeners(): void {
        this.cleanSubscriptions();
    }

    private subscribeToActive(observable: Observable<boolean>): void {
        if (!observable || this.activeSubscription) {
            return;
        }
        this.activeSubscription = observable.subscribe(isActive => {
            if (isActive) {
                this.initDrawListeners();
            } else {
                this.removeDrawListeners();
            }
        });
    }
}
