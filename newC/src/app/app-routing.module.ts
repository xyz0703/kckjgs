import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyPreloadingStrategy } from './my-preloading-strategy';
import { AppComponent } from './app.component';


const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/+routing').then(m => m.HomeRoutingModule),
        data: { preload: true, title: '业务' }
      },
      {
        path: 'addressChoice',
        loadChildren: () => import('./addressChoice/+routing').then(m => m.AddressChoicRoutingModule),
        data: { preload: true, title: '地点选择' }
      },
      {
        path: 'cityChoice',
        loadChildren: () => import('./cityChoice/+routing').then(m => m.CityChoiceRoutingModule),
        data: { preload: true, title: '城市选择' }
      },
      {
        path: 'information',
        loadChildren: () => import('./information/+routing').then(m => m.InformationRoutingModule),
        data: { preload: true, title: '个人资料' }
      },
      {
        path: 'login',
        loadChildren: () => import('./login/+routing').then(m => m.LoginRoutingModule),
        data: { preload: true, title: '个人资料' }
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: MyPreloadingStrategy //我们的预加载策略
    })
  ],
  exports: [RouterModule],
  providers: [MyPreloadingStrategy]

})
export class AppRoutingModule { }
