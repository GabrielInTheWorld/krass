import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ColorService } from './color.service';

export type Color = string;
export type DrawingMode = 'pen' | 'eraser';

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

    private readonly drawSubject = new BehaviorSubject<DrawPoint>(null);
    private readonly inputDrawSubject = new BehaviorSubject<DrawPoint>(null);
    private readonly moveSubject = new BehaviorSubject<Coordinates>(null);
    private readonly drawingModeSubject = new BehaviorSubject<DrawingMode>('pen');
    private readonly enablePaintingSubject = new BehaviorSubject<boolean>(true);

    public constructor(private colorService: ColorService) {}

    public onDraw(previousPointer: Coordinates, nextPointer: Coordinates, layer: number): void {
        this.drawSubject.next({
            previousPointer,
            nextPointer,
            mode: this.currentDrawingMode,
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
}
