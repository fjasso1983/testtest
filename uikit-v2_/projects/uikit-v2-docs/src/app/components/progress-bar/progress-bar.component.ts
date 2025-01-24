import { Component, OnInit } from '@angular/core';
import { BrandTopBarService } from '../brand-top-bar/brand-top-bar.service';
import { Uk2ProgressBarLabeledIconButtonModel } from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {
  uk2IsLoading = false;

  uk2HeaderIconButton: Uk2ProgressBarLabeledIconButtonModel = new Uk2ProgressBarLabeledIconButtonModel({
    svgIconName: 'uk2-log-out-R',
    labelText: 'Save & Exit',
  });

  uk2FooterIconButton: Uk2ProgressBarLabeledIconButtonModel = new Uk2ProgressBarLabeledIconButtonModel({
    svgIconName: 'uk2-chevron-left',
    labelText: 'Lorem Ipsum',
  });

  uk2LogoImgPath = '';
  uk2OrganizationName = '';
  uk2ProgressBarValue = 70;
  uk2HeaderText = 'Lorem ipsum dolor';

  constructor(private brandTopBarService: BrandTopBarService) {}

  ngOnInit(): void {
    this.brandTopBarService.topBar.subscribe(topBar => {
      this.uk2LogoImgPath = topBar.logoUrl;
      this.uk2OrganizationName = topBar.organizationName;
    });
  }

  toggleLoading() {
    this.uk2IsLoading = !this.uk2IsLoading;
  }

  uk2HeaderCallBackButton() {
    alert('function was executed');
  }

  uk2FooterCallBackButton() {
    alert('function was executed');
  }
}
