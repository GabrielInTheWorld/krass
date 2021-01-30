import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[appTooltip]'
})
export class TooltipDirective {
    @Input()
    public appTooltip: string;

    public constructor(private element: ElementRef) {}
}
