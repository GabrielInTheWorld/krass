import { Component, Input, OnInit } from '@angular/core';

/**
 * @deprecated
 */
@Component({
    selector: 'app-left-site',
    templateUrl: './left-site.component.html',
    styleUrls: ['./left-site.component.scss']
})
export class LeftSiteComponent implements OnInit {
    @Input()
    public isVisible = true;

    @Input()
    public vertical = true;

    public constructor() {}

    public ngOnInit(): void {}
}
