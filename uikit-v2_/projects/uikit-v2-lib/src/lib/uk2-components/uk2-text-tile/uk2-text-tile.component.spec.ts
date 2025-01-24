import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Uk2TextTileComponent } from './uk2-text-tile.component';
import { Uk2IconRegistryService } from '../../uk2-services/uk2-icon-registry/uk2-icon-registry.service';
import { MatIconModule } from '@angular/material/icon';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { Component } from '@angular/core';
import { uk2TextTileErrorConstants } from './constants';

@Component({
  template: `
    <uk2-text-tile
      [uk2TextTileTitle]="uk2TextTileTitle"
      [uk2TextTileIsStandaloneTile]="uk2TextTileIsStandaloneTile"
      [uk2TextTileDisplayBackground]="uk2TextTileDisplayBackground"
    >
      {{ uk2TextTileContent }}
    </uk2-text-tile>
  `,
})
class TestComponent {
  uk2TextTileTitle: any;
  uk2TextTileIsStandaloneTile: any;
  uk2TextTileDisplayBackground: any;
  uk2TextTileContent: any;
  constructor() {}
}

describe('Uk2TextTileComponent', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2TextTileComponent],
      imports: [MatIconModule, MatIconTestingModule],
      providers: [Uk2IconRegistryService],
    }).compileComponents();

    const service = TestBed.inject(Uk2IconRegistryService);
    service.registerAllCategories();
    fixture = TestBed.createComponent(TestComponent);
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display background when uk2TextTileDisplayBackground is true', () => {
    fixture.componentInstance.uk2TextTileDisplayBackground = true;
    fixture.componentInstance.uk2TextTileTitle = 'test';
    fixture.componentInstance.uk2TextTileContent = 'test';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.uk2-text-tile-background')).toBeTruthy();
  });

  it('should not display background when uk2TextTileDisplayBackground is false', () => {
    fixture.componentInstance.uk2TextTileDisplayBackground = false;
    fixture.componentInstance.uk2TextTileTitle = 'test';
    fixture.componentInstance.uk2TextTileContent = 'test';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.uk2-text-tile-background')).toBeFalsy();
  });

  it('should display as standalone tile when uk2TextTileIsStandaloneTile is true', () => {
    fixture.componentInstance.uk2TextTileIsStandaloneTile = true;
    fixture.componentInstance.uk2TextTileTitle = 'test';
    fixture.componentInstance.uk2TextTileContent = 'test';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.uk2-text-tile-standalone')).toBeTruthy();
  });

  it('should display as non-standalone tile when uk2TextTileIsStandaloneTile is false', () => {
    fixture.componentInstance.uk2TextTileIsStandaloneTile = false;
    fixture.componentInstance.uk2TextTileTitle = 'test';
    fixture.componentInstance.uk2TextTileContent = 'test';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.uk2-text-tile-nonstandalone')).toBeTruthy();
  });

  it('should display uk2TextTileTitle and uk2TextTileContent when they are passed', () => {
    const exampleString = 'test';
    fixture.componentInstance.uk2TextTileTitle = exampleString;
    fixture.componentInstance.uk2TextTileContent = exampleString;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.uk2-text-tile-title').innerText).toBe(exampleString);
    expect(fixture.nativeElement.querySelector('.uk2-text-tile-content').innerText).toBe(exampleString);
  });

  it('should require uk2TextTileTitle', () => {
    expect(() => {
      const exampleString = 'test';
      fixture.componentInstance.uk2TextTileContent = exampleString;
      fixture.detectChanges();
    }).toThrowError(uk2TextTileErrorConstants.errorUk2TextTileTitle);
  });

  it('should require content', () => {
    expect(() => {
      const exampleString = 'test';
      fixture.componentInstance.uk2TextTileTitle = exampleString;
      fixture.detectChanges();
    }).toThrowError(uk2TextTileErrorConstants.errorUk2TextTileContent);
  });
});
