import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Uk2IconRegistryService } from '@axos/uikit-v2-lib';
import { AppMaterialModule } from './app-material.module';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let iconRegistryService: Uk2IconRegistryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, AppMaterialModule, BrowserAnimationsModule],
      declarations: [AppComponent],
    }).compileComponents();

    iconRegistryService = TestBed.inject(Uk2IconRegistryService);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it("should have as title 'uikit-v2-lib documentation app'", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('uikit-v2-lib documentation app');
  });

  it('should register icons OnInit', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const registerIconsSpy = spyOn(iconRegistryService, 'registerIconsFromEnumValues');
    fixture.detectChanges();
    expect(registerIconsSpy).toHaveBeenCalled();
  });
});
