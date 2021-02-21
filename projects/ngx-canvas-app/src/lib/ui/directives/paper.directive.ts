import { Directive, Input, ElementRef, OnInit } from '@angular/core';

const DEPTH_0 = 'none';
const DEPTH_1 = '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2)';
const DEPTH_2 = '0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.4)';
const DEPTH_3 = '0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.4)';
const DEPTH_4 =
    '0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.4)';
const DEPTH_5 =
    '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.4)';

export type Depth = 0 | 1 | 2 | 3 | 4 | 5;

@Directive({
    selector: '[ngxPaper]'
})
export class PaperDirective implements OnInit {
    @Input()
    public ngxPaper: Depth = 2;

    @Input()
    public ngxPaperRaiseOnHover = false;

    private depthMap = {
        0: DEPTH_0,
        1: DEPTH_1,
        2: DEPTH_2,
        3: DEPTH_3,
        4: DEPTH_4,
        5: DEPTH_5
    };

    public constructor(private container: ElementRef<HTMLElement>) {}

    public ngOnInit(): void {
        if (!this.depthMap[this.ngxPaper]) {
            this.ngxPaper = 2;
        }
        this.container.nativeElement.style.boxShadow = this.depthMap[this.ngxPaper];
        if (this.ngxPaperRaiseOnHover || this.ngxPaper === 0) {
            this.container.nativeElement.addEventListener('mouseenter', () => {
                this.container.nativeElement.style.boxShadow = this.depthMap[5];
            });
            this.container.nativeElement.addEventListener('mouseleave', () => {
                this.container.nativeElement.style.boxShadow = this.depthMap[this.ngxPaper];
            });
        }
    }
}
