import { Component, OnInit } from '@angular/core';
import { ColorService } from '../../../site/services/color.service';

@Component({
    selector: 'ngx-color-field',
    templateUrl: './ngx-color-field.component.html',
    styleUrls: ['./ngx-color-field.component.scss']
})
export class NgxColorFieldComponent implements OnInit {
    public readonly colors: string[] = [
        '#fff',
        '#c1c1c1',
        '#ef130b',
        '#ff7100',
        '#ffe400',
        '#0c0',
        '#00b2ff',
        '#231fd3',
        '#a300ba',
        '#d37caa',
        '#a0522d',
        '#000',
        '#4c4c4c',
        '#740b07',
        '#c23800',
        '#e8a200',
        '#005510',
        '#00569e',
        '#0e0865',
        '#550069',
        '#a75574',
        '#63300d'
    ];

    public constructor(private colorService: ColorService) {}

    public ngOnInit(): void {}

    public changeColor(color: string): void {
        this.colorService.setColor(color);
    }
}
