import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PlaneDrawService } from '../../../site/services/plane-draw.service';

@Component({
    selector: 'ngx-size-handler',
    templateUrl: './ngx-size-handler.component.html',
    styleUrls: ['./ngx-size-handler.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NgxSizeHandlerComponent implements OnInit {
    public set initialValue(nextValue: number) {
        this._value = nextValue;
        this.setSize(nextValue);
    }

    public get initialValue(): number {
        return this._value;
    }

    public min = 1;

    public max = 100;

    private _value = 2;

    public constructor(private fb: FormBuilder, private planeDraw: PlaneDrawService) {}

    public ngOnInit(): void {
        // this.value = this.fb.control('')
    }

    private setSize(nextValue: number): void {
        this.planeDraw.setDrawingSize(nextValue);
    }
}
