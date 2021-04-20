import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SiteModule } from './lib/site/site.module';
import { NgxCanvasAppComponent } from './lib/api/components/ngx-canvas-app.component';
import { NgxColorFieldComponent } from './lib/api/components/ngx-color-field/ngx-color-field.component';
import { NgxContainerDialogComponent } from './lib/api/components/ngx-container-dialog/ngx-container-dialog.component';
import { NgxSizeHandlerComponent } from './lib/api/components/ngx-size-handler/ngx-size-handler.component';
import { NgxPaintingUtensilsWrapperComponent } from './lib/api/components/ngx-painting-utensils-wrapper/ngx-painting-utensils-wrapper.component';
import { NgxPlaneHandlerComponent } from './lib/api/components/ngx-plane-handler/ngx-plane-handler.component';
import { NgxPlaneWrapperComponent } from './lib/api/components/ngx-plane-wrapper/ngx-plane-wrapper.component';
import { NgxLeftSiteComponent } from './lib/api/components/ngx-left-site/ngx-left-site.component';
import { NgxRightSiteComponent } from './lib/api/components/ngx-right-site/ngx-right-site.component';

const components = [
    NgxCanvasAppComponent,
    NgxColorFieldComponent,
    NgxSizeHandlerComponent,
    NgxPaintingUtensilsWrapperComponent,
    NgxPlaneHandlerComponent,
    NgxPlaneWrapperComponent,
    NgxLeftSiteComponent,
    NgxRightSiteComponent
];

@NgModule({
    declarations: [...components, NgxContainerDialogComponent],
    imports: [SiteModule, CommonModule],
    exports: [...components]
})
export class NgxCanvasAppModule {}
