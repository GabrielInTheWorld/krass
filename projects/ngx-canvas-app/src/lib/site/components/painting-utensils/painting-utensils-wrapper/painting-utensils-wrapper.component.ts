import { DrawingMode, PlaneDrawService } from '../../../services/plane-draw.service';
import { Component, OnInit } from '@angular/core';
import { mdiEraser } from '@mdi/js';
import { ColorService } from '../../../services/color.service';

export interface UtensilsButton {
    label: string;
    onClick: (mode: DrawingMode) => void;
    mode: DrawingMode;
    icon?: string;
    svgIcon?: string;
}

@Component({
    selector: 'ngx-painting-utensils-wrapper',
    templateUrl: './painting-utensils-wrapper.component.html',
    styleUrls: ['./painting-utensils-wrapper.component.scss']
})
export class PaintingUtensilsWrapperComponent implements OnInit {
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
        }
    ];

    // public get currentColor(): string {
    //     return this.colorService.currentColor;
    // }

    // public secondColor = '#FFF';

    public constructor(private planeDrawService: PlaneDrawService, private colorService: ColorService) {}

    public ngOnInit(): void {}

    public isDrawingMode(mode: DrawingMode): boolean {
        return this.planeDrawService.currentDrawingMode === mode;
    }
}
