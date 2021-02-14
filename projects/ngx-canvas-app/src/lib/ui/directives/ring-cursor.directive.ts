import { AfterContentInit, Directive, ElementRef, Input } from '@angular/core';
import { renderHtml } from '../../core/functions/render-html';

const BORDER_WIDTH = 2;

@Directive({
    selector: '[ngxRingCursor]'
})
export class RingCursorDirective implements AfterContentInit {
    @Input()
    public cursorSize = 2;

    private element: HTMLElement;
    private pointer: HTMLElement;
    private mouseX = -100;
    private mouseY = -100;

    public constructor(private el: ElementRef<HTMLElement>) {}

    public ngAfterContentInit(): void {
        this.element = this.el.nativeElement;
        this.pointer = renderHtml({
            tagName: 'div',
            id: 'pointer-dot',
            style: {
                height: '0',
                width: '0',
                border: `${BORDER_WIDTH}px solid black`,
                padding: `${this.cursorSize}px`,
                borderRadius: '50%',
                position: 'fixed',
                left: '0',
                top: '0',
                right: '0',
                bottom: '0',
                zIndex: '1001',
                pointerEvents: 'none'
            }
        });
        this.element.insertBefore(this.pointer, this.element.children[0]);
        this.initPointer();
    }

    private initPointer(): void {
        this.element.onmousemove = mouse => {
            this.mouseX = mouse.clientX;
            this.mouseY = mouse.clientY;
        };

        this.element.onmouseenter = mouse => {
            this.pointer.style.display = 'block';
        };

        this.element.onmouseleave = mouse => {
            this.pointer.style.display = 'none';
        };

        const render = () => {
            const xCoordinate = this.mouseX - this.cursorSize - BORDER_WIDTH;
            const yCoordinate = this.mouseY - this.cursorSize - BORDER_WIDTH;
            this.pointer.style.borderColor = 'black';
            this.pointer.style.transform = `translate(${xCoordinate}px, ${yCoordinate}px)`;
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
    }
}
