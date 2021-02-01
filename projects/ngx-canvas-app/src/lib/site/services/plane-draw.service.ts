import { ColorService } from './color.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

export type Color = string;
export type DrawingMode = 'pen' | 'eraser';

export interface Coordinates {
    x: number;
    y: number;
}

export interface DrawPoint {
    coordinates: Coordinates;
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
    private readonly moveSubject = new BehaviorSubject<Coordinates>(null);
    private readonly drawingModeSubject = new BehaviorSubject<DrawingMode>('pen');

    public constructor(private colorService: ColorService) {}

    public onDraw(coordinates: Coordinates, layer: number): void {
        this.drawSubject.next({ coordinates, color: this.colorService.currentColor, layer });
    }
    public onMove(event: Coordinates): void {
        this.moveSubject.next({ ...event });
    }

    public setDrawingMode(mode: DrawingMode): void {
        this.drawingModeSubject.next(mode);
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
}
