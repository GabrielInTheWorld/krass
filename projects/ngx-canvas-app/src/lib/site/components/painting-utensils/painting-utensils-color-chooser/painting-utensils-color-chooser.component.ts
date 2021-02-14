import { Component, OnInit } from '@angular/core';
import { ColorService } from '../../../services/color.service';

@Component({
    selector: 'ngx-painting-utensils-color-chooser',
    templateUrl: './painting-utensils-color-chooser.component.html',
    styleUrls: ['./painting-utensils-color-chooser.component.scss']
})
export class PaintingUtensilsColorChooserComponent implements OnInit {
    public get currentColor(): string {
        return this.colorService.currentColor;
    }

    public secondColor = '#FFF';

    public constructor(private colorService: ColorService) {}

    public ngOnInit(): void {}
}
