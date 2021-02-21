import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SiteModule } from './lib/site/site.module';
import { NgxCanvasAppComponent } from './lib/api/components/ngx-canvas-app.component';
import { NgxColorFieldComponent } from './lib/api/components/ngx-color-field/ngx-color-field.component';
import { NgxContainerDialogComponent } from './lib/api/components/ngx-container-dialog/ngx-container-dialog.component';

const components = [NgxCanvasAppComponent, NgxColorFieldComponent];

@NgModule({
    declarations: [...components, NgxContainerDialogComponent],
    imports: [SiteModule, CommonModule],
    exports: [...components]
})
export class NgxCanvasAppModule {}
