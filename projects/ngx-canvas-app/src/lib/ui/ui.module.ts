import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectivesModule } from './directives/directives.module';
import { ComponentsModule } from './components/components.module';
import { MaterialComponentsModule } from './components/material-design/material-components.module';

const modules = [ComponentsModule, DirectivesModule];

@NgModule({
    exports: [...modules, MaterialComponentsModule],
    imports: [CommonModule, ...modules, MaterialComponentsModule]
})
export class UiModule {}
