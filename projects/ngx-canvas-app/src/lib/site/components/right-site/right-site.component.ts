import { PlaneService, PlaneAttributes } from '../../services/plane.service';
import { Component, OnInit } from '@angular/core';

/**
 * @deprecated
 */
@Component({
    selector: 'app-right-site',
    templateUrl: './right-site.component.html',
    styleUrls: ['./right-site.component.scss']
})
export class RightSiteComponent implements OnInit {
    public constructor(private planeService: PlaneService) {}

    public ngOnInit(): void {}

    public addPlane(): void {
        const plane: PlaneAttributes = {};
        this.planeService.addPlaneOnTop(plane);
    }

    public addFolder(): void {}
}
