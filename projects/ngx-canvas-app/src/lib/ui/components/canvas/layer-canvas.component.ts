import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CanvasComponent } from './canvas.component';

@Component({
    selector: 'ngx-layer-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['./canvas.component.scss']
})
export class LayerCanvasComponent extends CanvasComponent {
    public get zIndex(): number {
        return this.plane?.index || 0;
    }

    protected getSubscriptions(): Subscription[] {
        return [
            this.planeService.getActivePlane().subscribe(activePlane => {
                if (activePlane === this.plane) {
                    this.cd.reattach();
                    this.initDrawListeners();
                } else {
                    this.removeDrawListeners();
                    this.cd.detach();
                }
            })
        ];
    }
}
