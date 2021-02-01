import { AfterContentInit, Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[ngxRingCursor]'
})
export class RingCursorDirective implements AfterContentInit {
    public constructor(private el: ElementRef) {}

    public ngAfterContentInit(): void {
        console.log('el', this.el);
    }
}
