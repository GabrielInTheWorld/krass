import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CanvasComponent } from './canvas/canvas.component';
import { CreateCanvasDialogComponent } from './dialogs/create-canvas-dialog/create-canvas-dialog.component';
import { ColorPickerDialogComponent } from './dialogs/color-picker-dialog/color-picker-dialog.component';
import { TitlebarComponent } from './titlebar/titlebar.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MaterialComponentsModule } from './material-design/material-components.module';
import { DialogTemplateComponent } from './dialogs/dialog-template/dialog-template.component';
import { PaperComponent } from './paper/paper.component';
import { FooterComponent } from './footer/footer.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { PanelComponent } from './panel/panel.component';

const declarations = [
    CanvasComponent,
    CreateCanvasDialogComponent,
    ColorPickerDialogComponent,
    TitlebarComponent,
    MenuItemComponent,
    PaperComponent,
    FooterComponent,
    ToolbarComponent
];

@NgModule({
    imports: [MaterialComponentsModule, CommonModule],
    exports: [...declarations],
    declarations: [...declarations, DialogTemplateComponent, PanelComponent]
})
export class SharedModule {}
