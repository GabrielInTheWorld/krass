import { Component, OnInit, Input, Host, HostBinding } from '@angular/core';

export type Depth = 0 | 1 | 2 | 3 | 4 | 5;

@Component({
    selector: 'app-paper',
    templateUrl: './paper.component.html',
    styleUrls: ['./paper.component.scss']
})
export class PaperComponent implements OnInit {
    @Input()
    public depth: Depth = 2;

    @HostBinding('class')
    public get classes(): string {
        return `paper depth--${this.depth}`;
    }

    constructor() {}

    ngOnInit(): void {}
}
