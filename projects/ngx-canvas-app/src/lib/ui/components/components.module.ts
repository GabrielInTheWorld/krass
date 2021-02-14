import { PaintingUtensilsButtonComponent } from './painting-utensils-button/painting-utensils-button.component';
import { CursorComponent } from './cursor/cursor.component';
import { CustomIconComponent } from './custom-icon/custom-icon.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogTemplateComponent } from './dialogs/dialog-template/dialog-template.component';
import { ColorPickerDialogComponent } from './dialogs/color-picker-dialog/color-picker-dialog.component';
import { CreateCanvasDialogComponent } from './dialogs/create-canvas-dialog/create-canvas-dialog.component';
import { ColorTileComponent } from './color-tile/color-tile.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FooterComponent } from './footer/footer.component';
import { PaperComponent } from './paper/paper.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { TitlebarComponent } from './titlebar/titlebar.component';
import { CanvasComponent } from './canvas/canvas.component';
import { MaterialComponentsModule } from './material-design/material-components.module';

const declarations = [
    PaintingUtensilsButtonComponent,
    CanvasComponent,
    TitlebarComponent,
    MenuItemComponent,
    PaperComponent,
    FooterComponent,
    ToolbarComponent,
    ColorTileComponent,
    CreateCanvasDialogComponent,
    ColorPickerDialogComponent,
    DialogTemplateComponent,
    CursorComponent,
    CustomIconComponent
];

@NgModule({
    declarations: [...declarations],
    imports: [CommonModule, MaterialComponentsModule],
    exports: [...declarations]
})
export class ComponentsModule {}
