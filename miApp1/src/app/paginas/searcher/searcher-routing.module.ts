import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearcherPage } from './searcher';



const routes: Routes = [
  {
    path: '',
    component: SearcherPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearcherPageRoutingModule {}
