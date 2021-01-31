import { SiteModule } from './lib/site/site.module';
import { NgModule } from '@angular/core';
import { NgxCanvasAppComponent } from './lib/api/components/ngx-canvas-app.component';

@NgModule({
    declarations: [NgxCanvasAppComponent],
    imports: [SiteModule],
    exports: [NgxCanvasAppComponent]
})
export class NgxCanvasAppModule {}
