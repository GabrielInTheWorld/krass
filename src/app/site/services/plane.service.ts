import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

export interface Plane {
    index?: number;
    backgroundColor?: string;
}

@Injectable({
    providedIn: 'root'
})
export class PlaneService {
    public get planesObservable(): Observable<Plane[]> {
        return this.planesSubject.asObservable();
    }

    private planesSubject = new BehaviorSubject<Plane[]>([{ backgroundColor: '#bbb' }]);

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
}
