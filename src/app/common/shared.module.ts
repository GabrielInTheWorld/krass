import { NgModule } from '@angular/core';
import { CanvasComponent } from './canvas/canvas.component';

const declarations = [CanvasComponent];

@NgModule({
  imports: [],
  exports: [...declarations],
  declarations: [...declarations],
})
export class sharedModule {}
