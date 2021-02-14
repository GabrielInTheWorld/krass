import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../ui/ui.module';
import { ColorFieldComponent } from './components/color-field/color-field.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SiteComponent } from './site.component';
import { PlaneHandlerComponent } from './components/plane-handler/plane-handler.component';
import { PlaneWrapperComponent } from './components/plane-wrapper/plane-wrapper.component';
import { FootbarComponent } from './components/footbar/footbar.component';
import { RightSiteComponent } from './components/right-site/right-site.component';
import { LeftSiteComponent } from './components/left-site/left-site.component';
import { PaintingUtensilsModule } from './components/painting-utensils/painting-utensils.module';

const declarations = [
    SiteComponent,
    ColorFieldComponent,
    PlaneHandlerComponent,
    PlaneWrapperComponent,
    FootbarComponent,
    RightSiteComponent,
    LeftSiteComponent
];

@NgModule({
    declarations: [...declarations],
    exports: [...declarations],
    imports: [CommonModule, UiModule, DragDropModule, PaintingUtensilsModule]
})
export class SiteModule {}
