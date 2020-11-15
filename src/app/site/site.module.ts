import { MaterialComponentsModule } from './../common/material-design/material-components.module';
import { SiteComponent } from './site.component';
import { SharedModule } from './../common/shared.module';
import { SiteRoutingModule } from './site-routing.module';
import { NgModule } from '@angular/core';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { PlaneHandlerComponent } from './components/plane-handler/plane-handler.component';
import { PlaneWrapperComponent } from './components/plane-wrapper/plane-wrapper.component';

const declarations = [ToolbarComponent, SiteComponent];

@NgModule({
    imports: [SiteRoutingModule, SharedModule, MaterialComponentsModule],
    exports: [...declarations],
    declarations: [...declarations, PlaneHandlerComponent, PlaneWrapperComponent]
})
export class SiteModule {}
