import { SiteModule } from '../site/site.module';
import { NgModule } from '@angular/core';
import { NgxCanvasAppComponent } from './components/ngx-canvas-app.component';

@NgModule({
    declarations: [NgxCanvasAppComponent],
    imports: [SiteModule],
    exports: [NgxCanvasAppComponent]
})
export class NgxCanvasAppModule {}
