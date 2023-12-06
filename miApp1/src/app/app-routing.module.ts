import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const rutas: Routes = [
 
  {
    path: '',
    redirectTo: 'first',
    pathMatch: 'full'
  },
 
  {
    path: 'first',
    loadChildren: () => import('./paginas/first/first.module').then( m => m.FirstPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./paginas/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)
  },
  
  {
    path: 'button',
    loadChildren: () => import('./paginas/button/button.module').then( m => m.ButtonPageModule)
  },


  {
    
    path: 'usuario',
    loadChildren: () => import('./paginas/usuario/usuario.module').then( m => m.UsuarioPageModule)
  },
  
  {
    
    path: 'card',
    loadChildren: () => import('./paginas/SCANNER/card.module').then( m => m.CardPageModule)
  }
  ,  
  {
    
    path: 'cambio',
    loadChildren: () => import('./paginas/cambio/cambio.module').then( m => m.CambioPageModule)
  } ,  
  {
    
    path: 'perfil',
    loadChildren: () => import('./paginas/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    
    path: 'admin',
    loadChildren: () => import('./paginas/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    
    path: 'libros',
    loadChildren: () => import('./paginas/libros/libros.module').then( m => m.LibrosPageModule)
  },
  
  {
    
    path: 'compras',
    loadChildren: () => import('./paginas/compras/compras.module').then( m => m.ComprasPageModule)
  },
  {
    
    path: 'libros/detalleadmin/:id',
    loadChildren: () => import('./paginas/libros/detalles-admin/detalles-admin.module').then( m => m.DetallesAdminPageModule)
  },
  {
    
    path: 'libros/detalles/:id',
    loadChildren: () => import('./paginas/libros/detalles/detalles.module').then( m => m.DetallesPageModule)
  },
  {path: 'favoritos',
   loadChildren: () => import('./paginas/favoritos/favoritos.module').then(m => m.FavoritosPageModule) 
},
{path: 'carrito',
 loadChildren: () => import('./paginas/carrito/carrito.module').then(m => m.CarritoPageModule) 
},
{path: 'nuevolibro',
 loadChildren: () => import('./paginas/nuevolibro/nuevolibro.module').then(m => m.NuevolibroPageModule) 
},
{path: 'stock',
 loadChildren: () => import('./paginas/stock/stock.module').then(m => m.StockPageModule) 
}
];

@NgModule({
  imports: [
    RouterModule.forRoot(rutas, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
