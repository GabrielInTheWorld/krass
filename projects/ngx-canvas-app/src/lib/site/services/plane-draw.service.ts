import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';

import { ColorService } from './color.service';
import { PlaneService } from './plane.service';

export type Color = string;
export type DrawingMode = 'pen' | 'eraser' | 'delete' | 'circle' | 'rectangle';

export interface DrawCoordinate {
    previousPointer: Coordinate;
    nextPointer: Coordinate;
}

export interface Coordinate {
    x: number;
    y: number;
}

export interface DrawPoint {
    mode: DrawingMode;
    drawCoordinates: DrawCoordinate[];
    // previousPointer: Coordinates;
    // nextPointer: Coordinates;
    color: Color;
    layer: number;
    size: number;
}

@Injectable({
    providedIn: 'root'
})
export class PlaneDrawService {
    public get currentDrawingMode(): DrawingMode {
        return this.drawingModeSubject.value;
    }

    public get currentSize(): number {
        return this.drawSizeSubject.value;
    }

    private readonly drawSizeSubject = new BehaviorSubject<number>(4);
    private readonly drawSubject = new BehaviorSubject<DrawPoint>(null);
    private readonly inputDrawSubject = new BehaviorSubject<DrawPoint>(null);
    private readonly moveSubject = new BehaviorSubject<Coordinate>(null);
    private readonly drawingModeSubject = new BehaviorSubject<DrawingMode>('pen');
    private readonly enablePaintingSubject = new BehaviorSubject<boolean>(true);

    private readonly clearSiteSubject = new Subject<void>();

    private subscriptions: Subscription[] = [];

    public constructor(private colorService: ColorService, private planeService: PlaneService) {
        this.init();
    }

    public onDraw(drawCoordinate: DrawCoordinate, layer: number, mode: DrawingMode = this.currentDrawingMode): void {
        // const { previousPointer, nextPointer } = pointers;
        this.drawSubject.next({
            // previousPointer,
            // nextPointer,
            drawCoordinates: [drawCoordinate],
            mode,
            color: this.colorService.currentColor,
            layer,
            size: this.currentSize
        });
    }
    public onMove(event: Coordinate): void {
        this.moveSubject.next({ ...event });
    }

    public onDrawingInput(drawPoint: DrawPoint): void {
        this.inputDrawSubject.next(drawPoint);
    }

    public clearSite(): void {
        this.clearSiteSubject.next();
        const { width, height } = this.planeService.currentSize;
        this.onDraw({ previousPointer: { x: 0, y: 0 }, nextPointer: { x: width, y: height } }, 0, 'delete');
    }

    public setDrawingSize(size: number): void {
        this.drawSizeSubject.next(size);
    }

    public setDrawingMode(mode: DrawingMode): void {
        this.drawingModeSubject.next(mode);
    }

    public setEnablePainting(enable: boolean): void {
        this.enablePaintingSubject.next(enable);
    }

    public getDrawObservable(): Observable<DrawPoint> {
        return this.drawSubject.asObservable();
    }

    public getMoveObservable(): Observable<Coordinate> {
        return this.moveSubject.asObservable();
    }

    public getDrawingModeObservable(): Observable<DrawingMode> {
        return this.drawingModeSubject.asObservable();
    }

    public getDrawingInputObservable(): Observable<DrawPoint> {
        return this.inputDrawSubject.asObservable();
    }

    public getDrawingSizeObservable(): Observable<number> {
        return this.drawSizeSubject.asObservable();
    }

    public getIsPaintingEnabledObservable(): Observable<boolean> {
        return this.enablePaintingSubject.asObservable();
    }

    public getClearSiteObservable(): Observable<void> {
        return this.clearSiteSubject.asObservable();
    }

    private init(): void {
        this.subscriptions.push(this.colorService.getColor().subscribe(() => this.onChangeColor()));
    }

    private onChangeColor(): void {
        this.setDrawingMode('pen');
    }
}
