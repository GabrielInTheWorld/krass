import { PlaneDrawService } from './../../services/plane-draw.service';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

/**
 * @deprecated
 */
@Component({
    selector: 'app-size-handler',
    templateUrl: './size-handler.component.html',
    styleUrls: ['./size-handler.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SizeHandlerComponent implements OnInit {
    // public initialValue = 2;
    // public value: FormControl
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
