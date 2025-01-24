import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Uk2ColorBarComponent } from './uk2-color-bar.component';
import { SimpleChange, SimpleChanges } from '@angular/core';

describe('Uk2ColorBarComponent', () => {
  let component: Uk2ColorBarComponent;
  let fixture: ComponentFixture<Uk2ColorBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Uk2ColorBarComponent ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Uk2ColorBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty string as default value for uk2ClassName', () => {
    expect(component.uk2ClassName).toBe('');
  });

  it('should have uk2IsLoading as false by default', () => {
    expect(component.uk2IsLoading).toBeFalse();
  });

  it('should add uk2-color-bar__is-loading class to color bar when set to loading state', () => {
    component.uk2IsLoading = true;
    fixture.detectChanges();
    const topBarElement = fixture.debugElement.query(By.css('.uk2-color-bar'));
    const nativeElement = topBarElement.nativeElement as HTMLElement;
    expect(nativeElement.classList).toContain('uk2-color-bar__is-loading');

  });

  it('should have element defined by class "uk2-color-bar"', () => {
    const topBarElement = fixture.debugElement.query(By.css('.uk2-color-bar'));
    expect(topBarElement).toBeDefined();
  });


  it('should concatenate className to applied classes for the top bar color element', () => {
    component.uk2ClassName = "uk2-some-modifier-class";
    fixture.detectChanges();
    const topBarElement = fixture.debugElement.query(By.css('.uk2-color-bar'));
    const nativeElement = topBarElement.nativeElement as HTMLElement;
    expect(nativeElement.classList).toContain(component.uk2ClassName);
  });

  it('should return true if value is a css variable', () => {
    // @ts-ignore
    const result = component.isVariableNameColor('--some-color');
    expect(result).toBeTrue();
  });

  it('should return false if value is not a css variable', () => {
    // @ts-ignore
    const result = component.isVariableNameColor('red');
    expect(result).toBeFalse();
  });

  it('should create a css property value for background property if the value is a css variable', () => {
    // @ts-ignore
    const result = component.defineColorBarColor('--some-color');
    expect(result).toBe('var(--some-color)');
  });

  it('should return the value if it is not a css variable', () => {
    // @ts-ignore
    const result = component.defineColorBarColor('red');
    expect(result).toBe('red');
  });

  it('should set the background color of the color bar element to the value of uk2BackgroundColor', () => {
    component.handleColorBarColorChange('red');
    fixture.detectChanges();
    const topBarElement = fixture.debugElement.query(By.css('.uk2-color-bar'));
    const nativeElement = topBarElement.nativeElement as HTMLElement;
    expect(nativeElement.style.background).toBe('red');
  });

  it('should set the background color of the color bar element to "--uk2-brand-top-bar-color-bar-color" as default', () => {
    component.ngOnInit();
    fixture.detectChanges();
    const topBarElement = fixture.debugElement.query(By.css('.uk2-color-bar'));
    const nativeElement = topBarElement.nativeElement as HTMLElement;
    expect(nativeElement.style.background).toBe('var(--uk2-brand-top-bar-color-bar-color)');
  });

  it('should remove background color if uk2IsLoading is set to true', () => {
    component.handleColorBarColorChange('red');
    fixture.detectChanges();
    const topBarElement = fixture.debugElement.query(By.css('.uk2-color-bar'));
    const nativeElement = topBarElement.nativeElement as HTMLElement;
    expect(nativeElement.style.background).toBe('red');
    component.uk2IsLoading = true;
    component.handleColorBarColorChange('red');
    fixture.detectChanges();
    expect(nativeElement.style.background).toBe('');
  });

  it('should add background property on changes when uk2IsLoading is false', () => {
    const changes:SimpleChanges = {
      uk2IsLoading: new SimpleChange(false, false, true),
      uk2BackgroundColor: new SimpleChange('--uk2-brand-top-bar-color-bar-color','red',true),
    };
    component.ngOnChanges(changes);
    fixture.detectChanges();
    const topBarElement = fixture.debugElement.query(By.css('.uk2-color-bar'));
    const nativeElement = topBarElement.nativeElement as HTMLElement;
    expect(nativeElement.style.background).toBe('red');
  });

  it('shoulld remove background property on changes when uk2IsLoading is true', () => {
    const changes:SimpleChanges = {
      uk2IsLoading: new SimpleChange(false, true, true),
      uk2BackgroundColor: new SimpleChange('--uk2-brand-top-bar-color-bar-color','red',true),
    };
    component.uk2IsLoading = true;
    component.ngOnChanges(changes);
    fixture.detectChanges();
    const topBarElement = fixture.debugElement.query(By.css('.uk2-color-bar'));
    const nativeElement = topBarElement.nativeElement as HTMLElement;
    expect(nativeElement.style.background).toBe('');
  });
});
