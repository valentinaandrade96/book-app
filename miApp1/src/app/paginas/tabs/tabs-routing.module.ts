import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [

  {
    path:'',
    redirectTo:'/tabs/tab1',
    pathMatch:'full'
  },
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path:'tab1',
        loadChildren: () => import('../button/button.module').then( m => m.ButtonPageModule)
      },
      {
        path:'tab2',
        loadChildren: () => import('../alert/alert.module').then(m => m.AlertPageModule)
      },
      {
        path:'tab3',
        loadChildren: () => import('../SCANNER/card.module').then(m => m.CardPageModule)
      }
    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
