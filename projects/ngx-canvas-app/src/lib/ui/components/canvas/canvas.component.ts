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
    // selector: 'ngx-canvas',
    // templateUrl: './canvas.component.html',
    // styleUrls: ['./canvas.component.scss'],
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export abstract class CanvasComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('canvas', { static: true })
    public readonly canvasWrapper: ElementRef<HTMLCanvasElement>;

    // @Input()
    // public isPreview = false;

    @Input()
    public plane: Plane;

    @Input()
    public observeDrawing: Observable<DrawPoint>;

    @Input()
    public drawObservable: Observable<DrawPoint>;

    @Input()
    public previewDrawObservable: Observable<DrawPoint>;

    @Input()
    public clearSiteObservable: Observable<void>;

    public width = 210;

    public height = 297;

    public abstract get zIndex(): number; /* {
        if (this.isPreview) {
            return 1000;
        } else {
            return this.plane?.index || 0;
        }
    } */

    protected canvas: HTMLCanvasElement;

    protected context: CanvasRenderingContext2D;

    public constructor(
        protected cd: ChangeDetectorRef,
        protected planeService: PlaneService,
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

    protected onDrawingInput(input: DrawPoint): void {
        console.log('onDrawingInput', input);
        // this.prepareDraw(input.color, input.size);
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

    protected onDrawFreeHand(drawCoordinates: DrawCoordinate[], color: string, strokeWidth: number): void {
        // this.context.lineJoin = 'round';
        // this.context.strokeStyle = color;
        // this.context.lineWidth = strokeWidth * 2;
        // this.context.globalCompositeOperation = 'source-over';
        // this.context.beginPath();
        drawCoordinates.forEach(drawCoordinate => {
            this.prepareDraw(color, strokeWidth);
            this.context.beginPath();
            this.context.moveTo(drawCoordinate.previousPointer.x, drawCoordinate.previousPointer.y);
            this.context.lineTo(drawCoordinate.nextPointer.x, drawCoordinate.nextPointer.y);
            this.context.closePath();
            this.context.stroke();
        });
        // this.context.closePath();
        // this.context.stroke();
    }

    protected onErase(drawCoordinates: DrawCoordinate[], clearSize: number): void {
        this.context.lineWidth = clearSize;
        this.context.globalCompositeOperation = 'destination-out';
        this.context.beginPath();
        // this.context.arc(secondPointer.x, secondPointer.y, clearSize / 2, 0, Math.PI * 2, false);
        // this.context.fill();
        // this.context.moveTo(firstPointer.x, firstPointer.y);
        // this.context.lineTo(secondPointer.x, secondPointer.y);
        this.context.closePath();
    }

    protected onClear(
        firstCoordinate: Coordinate = { x: 0, y: 0 },
        secondCoordinate: Coordinate = { x: this.width, y: this.height }
    ): void {
        this.context.clearRect(firstCoordinate.x, firstCoordinate.y, secondCoordinate.x, secondCoordinate.y);
    }

    protected onDrawCircle(drawCoordinate: DrawCoordinate, size: number, color: Color): void {
        const { previousPointer, nextPointer } = drawCoordinate;
        // const radius = this.getRadius(previousPointer, nextPointer);
        this.context.beginPath();
        this.context.ellipse(
            previousPointer.x,
            previousPointer.y,
            Math.abs(nextPointer.x - previousPointer.x) + size / 2,
            Math.abs(nextPointer.y - previousPointer.y) + size / 2,
            0,
            0,
            2 * Math.PI
        );
        this.context.closePath();
        this.context.stroke();
    }

    protected getSubscriptions(): Subscription[] {
        return [];
    }

    protected initDrawListeners(): void {
        if (!this.drawObservable) {
            return;
        }
        this.subscriptions.push(
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
            }),
            ...this.getSubscriptions()
        );
        // if (!this.isPreview) {
        //     this.subscriptions.push(
        //         this.planeService.getActivePlane().subscribe(activePlane => {
        //             if (activePlane === this.plane) {
        //                 this.cd.reattach();
        //                 this.initDrawListeners();
        //             } else {
        //                 this.removeDrawListeners();
        //                 this.cd.detach();
        //             }
        //         })
        //     );
        // } else {
        //     this.subscriptions.push(this.previewDrawObservable.subscribe(drawPoint => this.onDrawingInput(drawPoint)));
        // }
    }

    protected removeDrawListeners(): void {
        this.cleanSubscriptions();
    }

    private prepareDraw(color: Color, strokeWidth: number): void {
        this.context.lineJoin = 'round';
        this.context.strokeStyle = color;
        this.context.lineWidth = strokeWidth;
        this.context.globalCompositeOperation = 'source-over';
    }

    private getRadius(firstCoordinate: Coordinate, secondCoordinate: Coordinate): number {
        return Math.sqrt(
            Math.abs(firstCoordinate.x - secondCoordinate.x) ** 2 + Math.abs(firstCoordinate.y - secondCoordinate.y)
        );
    }
}
