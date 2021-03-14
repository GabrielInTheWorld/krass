import { PlaneDrawService } from './../../services/plane-draw.service';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'ngx-size-handler',
    templateUrl: './size-handler.component.html',
    styleUrls: ['./size-handler.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SizeHandlerComponent implements OnInit {
    @Input()
    public initialValue = 2;

    @Input()
    public min = 1;

    @Input()
    public max = 100;

    public constructor(private planeDraw: PlaneDrawService) {}

    public ngOnInit(): void {}
}
