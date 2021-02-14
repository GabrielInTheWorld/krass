import { RingCursorDirective } from './ring-cursor.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlyNumberDirective } from './only-number.directive';

const declarations = [RingCursorDirective, OnlyNumberDirective];

@NgModule({
    declarations: [...declarations],
    exports: [...declarations],
    imports: [CommonModule]
})
export class DirectivesModule {}
