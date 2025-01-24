import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

export class Hsl {
  hue = 0;
  saturation = 0;
  lightness = 0;

  constructor(hue: number, saturation: number, lightness: number) {
    this.hue = hue;
    this.saturation = saturation;
    this.lightness = lightness;
  }
}

const PRIMARY_BLUE_400_HEX = '#2F5B88';

@Component({
  selector: 'storybook-theming',
  templateUrl: './theming.component.html',
  styleUrls: ['./theming.component.scss'],
})
export class ThemingComponent implements OnChanges {
  @Input() accentColor = PRIMARY_BLUE_400_HEX; // primary / blue 400
  @Input() predefinedTheme = 'Default';

  private themeWrapper = document.querySelector('body');

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    this.handlePrimaryAccentColorChange(changes);
    this.handleThemeChange(changes);
  }

  loadTheme(theme: string) {
    switch (theme) {
      case 'Default':
        this.loadDefaultTheme();
        break;
      case 'Lexman':
        this.loadLexmanTheme();
        break;
      case 'Org1':
        this.loadRIA1Theme();
        break;
      case 'Org2':
        this.loadRIA2Theme();
        break;
      case 'Org3':
        this.loadRIA3Theme();
        break;
    }
  }

  loadDefaultTheme() {
    // UI KIT is shipped with a default theme based on Neutral Slate color. To load it we just remove all overrides for the CSS variables
    this.resetAccentColorHslVariables();
    this.resetGlobalVariables();
    this.resetComponentSpecificVariables();
  }

  loadLexmanTheme() {
    const primaryGold400Hex = '#8B680E';
    const bannerColorHex = '#1F3D2B';

    const primaryAccentHsl = this.hexToHsl(primaryGold400Hex);
    this.setPrimaryAccentHsl(primaryAccentHsl.hue, primaryAccentHsl.saturation, primaryAccentHsl.lightness);

    this.setRiaSpecificVariables();
    // global variables
    this.themeWrapper?.style.setProperty('--uk2-header-font-color', bannerColorHex);
    this.themeWrapper?.style.setProperty('--uk2-brand-top-bar-color-bar-color', bannerColorHex);
  }

  loadRIA1Theme() {
    const primaryAccentColorHex = '#E1A67F';
    const bannerColorHex = '#E66536';
    const primaryAccentHsl = this.hexToHsl(primaryAccentColorHex);
    this.setPrimaryAccentHsl(primaryAccentHsl.hue, primaryAccentHsl.saturation, primaryAccentHsl.lightness);
    this.setRiaSpecificVariables();
    // global variables
    this.themeWrapper?.style.setProperty('--uk2-header-font-color', bannerColorHex);
    this.themeWrapper?.style.setProperty('--uk2-brand-top-bar-color-bar-color', bannerColorHex);
  }

  loadRIA2Theme() {
    const primaryAccentColorHex = '#46F0E3';
    const bannerColorHex = '#1CAF9A';

    const primaryAccentHsl = this.hexToHsl(primaryAccentColorHex);
    this.setPrimaryAccentHsl(primaryAccentHsl.hue, primaryAccentHsl.saturation, primaryAccentHsl.lightness);

    this.setRiaSpecificVariables();

    // global variables
    this.themeWrapper?.style.setProperty('--uk2-header-font-color', bannerColorHex);
    this.themeWrapper?.style.setProperty('--uk2-brand-top-bar-color-bar-color', bannerColorHex);
  }

  loadRIA3Theme() {
    const primaryAccentColorHex = '#2F836C';
    const bannerColorHex = '#054223';

    const primaryAccentHsl = this.hexToHsl(primaryAccentColorHex);
    this.setPrimaryAccentHsl(primaryAccentHsl.hue, primaryAccentHsl.saturation, primaryAccentHsl.lightness);

    this.setRiaSpecificVariables();

    // global variables
    this.themeWrapper?.style.setProperty('--uk2-header-font-color', bannerColorHex);
    this.themeWrapper?.style.setProperty('--uk2-brand-top-bar-color-bar-color', bannerColorHex);
  }

  setPrimaryAccentHsl(hue: number, saturation: number, lightness: number) {
    this.themeWrapper?.style.setProperty(
      '--uk2-accent-color-hsl',
      'hsl(' + hue + ',' + saturation + '%,' + lightness + '%)'
    );
    this.themeWrapper?.style.setProperty('--uk2-accent-color-hsl-h', '' + hue + '');
    this.themeWrapper?.style.setProperty('--uk2-accent-color-hsl-s', '' + saturation + '%');
    this.themeWrapper?.style.setProperty('--uk2-accent-color-hsl-l', '' + lightness + '%');
  }

  private setRiaSpecificVariables() {
    this.resetComponentSpecificVariables();
    this.setRIAVariableOverwrites();
  }

  private setRIAVariableOverwrites() {
    this.themeWrapper?.style.setProperty('--uk2-form-field-general-active-color', 'var(--uk2-neutral-slate-400)');
    this.themeWrapper?.style.setProperty('--uk2-labeled-icon-button-color', 'var(--uk2-neutral-slate-400)');
    this.themeWrapper?.style.setProperty('--uk2-tooltip-icon-color', 'var(--uk2-neutral-slate-400)');
    this.themeWrapper?.style.setProperty('--uk2-tooltip-label-color', 'var(--uk2-neutral-slate-400)');
    this.themeWrapper?.style.setProperty(
      '--uk2-checkbox-selection-cards-label-selected',
      'var(--uk2-neutral-slate-500)'
    );
    this.themeWrapper?.style.setProperty(
      '--uk2-checkbox-selection-cards-text-selected',
      'var(--uk2-neutral-slate-400)'
    );
    this.themeWrapper?.style.setProperty(
      '--uk2-checkbox-selection-cards-left-icon-selected',
      'var(--uk2-neutral-slate-400)'
    );
    this.themeWrapper?.style.setProperty(
      '--uk2-checkbox-selection-cards-chevron-icon-selected',
      'var(--uk2-neutral-slate-500)'
    );
    this.themeWrapper?.style.setProperty('--uk2-text-icon-button-neutral-color', 'var(--uk2-neutral-slate-400)');
    this.themeWrapper?.style.setProperty('--uk2-text-icon-button-neutral-color-hover', 'var(--uk2-neutral-slate-400)');
    this.themeWrapper?.style.setProperty(
      '--uk2-text-icon-button-neutral-color-text-variant',
      'var(--uk2-neutral-slate-400)'
    );
    this.themeWrapper?.style.setProperty(
      '--uk2-text-icon-button-neutral-color-text-variant-hover',
      'var(--uk2-neutral-slate-500)'
    );
  }

  private resetGlobalVariables() {
    this.themeWrapper?.style.removeProperty('--uk2-header-font-color');
    this.themeWrapper?.style.removeProperty('--uk2-brand-top-bar-color-bar-color');
  }

  private resetComponentSpecificVariables() {
    // UI KIT already handles the correct color for the following items. Those are overwritten for Axos only
    this.themeWrapper?.style.removeProperty('--uk2-form-field-general-active-color');
    this.themeWrapper?.style.removeProperty('--uk2-tooltip-label-color');
    this.themeWrapper?.style.removeProperty('--uk2-tooltip-icon-color');
    this.themeWrapper?.style.removeProperty('--uk2-labeled-icon-button-color');
    this.themeWrapper?.style.removeProperty('--uk2-checkbox-selection-cards-label-selected');
    this.themeWrapper?.style.removeProperty('--uk2-checkbox-selection-cards-text-selected');
    this.themeWrapper?.style.removeProperty('--uk2-checkbox-selection-cards-left-icon-selected');
    this.themeWrapper?.style.removeProperty('--uk2-checkbox-selection-cards-chevron-icon-selected');
    this.themeWrapper?.style.removeProperty('--uk2-text-icon-button-neutral-color');
    this.themeWrapper?.style.removeProperty('--uk2-chips-default-stroke-color');
    this.themeWrapper?.style.removeProperty('--uk2-chips-selected-stroke-color');
    this.themeWrapper?.style.removeProperty('--uk2-chips-hover-stroke-color');
    this.themeWrapper?.style.removeProperty('--uk2-chips-default-surface-color');
    this.themeWrapper?.style.removeProperty('--uk2-chips-selected-surface-color');
    this.themeWrapper?.style.removeProperty('--uk2-chips-disabled-stroke-color');
    this.themeWrapper?.style.removeProperty('--uk2-chips-text-disabled-color');
    this.themeWrapper?.style.removeProperty('--uk2-chips-icon-disabled-color');
    this.themeWrapper?.style.removeProperty('--uk2-chips-icon-color');
    this.themeWrapper?.style.removeProperty('--uk2-chips-icon-color');
    this.themeWrapper?.style.removeProperty('--uk2-file-uploader-drag-drop-interacted-stroke-color');
    this.themeWrapper?.style.removeProperty('--uk2-file-uploader-drag-drop-header-color');
    this.themeWrapper?.style.removeProperty('--uk2-file-uploader-drag-drop-text-color');
    this.themeWrapper?.style.removeProperty('--uk2-file-uploader-drag-drop-stroke-color');
    this.themeWrapper?.style.removeProperty('--uk2-file-uploader-drag-drop-icon-color');
    this.themeWrapper?.style.removeProperty('--uk2-file-uploader-drag-drop-surface-color');
    this.themeWrapper?.style.removeProperty('--uk2-loading-spinner-stroke-color');
    this.themeWrapper?.style.removeProperty('--uk2-file-uploader-display-icon-color');
    this.themeWrapper?.style.removeProperty('--uk2-file-uploader-display-surface-color');
    this.themeWrapper?.style.removeProperty('--uk2-file-uploader-display-text-color');
    this.themeWrapper?.style.removeProperty('--uk2-file-uploader-display-stroke-color');
  }

  private handleThemeChange(changes: SimpleChanges) {
    if (changes.predefinedTheme) {
      this.loadTheme(changes.predefinedTheme.currentValue);
    }
  }

  private handlePrimaryAccentColorChange(changes: SimpleChanges) {
    this.themeWrapper?.style.removeProperty('--uk2-brand-top-bar-color-bar-color');
    if (changes.accentColor) {
      const hsl = this.getHslFormat(changes.accentColor.currentValue);
      if (hsl) {
        this.setPrimaryAccentHsl(hsl.hue, hsl.saturation, hsl.lightness);
      } else {
        // Remove variables and use default theme coming from UI KIT
        this.resetAccentColorHslVariables();
      }
    }
  }

  private resetAccentColorHslVariables() {
    this.themeWrapper?.style.removeProperty('--uk2-accent-color-hsl');
    this.themeWrapper?.style.removeProperty('--uk2-accent-color-hsl-h');
    this.themeWrapper?.style.removeProperty('--uk2-accent-color-hsl-s');
    this.themeWrapper?.style.removeProperty('--uk2-accent-color-hsl-l');
  }

  private getHslFormat(newValue: string) {
    const colorDefinedSelector = newValue.charAt(0);
    let hsl = null;

    if (colorDefinedSelector === '#') {
      hsl = this.hexToHsl(newValue);
    }

    if (colorDefinedSelector === 'h') {
      hsl = this.extractHSLValues(newValue);
    }

    if (colorDefinedSelector === 'r') {
      hsl = this.rgbaToHsl(newValue);
    }

    return hsl;
  }

  private extractHSLValues(colorString: string): Hsl | null {
    // Forcing hsl format and not hsla
    colorString = colorString.replace('hsla', 'hsl');
    colorString = colorString.replace(', 1)', ')');

    // Removing % sign for clean number conversion
    colorString = colorString.replace('%', '');
    colorString = colorString.replace('%', '');

    // Check if the color string is in the HSL format
    if (colorString.startsWith('hsl(') && colorString.endsWith(')')) {
      // Extract the HSL values from the string
      const values = colorString
        .substring(4, colorString.length - 1) // Remove 'hsl(' and ')'
        .split(',') // Split the values by comma
        .map(value => Number(value.trim())); // Convert each value to a number

      // Make sure there are exactly three values
      if (values.length === 3) {
        return new Hsl(values[0], values[1], values[2]);
      }
    }

    // Return null if the color string is not in the HSL format or does not have three values
    return null;
  }

  private hexToHsl(hex: string) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    r /= 255;
    g /= 255;
    b /= 255;

    return this.convertRgbToHsl(r, g, b);
  }

  private rgbaToHsl(rgbaString: string) {
    let rgbString = rgbaString.replace('rgba', 'rgb');
    rgbString = rgbString.replace(', 1)', ')');

    const values = rgbString
      .substring(4, rgbString.length - 1) // Remove 'rgb(' and ')'
      .split(',') // Split the values by comma
      .map(value => Number(value.trim()) / 255); // Convert each value to a number

    return this.convertRgbToHsl(values[0], values[1], values[2]);
  }

  private convertRgbToHsl(r: number, g: number, b: number) {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max == min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      hue: Math.round(h * 360),
      saturation: Math.round(s * 100),
      lightness: Math.round(l * 100),
    };
  }
}
