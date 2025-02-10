import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

import { MatIconModule } from '@angular/material/icon';

import { MATERIAL_CLASSES } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';
import { Uk2ListItem } from '@axos/uikit-v2-lib/src/lib/uk2-components';

import { Uk2ListItemComponent } from './uk2-list-item.component';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { Uk2IconRegistryService } from  '../../uk2-services/uk2-icon-registry/uk2-icon-registry.service';

describe('Uk2ListItemComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let service: Uk2IconRegistryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Uk2ListItemComponent, TestComponent],
      providers: [Uk2IconRegistryService],
      imports: [CommonModule, MatIconTestingModule, MatIconModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    service = TestBed.inject(Uk2IconRegistryService);
    service.registerAllCategories();
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('template', () => {
    describe('Chevron list item with all the options provided', () => {
      it('should render mat-icon provided by parent component', () => {
        const customLogoEl = getElement('.uk2-list-item .uk2-list-item-header .uk2-list-item-icon');

        expect(customLogoEl).toBeDefined();
      });

      it('should render money amount', () => {
        const moneyAmountEl = getElement('.uk2-list-item .uk2-list-item-money-amount');

        expect(moneyAmountEl).toBeDefined();
        expect(moneyAmountEl.textContent?.trim()).toBe('$20.99');
      });

      it('should render header and body text', () => {
        const headerLabelEl = getElement('.uk2-list-item .uk2-list-item-header-label-name');
        const bodyTextEl = getElement('.uk2-list-item .uk2-list-item-body-text');

        expect(headerLabelEl).toBeDefined();
        expect(headerLabelEl.textContent?.trim()).toBe('Option 1');

        expect(bodyTextEl).toBeDefined();
        expect(bodyTextEl.textContent?.trim()).toBe('Consecutar sit perlabum');
      });

      it('should render identifier text', () => {
        const identifier = getElement('.uk2-list-item .uk2-list-item-header-label-identifier');

        expect(identifier).toBeDefined();
        expect(identifier.textContent).toBe(' - 1234 ');
      });

      it('should project content specified from the client inside the component', () => {
        const contentProjectedEl = getElement('.content-projected-image');

        expect(contentProjectedEl).not.toBeNull();
      });
    });

    describe('Edge cases', () => {
      it('should render <img> element when imageUrl is set instead of mat-icon even if svgIconName is provided', () => {
        const url = 'https://www.icons.com/dollar.png';
        component.option = {
          headerLabelName: 'Option 1',
          showControl: true,
          moneyAmount: 20.99,
          bodyText: 'Consecutar sit perlabum',
          headerLabelIdentifier: '1234',
          svgIconName: 'uk2-location-pin',
          imageUrl: url,
          value: 'option1',
        };

        fixture.detectChanges();

        const svgIconEl = fixture.debugElement.query(By.css('mat-icon.uk2-list-item-icon'));
        const imgEl = getElement('img.uk2-list-item-icon');

        expect(svgIconEl).toBeNull();
        expect(imgEl).toBeDefined();
        expect(imgEl.attributes.getNamedItem('src')?.value).toBe(url);
      });

      it('should throw error if input [uk2ListItem] is not valid', () => {
        component.option = undefined as any;

        expect(() => {
          fixture.detectChanges();
        }).toThrowError('uk2ListItem is a required input for Uk2ListItemComponent');
      });
    });
  });

  function getElement(selector: string): HTMLElement {
    return fixture.debugElement.query(By.css(selector)).nativeElement;
  }
});

@Component({
  template: `
    <div [class]="matOptionClass" id="fake-mat-option">
      <uk2-list-item [uk2ListItem]="option">
        <img class="content-projected-image" src="http://www.test.com" alt="test image" />
      </uk2-list-item>
    </div>
  `,
})
class TestComponent {
  @Input() option: Uk2ListItem = {
    headerLabelName: 'Option 1',
    showControl: true,
    svgIconName: 'uk2-location-pin',
    moneyAmount: 20.99,
    bodyText: 'Consecutar sit perlabum',
    headerLabelIdentifier: '1234',
    imageUrl: '',
    value: 'option1',
  };

  matOptionClass = MATERIAL_CLASSES.matOption;
}
