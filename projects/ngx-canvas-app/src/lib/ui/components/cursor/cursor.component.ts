import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'ngx-cursor',
    templateUrl: './cursor.component.html',
    styleUrls: ['./cursor.component.scss']
})
export class CursorComponent implements OnInit {
    @Input()
    public size = 2;

    @Input()
    public borderColor = '#000';

    @Input()
    public pointX = 0;

    @Input()
    public pointY = 0;

    public get padding(): string {
        return `${this.size}px`;
    }

    public get transformation(): string {
        return `translate(${this.pointX}px, ${this.pointY}px)`;
    }

    public constructor() {}

    public ngOnInit(): void {}
}
