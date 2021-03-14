import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'ngx-size-field',
    templateUrl: './size-field.component.html',
    styleUrls: ['./size-field.component.scss']
})
export class SizeFieldComponent implements OnInit {
    @Input()
    public initialValue = 2;

    @Input()
    public min = 1;

    @Input()
    public max = 100;

    @Output()
    public changed = new EventEmitter<number>();

    constructor() {}

    ngOnInit(): void {}
}
