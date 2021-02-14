import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaintingUtensilsWrapperComponent } from './painting-utensils-wrapper/painting-utensils-wrapper.component';
import { PaintingUtensilsColorChooserComponent } from './painting-utensils-color-chooser/painting-utensils-color-chooser.component';
import { UiModule } from './../../../ui/ui.module';

const declarations = [PaintingUtensilsColorChooserComponent, PaintingUtensilsWrapperComponent];

@NgModule({
    declarations: [...declarations],
    exports: [...declarations],
    imports: [CommonModule, UiModule]
})
export class PaintingUtensilsModule {}
