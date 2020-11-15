import { Plane } from './../../site/services/plane.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {
    @Input()
    public plane: Plane;

    constructor() {}

    ngOnInit(): void {}
}
