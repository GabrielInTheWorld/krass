import { SiteComponent } from './site.component';
import { NgModule } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: SiteComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SiteRoutingModule {}
