import { BaseComponent } from '../../core/base-components/base.component';
import { Observable, Subscription } from 'rxjs';
import { Coordinates } from './../../site/services/plane-draw.service';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Plane } from '../../site/services/plane.service';

@Component({
    selector: 'app-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit {
    public static readonly CENTIMETER_PER_INCH = 2.54;

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
    public pixelDensity = 72;

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
    private activeSubscription: Subscription = null;

    private _strokeWidth = 2;
    private _color = '#000';

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
            this.canvas.width = this.getWidth();
            this.canvas.height = this.getHeight();
            this.context = this.canvas.getContext('2d');
            this.context.lineCap = 'round';
            this.context.lineJoin = 'round';
            this.initConfig();
        }
        this.initDrawListeners();
    }

    public onMouseDown(event: Coordinates): void {
        this.context.beginPath();
        this.context.moveTo(event.x, event.y);
    }

    public onMouseUp(): void {
        this.context.closePath();
        this.resetPointer();
    }

    public onMouseMove(event: Coordinates): void {
        this.mousePointer.x = event.x;
        this.mousePointer.y = event.y;
        this.onPaint();
    }

    public setColor(color: string): void {
        this.context.strokeStyle = color;
    }

    public setStrokeWidth(width: number): void {
        this.context.lineWidth = width;
    }

    public getWidth(): number {
        return ((this.width / 10) * this.pixelDensity) / CanvasComponent.CENTIMETER_PER_INCH;
    }

    public getHeight(): number {
        return ((this.height / 10) * this.pixelDensity) / CanvasComponent.CENTIMETER_PER_INCH;
    }

    private onPaint(): void {
        this.context.lineTo(this.mousePointer.x, this.mousePointer.y);
        this.context.stroke();
    }

    private initConfig(): void {
        if (this.context) {
            this.setColor(this._color);
            this.setStrokeWidth(this._strokeWidth);
        }
    }

    private resetPointer(): void {
        this.mousePointer = { x: 0, y: 0 };
    }

    private initDrawListeners(): void {
        if (!this.startDrawing || !this.endDrawing || !this.draw) {
            return;
        }
        this.subscriptions.push(
            this.startDrawing.subscribe(pointer => this.onMouseDown(pointer)),
            this.endDrawing.subscribe(() => this.onMouseUp()),
            this.draw.subscribe(pointer => this.onMouseMove(pointer))
        );
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
