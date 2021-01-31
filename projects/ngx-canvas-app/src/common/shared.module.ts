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
import { ColorTileComponent } from './color-tile/color-tile.component';
import { TooltipDirective } from './directives/tooltip.directive';

const declarations = [
    CanvasComponent,
    CreateCanvasDialogComponent,
    ColorPickerDialogComponent,
    TitlebarComponent,
    MenuItemComponent,
    PaperComponent,
    FooterComponent,
    ToolbarComponent,
    ColorTileComponent
];

@NgModule({
    imports: [MaterialComponentsModule, CommonModule],
    exports: [...declarations, MaterialComponentsModule],
    declarations: [...declarations, DialogTemplateComponent, PanelComponent, TooltipDirective]
})
export class SharedModule {}
