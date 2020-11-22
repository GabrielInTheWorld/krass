import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

export interface Plane {
    index?: number;
    backgroundColor?: string;
}

const MIN_ZOOM = 0.1;
const ZOOM_FACTOR = 0.1;
const ROTATE_FACTOR = 10;
const DEFAULT_ZOOM = 1;
const DEFAULT_ROTATION = 0;

@Injectable({
    providedIn: 'root'
})
export class PlaneService {
    public get planesObservable(): Observable<Plane[]> {
        return this.planesSubject.asObservable();
    }

    public get transformationObservable(): Observable<string> {
        return this.transformationSubject.asObservable();
    }

    public get currentScale(): number {
        return this._currentScale;
    }

    private planesSubject = new BehaviorSubject<Plane[]>([{ backgroundColor: '#bbb' }]);
    private transformationSubject = new BehaviorSubject<string>(this.transformation);

    private _currentScale = 1;
    private _currentRotation = 0;

    private get transformation(): string {
        return `scale(${this._currentScale}) rotateZ(${this._currentRotation}deg)`;
    }

    public constructor() {}

    public addPlaneOnTop(plane: Plane): void {
        const currentPlanes = this.planesSubject.value;
        currentPlanes.push(plane);
        this.planesSubject.next(currentPlanes);
    }

    public removePlane(index: number): void {
        const currentPlanes = this.planesSubject.value;
        currentPlanes.splice(index, 1);
        this.planesSubject.next(currentPlanes);
    }

    public setZoom(zoom: number): void {
        if (zoom >= MIN_ZOOM) {
            this._currentScale = zoom;
            this.applyTransformation();
        }
    }

    public zoomIn(): void {
        this._currentScale += ZOOM_FACTOR;
        this.applyTransformation();
    }

    public zoomOut(): void {
        if (this._currentScale - ZOOM_FACTOR >= MIN_ZOOM) {
            this._currentScale -= ZOOM_FACTOR;
            this.applyTransformation();
        }
    }

    public resetZoom(): void {
        this._currentScale = DEFAULT_ZOOM;
        this.applyTransformation();
    }

    public rotateLeft(): void {
        this._currentRotation -= ROTATE_FACTOR;
        this.applyTransformation();
    }

    public rotateRight(): void {
        this._currentRotation += ROTATE_FACTOR;
        this.applyTransformation();
    }

    public resetRotation(): void {
        this._currentRotation = DEFAULT_ROTATION;
        this.applyTransformation();
    }

    public resetTransformation(): void {
        this._currentScale = DEFAULT_ZOOM;
        this._currentRotation = DEFAULT_ROTATION;
        this.applyTransformation();
    }

    private applyTransformation(): void {
        this.transformationSubject.next(this.transformation);
    }
}
