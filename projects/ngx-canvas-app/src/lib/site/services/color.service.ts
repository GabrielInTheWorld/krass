import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

const DEFAULT_COLOR = '#000';

@Injectable({
    providedIn: 'root'
})
export class ColorService {
    private readonly colorSubject = new BehaviorSubject<string>(DEFAULT_COLOR);

    public get currentColor(): string {
        return this.colorSubject.value;
    }

    public constructor() {}

    public setColor(nextColor: string): void {
        this.colorSubject.next(nextColor);
    }

    public getColor(): Observable<string> {
        return this.colorSubject.asObservable();
    }
}
