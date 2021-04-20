import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'ngx-left-site',
    templateUrl: './ngx-left-site.component.html',
    styleUrls: ['./ngx-left-site.component.scss']
})
export class NgxLeftSiteComponent implements OnInit {
    @Input()
    public isVisible = true;

    @Input()
    public vertical = true;

    public constructor() {}

    public ngOnInit(): void {}
}
