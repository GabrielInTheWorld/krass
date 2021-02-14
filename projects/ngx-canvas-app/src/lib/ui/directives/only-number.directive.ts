import { Directive, Input, HostListener } from '@angular/core';

const BACKSPACE = 'Backspace';

@Directive({
    selector: '[ngxOnlyNumber]'
})
export class OnlyNumberDirective {
    @Input()
    public ngxOnlyNumber = true;

    /**
     * Regex to validate only numbers
     * ^: starts with
     * $: ends
     */
    private regExp = new RegExp('^([1-9][0-9]*|0)?$');

    private allowedCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    @HostListener('keydown', ['$event'])
    public onKeyDown(event: KeyboardEvent): void {
        if (this.ngxOnlyNumber) {
            if (
                this.allowedCharacters.includes(event.key) ||
                // Allow: Ctrl+A
                (event.key === 'a' && event.ctrlKey) ||
                // Allow: Ctrl+C
                (event.key === 'c' && event.ctrlKey) ||
                // Allow: Ctrl+V
                (event.key === 'v' && event.ctrlKey) ||
                // Allow: Ctrl+X
                (event.key === 'x' && event.ctrlKey) ||
                event.key === BACKSPACE
            ) {
                // let it happen, don't do anything
                return;
            }
            if (this.regExp.test(event.key)) {
                return;
            } else {
                event.preventDefault();
            }
        }
    }
}
