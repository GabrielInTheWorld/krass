import { Component, Input, OnInit } from '@angular/core';
import { mdiEraser } from '@mdi/js';
import { DrawingMode, PlaneDrawService } from '../../../site/services/plane-draw.service';

export interface UtensilsButton {
    label: string;
    onClick: (mode: DrawingMode) => void;
    mode: DrawingMode;
    icon?: string;
    svgIcon?: string;
}

@Component({
    selector: 'ngx-painting-utensils-wrapper',
    templateUrl: './ngx-painting-utensils-wrapper.component.html',
    styleUrls: ['./ngx-painting-utensils-wrapper.component.scss']
})
export class NgxPaintingUtensilsWrapperComponent implements OnInit {
    public readonly utensilsButtons: UtensilsButton[] = [
        {
            label: 'Stift',
            mode: 'pen',
            onClick: mode => this.planeDrawService.setDrawingMode(mode),
            icon: 'create'
        },
        {
            label: 'Radiergummi',
            mode: 'eraser',
            onClick: mode => this.planeDrawService.setDrawingMode(mode),
            svgIcon: mdiEraser
        },
        {
            label: 'Seite leeren',
            mode: 'delete',
            onClick: () => {
                this.planeDrawService.clearSite();
                this.planeDrawService.setDrawingMode('pen');
            },
            icon: 'delete_outline'
        }
    ];

    @Input()
    public vertical = true;

    public constructor(private planeDrawService: PlaneDrawService) {}

    public ngOnInit(): void {}

    public isDrawingMode(mode: DrawingMode): boolean {
        return this.planeDrawService.currentDrawingMode === mode;
    }
}
