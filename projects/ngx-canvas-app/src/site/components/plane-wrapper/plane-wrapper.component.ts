import { PlaneTransformationService } from './../../services/plane-transformation.service';
import { PlaneDrawService, Coordinates } from './../../services/plane-draw.service';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { ColorService } from './../../services/color.service';
import { Plane, PlaneService } from './../../services/plane.service';
import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../core/base-components/base.component';

@Component({
    selector: 'app-plane-wrapper',
    templateUrl: './plane-wrapper.component.html',
    styleUrls: ['./plane-wrapper.component.scss']
})
export class PlaneWrapperComponent extends BaseComponent implements OnInit, AfterViewInit {
    @ViewChild('planeWrapper')
    public readonly planeWrapper: ElementRef<HTMLElement>;

    public get planes(): Plane[] {
        return this._planes;
    }

    public get currentColor(): string {
        return this._color;
    }

    public planeMap: { [key: string]: BehaviorSubject<boolean> } = {};

    public startDrawingEvent = new EventEmitter<Coordinates>();
    public drawEvent = new EventEmitter<Coordinates>();
    public endDrawingEvent = new EventEmitter<Coordinates>();

    private _planes: Plane[] = [];

    private _color = '';

    private _activePlane: Plane;

    private drawFn: (event: MouseEvent) => void;
    private moveFn: (event: MouseEvent) => void;

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
        this.drawFn = event => {
            this.onMouseDraw(event);
        };
        this.moveFn = event => {
            this.onMouseMove(event);
        };
    }

    public ngAfterViewInit(): void {
        this.initMoveListeners();
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
        this.startDrawingEvent.emit({ x: event.offsetX, y: event.offsetY });
        this.initDrawListeners();
        this.removeMoveListeners();
    }

    public onMouseUp(event: MouseEvent): void {
        this.endDrawingEvent.emit({ x: event.offsetX, y: event.offsetY });
        this.removeDrawListeners();
        this.initMoveListeners();
    }

    public onMouseDraw(event: MouseEvent): void {
        const coordinates = { x: event.offsetX, y: event.offsetY };
        this.drawEvent.emit(coordinates);
        this.planeDrawService.onDraw(coordinates, this._activePlane.index);
    }
    public onMouseMove(event: MouseEvent): void {
        this.planeDrawService.onMove(event);
    }

    private initDrawListeners(): void {
        this.planeWrapper.nativeElement.addEventListener('mousemove', this.drawFn);
        this.planeWrapper.nativeElement.addEventListener('pointermove', this.drawFn);
    }

    private initMoveListeners(): void {
        this.planeWrapper.nativeElement.addEventListener('mousemove', this.moveFn);
        this.planeWrapper.nativeElement.addEventListener('pointermove', this.moveFn);
    }

    private removeDrawListeners(): void {
        this.planeWrapper.nativeElement.removeEventListener('mousemove', this.drawFn);
        this.planeWrapper.nativeElement.removeEventListener('pointermove', this.drawFn);
    }

    private removeMoveListeners(): void {
        this.planeWrapper.nativeElement.removeEventListener('mousemove', this.moveFn);
        this.planeWrapper.nativeElement.removeEventListener('pointermove', this.moveFn);
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
                if (planes) {
                    this.initPlanes(planes);
                }
            }),
            this.planeTransformation.transformationObservable.subscribe(transformation =>
                this.applyTransformation(transformation)
            ),
            this.planeService.getActivePlane().subscribe(activePlane => {
                this._activePlane = activePlane;
                this.initActivePlane();
            })
        ];
    }

    private getColorSubscriptions(): Subscription[] {
        return [this.colorService.getColor().subscribe(nextColor => (this._color = nextColor))];
    }
}
