import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnInit,
    ViewChild
} from '@angular/core';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';

import { AsyncOperation } from '../../../core/util/async-operation';
import { BaseComponent } from '../../../core/base-components/base.component';
import { ColorService } from '../../services/color.service';
import { DrawPoint } from './../../services/plane-draw.service';
import { PlaneDrawService, Coordinates, DrawingMode } from '../../services/plane-draw.service';
import { PlaneTransformationService } from '../../services/plane-transformation.service';
import { Plane, PlaneService, PlaneSize } from '../../services/plane.service';

@Component({
    selector: 'app-plane-wrapper',
    templateUrl: './plane-wrapper.component.html',
    styleUrls: ['./plane-wrapper.component.scss']
})
export class PlaneWrapperComponent extends BaseComponent implements OnInit, AfterViewInit {
    @ViewChild('planeWrapper')
    public readonly planeWrapper: ElementRef<HTMLElement>;

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

    public currentDrawingMode: DrawingMode = 'pen';

    public startDrawingEvent = new EventEmitter<Coordinates>();
    public drawEvent = new EventEmitter<Coordinates>();
    public endDrawingEvent = new EventEmitter<Coordinates>();
    public inputDrawingEvent = new EventEmitter<DrawPoint>();

    private _planes: Plane[] = [];
    private _size: PlaneSize = { width: 0, height: 0 };

    private _color = '';
    private _strokeWidth = 2;

    private _activePlane: Plane;
    private _loaded = new AsyncOperation();

    private previousPointer: Coordinates = { x: 0, y: 0 };
    private nextPointer: Coordinates = { x: 0, y: 0 };
    private drawFn: (event: MouseEvent) => void;
    private isDrawing = false;
    private _isPaintingEnabled = true;

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

    public onMouseDown(event: MouseEvent): void {
        this.isDrawing = true;
        this.startDrawingEvent.emit({ x: event.offsetX, y: event.offsetY });
    }

    public onMouseUp(event: MouseEvent): void {
        this.endDrawingEvent.emit({ x: event.offsetX, y: event.offsetY });
        this.isDrawing = false;
    }

    public onMouseDraw(event: MouseEvent): void {
        this.previousPointer = this.nextPointer;
        this.nextPointer = { x: event.offsetX, y: event.offsetY };
        if (this.isDrawing) {
            const coordinates = this.nextPointer;
            this.drawEvent.emit(coordinates);
            this.planeDrawService.onDraw(
                { previousPointer: this.previousPointer, nextPointer: coordinates },
                this._activePlane.index
            );
        } else {
            this.planeDrawService.onMove(event);
        }
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
        this.planeWrapper.nativeElement.addEventListener('mousemove', this.drawFn);
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
        ];
    }

    private getColorSubscriptions(): Subscription[] {
        return [this.colorService.getColor().subscribe(nextColor => (this._color = nextColor))];
    }
}
