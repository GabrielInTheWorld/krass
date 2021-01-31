import { Plane, PlaneService } from './../../services/plane.service';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { BaseComponent } from '../../../core/base-components/base.component';

@Component({
    selector: 'app-plane-handler',
    templateUrl: './plane-handler.component.html',
    styleUrls: ['./plane-handler.component.scss']
})
export class PlaneHandlerComponent extends BaseComponent implements OnInit {
    public planes: Plane[] = [];

    constructor(private planeService: PlaneService) {
        super();
    }

    ngOnInit(): void {
        this.subscriptions.push(
            this.planeService.planesObservable.subscribe(planes => {
                this.planes = planes;
            })
        );
    }

    public drop(event: CdkDragDrop<any>): void {
        console.log('ondrop', event);
    }
}
