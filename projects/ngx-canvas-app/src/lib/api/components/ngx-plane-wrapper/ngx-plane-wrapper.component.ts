import { AfterViewInit, EventEmitter, HostListener } from '@angular/core';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { BaseComponent } from '../../../core/base-components/base.component';
import { AsyncOperation } from '../../../core/util/async-operation';
import { ColorService } from '../../../site/services/color.service';
import {
    Color,
    Coordinate,
    DrawCoordinate,
    DrawingMode,
    DrawPoint,
    PlaneDrawService
} from '../../../site/services/plane-draw.service';
import { PlaneTransformationService } from '../../../site/services/plane-transformation.service';
import { Plane, PlaneService, PlaneSize } from '../../../site/services/plane.service';

const LEFT_CLICK = 0;
const RIGHT_CLICK = 2;
const RUBBER = 5; // Microsoft pen

@Component({
    selector: 'ngx-plane-wrapper',
    templateUrl: './ngx-plane-wrapper.component.html',
    styleUrls: ['./ngx-plane-wrapper.component.scss']
})
export class NgxPlaneWrapperComponent extends BaseComponent implements OnInit, AfterViewInit {
    @ViewChild('planeWrapper')
    public readonly planeWrapper: ElementRef<HTMLElement>;

    @ViewChild('preview')
    public readonly preview: ElementRef<HTMLCanvasElement>;

    @Input()
    public set isPaintingEnabled(isEnabled: boolean) {
        this._isPaintingEnabled = isEnabled;
        this.initPainting();
    }

    public get strokeWidth(): number {
        return this._strokeWidth;
    }

    public get width(): string {
        return `${this._size.width}px`;
    }

    public get height(): string {
        return `${this._size.height}px`;
    }

    public get size(): PlaneSize {
        return this._size;
    }

    // public get firstPlane(): Plane {
    //     return this.planes[0];
    // }

    public get planes(): Plane[] {
        return this._planes;
    }

    public get currentColor(): string {
        return this._color;
    }

    public get clearSiteObservable(): Observable<void> {
        return this.planeDrawService.getClearSiteObservable();
    }

    public planeMap: { [key: string]: BehaviorSubject<boolean> } = {};
    public previewClearSubject = new Subject<void>();

    public currentDrawingMode: DrawingMode = 'pen';

    // public startDrawingEvent = new EventEmitter<Coordinates>();
    // public drawEvent = new EventEmitter<Coordinates>();
    // public endDrawingEvent = new EventEmitter<Coordinates>();
    public inputDrawingEvent = new EventEmitter<DrawPoint>();

    public previewDrawEvent = new EventEmitter<DrawPoint>();
    public drawEvent = new EventEmitter<DrawPoint>();

    private _planes: Plane[] = [];
    private _size: PlaneSize = { width: 0, height: 0 };

    private _color = '';
    private _strokeWidth = 2;

    private _activePlane: Plane;
    private _loaded = new AsyncOperation();
    private _isPaintingEnabled = true;

    private previousPointer: Coordinate = { x: 0, y: 0 };
    private nextPointer: Coordinate = { x: 0, y: 0 };
    private drawFn: (event: MouseEvent) => void;
    private isDrawing = false;
    private drawStore: DrawPoint[] = [];
    private currentDrawStoreIndex = 0;
    private currentDrawStore: DrawCoordinate[] = [];

    public constructor(
        private planeService: PlaneService,
        private planeTransformation: PlaneTransformationService,
        private planeDrawService: PlaneDrawService,
        private colorService: ColorService
    ) {
        super();
    }

    public ngOnInit(): void {
        this.subscriptions.push(...this.getPlaneSubscriptions(), ...this.getColorSubscriptions());
    }

    public ngAfterViewInit(): void {
        this._loaded.resolve();
    }

    @HostListener('document:keydown', ['$event'])
    public onKeydownListener(event: KeyboardEvent): void {}

    @HostListener('document:keyup', ['$event'])
    public onKeyupListener(event: KeyboardEvent): void {}

    public getActivePlaneObservableByPlane(plane: Plane): Observable<boolean> {
        if (this.planeMap[plane.id]) {
            return this.planeMap[plane.id].asObservable();
        }
    }

    public onMouseDown(event: PointerEvent): void {
        if (event.button === LEFT_CLICK && this._isPaintingEnabled) {
            // console.log('startDrawing', event);
            this.isDrawing = true;
            const currentPoint: Coordinate = { x: event.offsetX, y: event.offsetY };
            // this.addDrawPoint(currentPoint, currentPoint);
            this.addSpecifcDrawPoint(currentPoint, currentPoint, { mode: 'circle' });
            // this.startDrawingEvent.emit({ x: event.offsetX, y: event.offsetY });
        }
    }

