import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/base-components/base.component';
import { Plane, PlaneService } from '../../../site/services/plane.service';

@Component({
    selector: 'ngx-plane-handler',
    templateUrl: './ngx-plane-handler.component.html',
    styleUrls: ['./ngx-plane-handler.component.scss']
})
export class NgxPlaneHandlerComponent extends BaseComponent implements OnInit {
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
