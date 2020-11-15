import { Plane, PlaneService } from './../../services/plane.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/base-components/base.component';

@Component({
    selector: 'app-plane-wrapper',
    templateUrl: './plane-wrapper.component.html',
    styleUrls: ['./plane-wrapper.component.scss']
})
export class PlaneWrapperComponent extends BaseComponent implements OnInit {
    public get planes(): Plane[] {
        return this._planes;
    }

    public get holdControl(): boolean {
        return this._holdControl;
    }

    private _holdControl = false;

    private _planes: Plane[] = [];

    public constructor(private planeService: PlaneService) {
        super();
    }

    public ngOnInit(): void {
        this.subscriptions.push(
            this.planeService.planesObservable.subscribe(planes => {
                if (planes) {
                    this._planes = planes;
                }
            })
        );
    }

    public onMouseWheel(event: MouseEvent): void {
        console.log('mousewheel', event);
    }

    @HostListener('document:keydown', ['$event'])
    public onKeydownListener(event: KeyboardEvent): void {
        console.log('keydown', event.key);
        if (event.key === 'Control') {
            this._holdControl = true;
        }
    }

    @HostListener('document:keyup', ['$event'])
    public onKeyupListener(event: KeyboardEvent): void {
        console.log('keyup', event.key);
        if (event.key === 'Control') {
            this._holdControl = false;
        }
    }
}