    public onMouseUp(event: MouseEvent): void {
        // this.endDrawingEvent.emit({ x: event.offsetX, y: event.offsetY });
        // console.log('endDrawing', event);
        this.isDrawing = false;
        // const currentDrawingPoints = this.currentDrawStore.pop()
        const nextDrawPoint: DrawPoint = {
            color: this.currentColor,
            layer: this._activePlane.index,
            mode: this.planeDrawService.currentDrawingMode,
            size: this.planeDrawService.currentSize,
            drawCoordinates: this.currentDrawStore
        };
        this.drawStore.push(nextDrawPoint);
        this.drawEvent.emit(nextDrawPoint);
        this.currentDrawStore = [];
        ++this.currentDrawStoreIndex;
        this.previewClearSubject.next();
    }

    public onMouseDraw(event: MouseEvent): void {
        this.previousPointer = this.nextPointer;
        this.nextPointer = { x: event.offsetX, y: event.offsetY };
        if (this.isDrawing) {
            // console.log('onMouseDraw');
            // const coordinates = this.nextPointer;
            // this.drawEvent.emit(coordinates);
            this.addDrawPoint(this.previousPointer, this.nextPointer);
            this.planeDrawService.onDraw(
                { previousPointer: this.previousPointer, nextPointer: this.nextPointer },
                this._activePlane.index
            );
        } else {
            this.planeDrawService.onMove(event);
        }
    }

    private addDrawPoint(previousPointer: Coordinate, nextPointer: Coordinate): void {
        const drawCoordinate: DrawCoordinate = {
            previousPointer,
            nextPointer
        };
        const currentDrawPoint: DrawPoint = {
            color: this.currentColor,
            layer: this._activePlane.index,
            mode: this.planeDrawService.currentDrawingMode,
            size: this.planeDrawService.currentSize,
            drawCoordinates: [drawCoordinate]
        };
        this.currentDrawStore.push(drawCoordinate);
        this.previewDrawEvent.emit(currentDrawPoint);
    }

    private addSpecifcDrawPoint(
        previousPointer: Coordinate,
        nextPointer: Coordinate,
        optionalArgs: { mode?: DrawingMode; color?: Color; size?: number } = {}
    ): void {
        optionalArgs = {
            mode: this.planeDrawService.currentDrawingMode,
            size: this.planeDrawService.currentSize,
            color: this.currentColor,
            ...optionalArgs
        };
        const drawCoordinate: DrawCoordinate = {
            previousPointer,
            nextPointer
        };
        const nextDrawPoint: DrawPoint = {
            drawCoordinates: [drawCoordinate],
            color: optionalArgs.color,
            mode: optionalArgs.mode,
            size: optionalArgs.size,
            layer: this._activePlane.index
        };
        this.currentDrawStore.push(drawCoordinate);
        this.previewDrawEvent.emit(nextDrawPoint);
    }

    private onMouseMove(event: MouseEvent): void {
        this.nextPointer.x = event.offsetX;
        this.nextPointer.y = event.offsetY;
        this.planeDrawService.onMove(event);
    }

    private initPainting(): void {
        if (this._isPaintingEnabled) {
            this.drawFn = event => {
                this.onMouseDraw(event);
            };
        } else {
            this.drawFn = event => {
                this.onMouseMove(event);
            };
        }
        this.initDrawListeners();
    }

    private async initDrawListeners(): Promise<void> {
        await this._loaded;
        // this.planeWrapper.nativeElement.addEventListener('mousemove', this.drawFn);
        this.planeWrapper.nativeElement.addEventListener('pointermove', this.drawFn);
    }

    private applyTransformation(nextTransformation: string): void {
        if (this.planeWrapper) {
            const style = this.planeWrapper.nativeElement.style;
            style.transform = nextTransformation;
        }
    }

    private initPlanes(planes: Plane[]): void {
        this.planeMap = {};
        this._planes = planes;
        for (const plane of planes) {
            this.planeMap[plane.id] = new BehaviorSubject<boolean>(false);
        }
        this.initActivePlane();
    }

    private initActivePlane(): void {
        if (this._activePlane) {
            this.planeMap[this._activePlane.id].next(true);
        }
    }

    private getPlaneSubscriptions(): Subscription[] {
        return [
            this.planeService.planesObservable.subscribe(planes => {
                if (planes && !!planes.length) {
                    this.initPlanes(planes);
                    this.initPainting();
                }
            }),
            this.planeTransformation.transformationObservable.subscribe(transformation =>
                this.applyTransformation(transformation)
            ),
            this.planeService.getActivePlane().subscribe(activePlane => {
                this._activePlane = activePlane;
                this.initActivePlane();
            }),
            this.planeService.sizeObservable.subscribe(planeSize => {
                if (planeSize) {
                    this._size = planeSize;
                }
            }),
            this.planeDrawService.getDrawingModeObservable().subscribe(mode => {
                if (mode) {
                    this.currentDrawingMode = mode;
                }
            }),
            this.planeDrawService.getDrawingInputObservable().subscribe(input => {
                this.inputDrawingEvent.emit(input);
            }),
            this.planeDrawService.getDrawingSizeObservable().subscribe(strokeWidth => (this._strokeWidth = strokeWidth))
            // this.startDrawingEvent.subscribe(event => console.log('received from startDrawing:', event))
        ];
    }

    private getColorSubscriptions(): Subscription[] {
        return [this.colorService.getColor().subscribe(nextColor => (this._color = nextColor))];
    }
}
