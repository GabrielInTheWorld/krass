import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Random } from '../../core/crypto/random';

export interface PlaneAttributes {
    index?: number;
    backgroundColor?: string;
    width?: number;
    height?: number;
}

export interface Plane extends PlaneAttributes {
    id: string;
}

@Injectable({
    providedIn: 'root'
})
export class PlaneService {
    public get activePlane(): Plane {
        return this.activePlaneSubject.value;
    }

    private readonly activePlaneSubject = new BehaviorSubject<Plane>(null);

    public get planesObservable(): Observable<Plane[]> {
        return this.planesSubject.asObservable();
    }

    private planesSubject = new BehaviorSubject<Plane[]>([{ backgroundColor: '#bbb', id: '0' }]);

    public constructor() {
        if (this.planesSubject.value) {
            this.setActivePlane(this.planesSubject.value[0]);
        }
    }

    public addPlaneOnTop(plane: PlaneAttributes): void {
        const currentPlanes = this.planesSubject.value;
        currentPlanes.push({ ...plane, id: Random.randomNumber() });
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
}
