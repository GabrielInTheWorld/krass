import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { ColorService } from './color.service';
import { PlaneService } from './plane.service';

export type Color = string;
export type DrawingMode = 'pen' | 'eraser' | 'delete';

export interface DrawCoordinates {
    previousPointer: Coordinates;
    nextPointer: Coordinates;
}

export interface Coordinates {
    x: number;
    y: number;
}

export interface DrawPoint {
    mode: DrawingMode;
    previousPointer: Coordinates;
    nextPointer: Coordinates;
    color: Color;
    layer: number;
}

@Injectable({
    providedIn: 'root'
})
export class PlaneDrawService {
    public get currentDrawingMode(): DrawingMode {
        return this.drawingModeSubject.value;
    }

    private readonly drawSizeSubject = new BehaviorSubject<number>(2);
    private readonly drawSubject = new BehaviorSubject<DrawPoint>(null);
    private readonly inputDrawSubject = new BehaviorSubject<DrawPoint>(null);
    private readonly moveSubject = new BehaviorSubject<Coordinates>(null);
    private readonly drawingModeSubject = new BehaviorSubject<DrawingMode>('pen');
    private readonly enablePaintingSubject = new BehaviorSubject<boolean>(true);

    private readonly clearSiteSubject = new Subject<void>();

    public constructor(private colorService: ColorService, private planeService: PlaneService) {}

    public onDraw(pointers: DrawCoordinates, layer: number, mode: DrawingMode = this.currentDrawingMode): void {
        const { previousPointer, nextPointer } = pointers;
        this.drawSubject.next({
            previousPointer,
            nextPointer,
            mode,
            color: this.colorService.currentColor,
            layer
        });
    }
    public onMove(event: Coordinates): void {
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

    public setDrawingSize(size: number): void {}

    public setDrawingMode(mode: DrawingMode): void {
        this.drawingModeSubject.next(mode);
    }

    public setEnablePainting(enable: boolean): void {
        this.enablePaintingSubject.next(enable);
    }

    public getDrawObservable(): Observable<DrawPoint> {
        return this.drawSubject.asObservable();
    }

    public getMoveObservable(): Observable<Coordinates> {
        return this.moveSubject.asObservable();
    }

    public getDrawingModeObservable(): Observable<DrawingMode> {
        return this.drawingModeSubject.asObservable();
    }

    public getDrawingInputObservable(): Observable<DrawPoint> {
        return this.inputDrawSubject.asObservable();
    }

    public getIsPaintingEnabledObservable(): Observable<boolean> {
        return this.enablePaintingSubject.asObservable();
    }

    public getClearSiteObservable(): Observable<void> {
        return this.clearSiteSubject.asObservable();
    }
}
