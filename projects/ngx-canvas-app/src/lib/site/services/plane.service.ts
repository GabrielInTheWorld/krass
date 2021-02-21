import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Units = 'cm' | 'mm' | 'in' | 'px';

export interface PlaneSize {
    width: number;
    height: number;
}

export interface PlaneAttributes {
    /**
     * The z-index of a plane.
     */
    index?: number;
    /**
     * The background-color of a plane.
     */
    backgroundColor?: string;
}

export interface BackgroundLayer extends PlaneAttributes {
    /**
     * The width of a plane in mm.
     */
    width?: number;
    /**
     * The height of a plane in mm.
     */
    height?: number;
    /**
     * The number of pixels, that will be displayed.
     */
    pixelDensity?: number;
    /**
     * The units the width and height is given.
     */
    units?: Units;
}

export interface Plane extends BackgroundLayer {
    id: string;
}

const DEFAULT_PLANE: BackgroundLayer = {
    width: 210,
    height: 297,
    backgroundColor: '#fff',
    index: 0,
    pixelDensity: 72,
    units: 'cm'
};
const CENTIMETER_PER_INCH = 2.54;

@Injectable({
    providedIn: 'root'
})
export class PlaneService {
    public get activePlane(): Plane {
        return this.activePlaneSubject.value;
    }

    public get backgroundPlane(): Plane {
        return this.planesSubject.value[0];
    }

    private readonly activePlaneSubject = new BehaviorSubject<Plane>(null);
    private readonly planeSizeSubject = new BehaviorSubject<PlaneSize>(null);

    public get planesObservable(): Observable<Plane[]> {
        return this.planesSubject.asObservable();
    }

    public get sizeObservable(): Observable<PlaneSize> {
        return this.planeSizeSubject.asObservable();
    }

    private planesSubject = new BehaviorSubject<Plane[]>([]);
    private _currentId = 0;
    private hasInitialized = false;

    public constructor() {
        if (this.planesSubject.value) {
            this.setActivePlane(this.planesSubject.value[0]);
        }
    }

    public initialize(plane: BackgroundLayer): void {
        if (!this.hasInitialized) {
            this.setBackground(plane);
            this.setActivePlane(this.planesSubject.value[0]);
            this.hasInitialized = true;
        }
    }

    public setBackground(plane: BackgroundLayer): void {
        const background: Plane = { ...DEFAULT_PLANE, ...plane, id: this.nextId() };
        const nextValue: Plane[] = [background, ...this.planesSubject.value];
        this.setPlaneSize(background);
        this.planesSubject.next(nextValue);
    }

    public addPlaneOnTop(plane: PlaneAttributes): void {
        const currentPlanes = this.planesSubject.value;
        currentPlanes.push({ ...plane, id: this.nextId() });
        this.planesSubject.next(currentPlanes);
    }

    public removePlane(index: number): void {
        const currentPlanes = this.planesSubject.value;
        currentPlanes.splice(index, 1);
        this.planesSubject.next(currentPlanes);
    }

    public setActivePlane(plane: Plane): void {
        this.activePlaneSubject.next(plane);
    }

    public getActivePlane(): Observable<Plane> {
        return this.activePlaneSubject.asObservable();
    }

    private getInchesByPixel(size: number, pixelDensity: number): number {
        return (size / 10) * pixelDensity;
    }

    private setPlaneSize(backgroundLayer: BackgroundLayer): void {
        let sizeObject: PlaneSize;
        const width = this.getInchesByPixel(backgroundLayer.width, backgroundLayer.pixelDensity);
        const height = this.getInchesByPixel(backgroundLayer.height, backgroundLayer.pixelDensity);
        switch (backgroundLayer.units) {
            case 'cm':
                sizeObject = { width: width / CENTIMETER_PER_INCH, height: height / CENTIMETER_PER_INCH };
                break;
            case 'mm':
                sizeObject = { width: (width * 10) / CENTIMETER_PER_INCH, height: (height * 10) / CENTIMETER_PER_INCH };
                break;
            case 'in':
                sizeObject = { width, height };
                break;
            case 'px':
                sizeObject = { width: backgroundLayer.width, height: backgroundLayer.height };
                break;
        }
        this.planeSizeSubject.next(sizeObject);
    }

    private nextId(): string {
        return (this._currentId++).toString();
    }
}
