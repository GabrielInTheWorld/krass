import { ColorFieldComponent } from './components/color-field/color-field.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MaterialComponentsModule } from './../common/material-design/material-components.module';
import { SiteComponent } from './site.component';
import { SharedModule } from './../common/shared.module';
import { SiteRoutingModule } from './site-routing.module';
import { NgModule } from '@angular/core';
import { PlaneHandlerComponent } from './components/plane-handler/plane-handler.component';
import { PlaneWrapperComponent } from './components/plane-wrapper/plane-wrapper.component';
import { FootbarComponent } from './components/footbar/footbar.component';
import { RightSiteComponent } from './components/right-site/right-site.component';
import { LeftSiteComponent } from './components/left-site/left-site.component';

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
    imports: [SiteRoutingModule, SharedModule, MaterialComponentsModule, DragDropModule],
    exports: [...declarations],
    declarations: [...declarations]
})
export class SiteModule {}
