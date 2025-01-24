import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { MatIconTestingModule } from '@angular/material/icon/testing';
import { ObserversModule } from '@angular/cdk/observers';

import { Uk2TooltipModule } from '../../uk2-tooltip';
import { Uk2TileHeaderTextBehaviorEnum } from './enums';
import { Uk2TileHeaderLinkComponent } from './uk2-tile-header-link.component';

describe('Uk2TileHeaderLinkComponent', () => {
  let fixture: ComponentFixture<TileHeaderComponentTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Uk2TileHeaderLinkComponent, TileHeaderComponentTestComponent, TooltipComponentMock],
      imports: [CommonModule, MatIconTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TileHeaderComponentTestComponent);

    fixture.detectChanges();
  });

  it('should project template content with class name "uk2-tooltip-content" inside tooltip and general template inside header component', () => {
    const tooltip = fixture.debugElement.nativeElement.querySelector('uk2-tooltip');
    const header = fixture.debugElement.nativeElement.querySelector('.uk2-tile-header-link__text h2');

    expect(header.textContent).toBe('Lorem Ipsum');
    expect(tooltip).not.toBeNull();
  });
});

describe('Uk2TileHeaderLinkComponent', () => {
  let fixture: ComponentFixture<TileHeaderLinkComponentTestComponent>;
  let component: TileHeaderLinkComponentTestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Uk2TileHeaderLinkComponent, TileHeaderLinkComponentTestComponent],
      imports: [CommonModule, MatIconTestingModule, Uk2TooltipModule, ObserversModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TileHeaderLinkComponentTestComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should project a chevron-right icon if content has an anchor', async () => {
    const icons = fixture.debugElement.nativeElement.querySelectorAll('mat-icon');

    expect(icons.length).toBe(2);
    expect(icons[1].getAttribute('svgicon')).toBe('uk2-chevron-right');
  });

  it('should emit an event when chevron is clicked', async () => {
    const tooltip = fixture.debugElement.nativeElement.querySelector('.uk2-tile-header-link-chevron');
    const spy = spyOn(component, 'onChevronClick');

    tooltip.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should render chevron if parent component changes the header content with an anchor', async done => {
    let chevronIcon;
    let anchorEl;
    let titleH2El;
    component.showAnchor = false;
    fixture.detectChanges();

    setTimeout(() => {
      titleH2El = fixture.debugElement.nativeElement.querySelector('h2');
      chevronIcon = fixture.debugElement.nativeElement.querySelector('.uk2-tile-header-link-chevron');
      anchorEl = fixture.debugElement.nativeElement.querySelector('a');

      expect(titleH2El).not.toBeNull();
      expect(anchorEl).toBeNull();
      expect(chevronIcon).toBeNull();

      component.showAnchor = true;
      fixture.detectChanges();

      setTimeout(() => {
        chevronIcon = fixture.debugElement.nativeElement.querySelector('.uk2-tile-header-link-chevron');
        anchorEl = fixture.debugElement.nativeElement.querySelector('a');
        titleH2El = fixture.debugElement.nativeElement.querySelector('h2');

        expect(titleH2El).toBeNull();
        expect(chevronIcon).not.toBeNull();
        expect(anchorEl).not.toBeNull();
        done();
      });
    });
  });

  it('should add class uk2-tile-header-truncate if uk2TextBehavior is truncate', () => {
    component.textBehavior = Uk2TileHeaderTextBehaviorEnum.truncate;
    fixture.detectChanges();
    const header = fixture.debugElement.nativeElement.querySelector('uk2-tile-header-link');

    expect(header.classList).toContain('uk2-tile-header-truncate');
  });

  it('should not add class uk2-tile-header-truncate if uk2TextBehavior is wrap', async () => {
    component.textBehavior = Uk2TileHeaderTextBehaviorEnum.wrap;
    fixture.detectChanges();

    const header = fixture.debugElement.nativeElement.querySelector('uk2-tile-header-link');

    expect(header.classList).not.toContain('uk2-tile-header-truncate');
  });
});

@Component({
  template: `
    <uk2-tile-header-link uk2TooltipIconName="uk2-info-circle" [uk2ShowTooltip]="true">
      <h2 class="uk2-tile-header">Lorem Ipsum</h2>
      <div class="uk2-tile-tooltip-content">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat maxime deleniti veniam eaque itaque
          laboriosam tempora modi ullam temporibus eius fugit assumenda quidem, voluptate, quae minus sapiente possimus
          officia iure!
        </p>
      </div>
    </uk2-tile-header-link>
  `,
})
class TileHeaderComponentTestComponent {}

@Component({
  template: `
    <uk2-tile-header-link
      uk2TooltipIconName="uk2-info-circle"
      [uk2ShowTooltip]="true"
      [uk2TextBehavior]="textBehavior"
      (uk2ChevronClick)="onChevronClick()"
    >
      <div class="uk2-tile-header">
        <a href="https://www.google.com" *ngIf="showAnchor">Link</a>
        <h2 *ngIf="!showAnchor">Title</h2>
      </div>
      <div class="uk2-tile-tooltip-content">
        <p> Lorem ipsum dolor sit </p>
      </div>
    </uk2-tile-header-link>
  `,
})
class TileHeaderLinkComponentTestComponent {
  showAnchor = true;
  textBehavior = Uk2TileHeaderTextBehaviorEnum.truncate;
  onChevronClick() {}
}

@Component({
  selector: 'uk2-tooltip',
  template: `<div>tooltip</div>`,
})
class TooltipComponentMock {}
