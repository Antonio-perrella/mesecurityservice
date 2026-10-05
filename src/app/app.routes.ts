import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'ME Security Service',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'servizi',
    title: 'Servizi | ME Security Service',
    loadComponent: () => import('./pages/servizi/servizi.component').then(m => m.ServiziComponent),
  },
  {
    path: 'chi-siamo',
    title: 'Chi siamo | ME Security Service',
    loadComponent: () => import('./pages/chi-siamo/chi-siamo.component').then(m => m.ChiSiamoComponent),
  },
  {
    path: 'contatti',
    title: 'Contatti | ME Security Service',
    loadComponent: () => import('./pages/contatti/contatti.component').then(m => m.ContattiComponent),
  },
  {
    path: 'preventivo',
    title: 'Preventivo | ME Security Service',
    loadComponent: () => import('./pages/preventivo/preventivo.component').then(m => m.PreventivoComponent),
  },
  {
    path: 'privacy-policy',
    title: 'Privacy Policy | ME Security Service',
    loadComponent: () => import('./pages/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent),
  },
  {
    path: 'cookie-policy',
    title: 'Cookie Policy | ME Security Service',
    loadComponent: () => import('./pages/cookie-policy/cookie-policy.component').then(m => m.CookiePolicyComponent),
  },
  { path: '**', redirectTo: '' },
];
