import { sharedModule } from './../common/shared.module';
import { SiteRoutingModule } from './site-routing.module';
import { NgModule } from '@angular/core';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

const declarations = [ToolbarComponent];

@NgModule({
  imports: [SiteRoutingModule, sharedModule],
  exports: [...declarations],
  declarations: [...declarations],
})
export class SiteModule {}
