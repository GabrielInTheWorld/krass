import { Plane } from './../../site/services/plane.service';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

interface Pointer {
    x: number;
    y: number;
}

@Component({
    selector: 'app-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit, AfterViewInit {
    public static readonly CENTIMETER_PER_INCH = 2.54;

    @Input()
    public plane: Plane;

    @ViewChild('canvas', { static: true })
    public readonly canvasWrapper: ElementRef<HTMLCanvasElement>;

    @Input()
    public pixelDensity = 72;

    @Input()
    public width = 210;

    @Input()
    public height = 297;

    private canvas: HTMLCanvasElement;

    private context: CanvasRenderingContext2D;

    private paintFn: () => void;

    private mousePointer: Pointer = { x: 0, y: 0 };

    public constructor() {}

    public ngOnInit(): void {}

    public ngAfterViewInit(): void {
        if (this.canvasWrapper) {
            this.canvas = this.canvasWrapper.nativeElement;
            this.canvas.width = this.getWidth();
            this.canvas.height = this.getHeight();
            this.context = this.canvas.getContext('2d');
            this.context.lineCap = 'round';
            this.context.lineJoin = 'round';
            this.setColor('black');
            this.setStrokeWidth(2);
            this.paintFn = () => this.onPaint();
        }
    }

    public onMouseDown(event: MouseEvent): void {
        this.context.beginPath();
        this.context.moveTo(this.mousePointer.x, this.mousePointer.y);
        this.initDraw();
    }

    public onMouseUp(event: MouseEvent): void {
        this.context.closePath();
        this.resetPointer();
    }

    public onMouseMove(event: MouseEvent): void {
        this.mousePointer.x = event.offsetX;
        this.mousePointer.y = event.offsetY;
    }

    public setColor(color: string): void {
        this.context.strokeStyle = color;
    }

    public setStrokeWidth(width: number): void {
        this.context.lineWidth = width;
    }

    public getWidth(): number {
        return ((this.width / 10) * this.pixelDensity) / CanvasComponent.CENTIMETER_PER_INCH;
    }

    public getHeight(): number {
        return ((this.height / 10) * this.pixelDensity) / CanvasComponent.CENTIMETER_PER_INCH;
    }

    private onPaint(): void {
        this.context.lineTo(this.mousePointer.x, this.mousePointer.y);
        this.context.stroke();
    }

    private initDraw(): void {
        this.canvas.addEventListener('pointermove', this.paintFn, false);
        this.canvas.addEventListener('mousemove', this.paintFn, false);
    }

    private resetPointer(): void {
        this.canvas.removeEventListener('pointermove', this.paintFn, false);
        this.canvas.removeEventListener('mousemove', this.paintFn, false);
        this.mousePointer = { x: 0, y: 0 };
    }
}
