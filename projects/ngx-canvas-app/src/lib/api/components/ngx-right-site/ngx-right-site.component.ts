import { Component, OnInit } from '@angular/core';
import { PlaneAttributes, PlaneService } from '../../../site/services/plane.service';

@Component({
    selector: 'ngx-right-site',
    templateUrl: './ngx-right-site.component.html',
    styleUrls: ['./ngx-right-site.component.scss']
})
export class NgxRightSiteComponent implements OnInit {
    public constructor(private planeService: PlaneService) {}

    public ngOnInit(): void {}

    public addPlane(): void {
        const plane: PlaneAttributes = {};
        this.planeService.addPlaneOnTop(plane);
    }

    public addFolder(): void {}
}
