import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Uk2BrandTopBarLabeledIconButtonModel, Uk2BrandTopBarRedirectionUrlModel } from '@axos/uikit-v2-lib';
import { BrandTopBarService } from './brand-top-bar.service';

@Component({
  selector: 'app-brand-top-bar',
  templateUrl: './brand-top-bar.component.html',
  styleUrls: ['./brand-top-bar.component.scss'],
})
export class BrandTopBarComponent implements OnInit, OnDestroy {
  isLoading = false;
  isAxos = false;
  labeledIconButton: Uk2BrandTopBarLabeledIconButtonModel = new Uk2BrandTopBarLabeledIconButtonModel({
    svgIconName: 'uk2-chevron-left',
    labelText: 'Test button text',
  });

  logoUrl = '';
  organizationName = '';

  redirect1: Uk2BrandTopBarRedirectionUrlModel = new Uk2BrandTopBarRedirectionUrlModel({
    url: 'http://www.google.com',
  });

  redirect2: Uk2BrandTopBarRedirectionUrlModel = new Uk2BrandTopBarRedirectionUrlModel({
    url: 'http://www.google.com',
    openOnNewTab: false,
  });

  constructor(private elementRef: ElementRef, private brandTopBarService: BrandTopBarService) {}

  ngOnInit(): void {
    this.elementRef.nativeElement.closest('.side-nav-content').classList.add('no-padding');
    this.brandTopBarService.topBar.subscribe(topBar => {
      this.logoUrl = topBar.logoUrl;
      this.organizationName = topBar.organizationName;
    });
  }

  toggleLoading() {
    this.isLoading = !this.isLoading;
  }

  toggleIsAxos() {
    this.isAxos = !this.isAxos;
  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.closest('.side-nav-content').classList.remove('no-padding');
  }

  clickButtonTopBar() {}

  clickCloseButtonTopBar() {
    alert('Close button clicked');
  }
}
