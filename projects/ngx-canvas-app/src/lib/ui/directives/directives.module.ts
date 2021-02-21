import { RingCursorDirective } from './ring-cursor.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlyNumberDirective } from './only-number.directive';
import { PaperDirective } from './paper.directive';

const declarations = [RingCursorDirective, OnlyNumberDirective, PaperDirective];

@NgModule({
    declarations: [...declarations],
    exports: [...declarations],
    imports: [CommonModule]
})
export class DirectivesModule {}
