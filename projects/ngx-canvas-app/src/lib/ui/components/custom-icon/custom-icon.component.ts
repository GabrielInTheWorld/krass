import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'ngx-custom-icon',
    templateUrl: './custom-icon.component.html',
    styleUrls: ['./custom-icon.component.scss']
})
export class CustomIconComponent implements OnInit {
    @Input()
    public path: string;

    public constructor() {}

    public ngOnInit(): void {
        document.querySelector('svg path').setAttribute('d', this.path);
    }
}
