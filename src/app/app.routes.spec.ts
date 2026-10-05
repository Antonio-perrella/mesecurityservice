import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from './app.routes';
import { HomeComponent } from './pages/home/home.component';

describe('App routes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    });
  });

  it('should show the home page on the root', async () => {
    const harness = await RouterTestingHarness.create();
    const home = await harness.navigateByUrl('/', HomeComponent);
    expect(home).toBeInstanceOf(HomeComponent);
  });

  it('should redirect unknown paths to the home page', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/pagina-inesistente');
    expect(TestBed.inject(Router).url).toBe('/');
  });
});
