import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'ngx-painting-utensils-button',
    templateUrl: './painting-utensils-button.component.html',
    styleUrls: ['./painting-utensils-button.component.scss']
})
export class PaintingUtensilsButtonComponent implements OnInit {
    @Input()
    public label: string;

    @Input()
    public icon: string;

    @Input()
    public svgIcon: string;

    @Input()
    public isActive = false;

    @Output()
    public clickHandler = new EventEmitter<void>();

    public constructor() {}

    public ngOnInit(): void {}
}
