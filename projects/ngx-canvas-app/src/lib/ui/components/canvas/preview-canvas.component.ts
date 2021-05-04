import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Color, DrawCoordinate } from '../../../site/services/plane-draw.service';
import { CanvasComponent } from './canvas.component';

@Component({
    selector: 'ngx-preview-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['./canvas.component.scss']
})
export class PreviewCanvasComponent extends CanvasComponent {
    public get zIndex(): number {
        return 1000;
    }

    protected onDrawCircle(drawCoordinate: DrawCoordinate, size: number, color: Color): void {
        const { previousPointer, nextPointer } = drawCoordinate;
        // const radius = this.getRadius(previousPointer, nextPointer);
        this.context.beginPath();
        this.context.ellipse(
            previousPointer.x,
            previousPointer.y,
            Math.abs(nextPointer.x - previousPointer.x) + size / 2,
            Math.abs(nextPointer.y - previousPointer.y) + size / 2,
            0,
            0,
            2 * Math.PI
        );
        this.context.closePath();
        this.context.stroke();
    }

    protected getSubscriptions(): Subscription[] {
        return [this.previewDrawObservable.subscribe(drawPoint => this.onDrawingInput(drawPoint))];
    }
}
