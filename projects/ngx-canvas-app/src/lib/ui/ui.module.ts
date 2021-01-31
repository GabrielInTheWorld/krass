import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaintingUtensilsButtonComponent } from './components/painting-utensils-button/painting-utensils-button.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { TitlebarComponent } from './components/titlebar/titlebar.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { PaperComponent } from './components/paper/paper.component';
import { FooterComponent } from './components/footer/footer.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ColorTileComponent } from './components/color-tile/color-tile.component';
import { CreateCanvasDialogComponent } from './components/dialogs/create-canvas-dialog/create-canvas-dialog.component';
import { ColorPickerDialogComponent } from './components/dialogs/color-picker-dialog/color-picker-dialog.component';
import { DialogTemplateComponent } from './components/dialogs/dialog-template/dialog-template.component';
import { MaterialComponentsModule } from './components/material-design/material-components.module';

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
    DialogTemplateComponent
];

@NgModule({
    declarations: [...declarations],
    exports: [...declarations, MaterialComponentsModule],
    imports: [CommonModule, MaterialComponentsModule]
})
export class UiModule {}
