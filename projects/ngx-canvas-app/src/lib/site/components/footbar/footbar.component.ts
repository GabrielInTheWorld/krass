import { PlaneTransformationService } from '../../services/plane-transformation.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { BaseComponent } from '../../../core/base-components/base.component';

@Component({
    selector: 'app-footbar',
    templateUrl: './footbar.component.html',
    styleUrls: ['./footbar.component.scss']
})
export class FootbarComponent extends BaseComponent implements OnInit {
    public sliderForm: FormControl = this.fb.control(this.getCurrentZoom());
    public inputForm: FormControl = this.fb.control(this.getCurrentZoom());

    public constructor(private planeService: PlaneTransformationService, private fb: FormBuilder) {
        super();
    }

    public ngOnInit(): void {
        this.subscriptions.push(
            this.sliderForm.valueChanges.subscribe(sliderValue => this.setZoom(sliderValue)),
            this.inputForm.valueChanges.subscribe(inputValue => this.setZoom(inputValue))
        );
    }

    /**
     * Footer
     *
     * SiteComponent
     */

    public zoomIn(): void {
        this.planeService.zoomIn();
    }

    public zoomOut(): void {
        this.planeService.zoomOut();
    }

    public getCurrentZoom(): number {
        return Math.trunc(this.planeService.currentScale * 100);
    }

    public resetZoom(): void {
        this.planeService.resetZoom();
    }

    public setZoom(nextValue: number): void {
        this.planeService.setZoom(nextValue / 100);
    }

    public resetTransformation(): void {
        this.planeService.resetTransformation();
    }

    public onSliderChange(change: MatSliderChange): void {
        console.log('changeevent', change);
        this.planeService.setZoom(change.value / 100);
    }
}
