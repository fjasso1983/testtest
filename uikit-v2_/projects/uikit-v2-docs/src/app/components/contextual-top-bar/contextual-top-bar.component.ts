import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  Uk2BrandTopBarLabeledIconButtonModel,
  Uk2BreadcrumbsItem,
  Uk2ButtonSizeEnum,
  Uk2Tier1NavigationEnum,
  Uk2BreadcrumbsComponent,
} from '@axos/uikit-v2-lib';

import { BreadcrumbsService } from './../breadcrumbs/breadcrumbs.service';
import { BrandTopBarService } from '../brand-top-bar/brand-top-bar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contextual-top-bar',
  templateUrl: './contextual-top-bar.component.html',
  styleUrls: ['./contextual-top-bar.component.scss'],
})
export class ContextualTopBarComponent implements OnInit, OnDestroy {
  readonly arrowBackIcon = Uk2Tier1NavigationEnum.chevronLeft;
  uk2IsLoading = false;
  showBranTopBar = true;
  items: Uk2BreadcrumbsItem[] = [];
  buttonSize = Uk2ButtonSizeEnum.medium;
  labeledIconButton: Uk2BrandTopBarLabeledIconButtonModel = new Uk2BrandTopBarLabeledIconButtonModel({
    svgIconName: 'uk2-chevron-left',
    labelText: 'Test button text',
  });
  logoUrl = '';
  organizationName = '';
  @ViewChild('uk2Breadcrumbs') breadcrumbs?: Uk2BreadcrumbsComponent;
  constructor(
    public breadcrumbsService: BreadcrumbsService,
    private cd: ChangeDetectorRef,
    private elementRef: ElementRef,
    private brandTopBarService: BrandTopBarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.breadcrumbsService.items.subscribe(items => {
      this.items = items;
      this.cd.detectChanges();
    });
    this.elementRef.nativeElement.closest('.side-nav-content').classList.add('no-padding');
    this.brandTopBarService.topBar.subscribe(topBar => {
      this.logoUrl = topBar.logoUrl;
      this.organizationName = topBar.organizationName;
    });
  }

  toggleLoading() {
    this.uk2IsLoading = !this.uk2IsLoading;
  }

  toggleBranTopBar() {
    this.showBranTopBar = !this.showBranTopBar;
  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.closest('.side-nav-content').classList.remove('no-padding');
  }

  clickButtonTopBar() {}

  goBack() {
    if (this.items.length > 1) {
      let elem = this.items[this.items.length - 2];
      this.router.navigate([elem.url]);
      this.breadcrumbsService.items.subscribe(items => {
        this.items = items;
        this.cd.detectChanges();
      });
    }
  }
}
