import { Subscription } from 'rxjs';
import { ColorService } from './../../services/color.service';
import { Plane, PlaneService } from './../../services/plane.service';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../core/base-components/base.component';

@Component({
    selector: 'app-plane-wrapper',
    templateUrl: './plane-wrapper.component.html',
    styleUrls: ['./plane-wrapper.component.scss']
})
export class PlaneWrapperComponent extends BaseComponent implements OnInit {
    @ViewChild('planeWrapper')
    public readonly planeWrapper: ElementRef<HTMLElement>;

    public get planes(): Plane[] {
        return this._planes;
    }

    public get currentColor(): string {
        return this._color;
    }

    private _planes: Plane[] = [];

    private _color = '';

    public constructor(private planeService: PlaneService, private colorService: ColorService) {
        super();
    }

    public ngOnInit(): void {
        this.subscriptions.push(...this.getPlaneSubscriptions(), ...this.getColorSubscriptions());
    }

    public onMouseWheel(event: WheelEvent): void {
        if (event.ctrlKey) {
            if (event.deltaY > 0) {
                this.planeService.zoomOut();
            } else {
                this.planeService.zoomIn();
            }
        } else if (event.altKey) {
            if (event.deltaY > 0) {
                this.planeService.rotateLeft();
            } else {
                this.planeService.rotateRight();
            }
        }
    }

    @HostListener('document:keydown', ['$event'])
    public onKeydownListener(event: KeyboardEvent): void {
        // console.log('keydown', event.key);
        // // event.preventDefault();
        // if (event.key === 'Alt') {
        //     this._holdAlt = true;
        // }
        // if (event.key === 'Shift') {
        //     this._holdShift = true;
        // }
        // console.log('holdshift or alt?', this.holdShiftKey, this.holdAltKey);
    }

    @HostListener('document:keyup', ['$event'])
    public onKeyupListener(event: KeyboardEvent): void {
        // console.log('keyup', event.key);
        // if (event.key === 'Alt') {
        //     this._holdAlt = false;
        // }
        // if (event.key === 'Shift') {
        //     this._holdShift = false;
        // }
    }

    private applyTransformation(nextTransformation: string): void {
        if (this.planeWrapper) {
            const style = this.planeWrapper.nativeElement.style;
            style.transform = nextTransformation;
        }
    }

    private getPlaneSubscriptions(): Subscription[] {
        return [
            this.planeService.planesObservable.subscribe(planes => {
                if (planes) {
                    this._planes = planes;
                }
            }),
            this.planeService.transformationObservable.subscribe(transformation =>
                this.applyTransformation(transformation)
            )
        ];
    }

    private getColorSubscriptions(): Subscription[] {
        return [this.colorService.getColor().subscribe(nextColor => (this._color = nextColor))];
    }
}
