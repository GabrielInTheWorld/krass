import { Component, OnInit } from '@angular/core';

export interface UtensilsButton {
    label: string;
    onClick: () => void;
    icon?: string;
}

@Component({
    selector: 'ngx-painting-utensils-wrapper',
    templateUrl: './painting-utensils-wrapper.component.html',
    styleUrls: ['./painting-utensils-wrapper.component.scss']
})
export class PaintingUtensilsWrapperComponent implements OnInit {
    public readonly UtensilsButtons: UtensilsButton[] = [
        {
            label: 'Stift',
            onClick: () => {}
        },
        {
            label: 'Radiergummi',
            onClick: () => {}
        }
    ];

    public constructor() {}

    public ngOnInit(): void {}
}
