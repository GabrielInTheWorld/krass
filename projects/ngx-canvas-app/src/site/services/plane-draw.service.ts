import { ColorService } from './color.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

export type Color = string;

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
    private readonly drawSubject = new BehaviorSubject<DrawPoint>(null);
    private readonly moveSubject = new BehaviorSubject<Coordinates>(null);

    public constructor(private colorService: ColorService) {}

    public onDraw(coordinates: Coordinates, layer: number): void {
        this.drawSubject.next({ coordinates, color: this.colorService.currentColor, layer });
    }
    public onMove(event: Coordinates): void {
        this.moveSubject.next({ ...event });
    }

    public getDrawObservable(): Observable<DrawPoint> {
        return this.drawSubject.asObservable();
    }

    public getMoveObservable(): Observable<Coordinates> {
        return this.moveSubject.asObservable();
    }
}
