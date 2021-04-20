import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../ui/ui.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FootbarComponent } from './components/footbar/footbar.component';

const declarations = [FootbarComponent];

@NgModule({
    declarations: [...declarations],
    exports: [...declarations, UiModule],
    imports: [CommonModule, UiModule, DragDropModule]
})
export class SiteModule {}
