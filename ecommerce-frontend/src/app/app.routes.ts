import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'register',
        loadComponent: () =>
            import('./pages/register/register.component').then(m => m.RegisterComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'home',
        loadComponent: () =>
            import('./pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'products',
        loadComponent: () =>
            import('./pages/products/products.component').then(m => m.ProductsComponent)
    },
    {
        path: 'product-details/:id',
        loadComponent: () =>
            import('./pages/product-details/product-details.component').then(m => m.ProductDetailsComponent)
    },
    {
        path: 'cart',
        loadComponent: () =>
            import('./pages/cart/cart.component').then(m => m.CartComponent)
    },
    {
        path: 'orders',
        loadComponent: () => import('./pages/orders/orders.component').then(m => m.OrdersComponent)
    },
    {
        path: 'admin/manage-products',
        loadComponent: () => import('./admin/manage-products/manage-products.component').then(m => m.ManageProductComponent)
    }
    ,

    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }

];
