import { MatSlider } from '@angular/material/slider';

import { Uk2SliderThumbDirective } from './uk2-slider-thumb.directive';
import { MaterialSliderPosition } from '../../uk2-constants';

describe('Uk2SliderThumbDirective', () => {
  let directive: Uk2SliderThumbDirective;
  let matSliderMock: any;
  beforeEach(() => {
    matSliderMock = {
      _updateThumbUI() {},
      _skipUpdate() {
        return false;
      },
      _thumbs: {
        first: {
          _hostElement: {
            style: {
              transform: '',
            },
          },
        },
      },
      _cachedWidth: 200,
    } as unknown as MatSlider;

    directive = new Uk2SliderThumbDirective(matSliderMock);
  });

  describe('ngOnInit', () => {
    it('should override matslider method _updateThumbUI to have a defined min/max values for translate', () => {
      directive.ngOnInit();

      matSliderMock._updateThumbUI({ translateX: 500 });

      const expectedCalculation = matSliderMock._cachedWidth - MaterialSliderPosition.MAX;

      expect(matSliderMock._thumbs.first._hostElement.style.transform).toBe(`translateX(${expectedCalculation}px)`);
    });

    it('should not update translate property if _skipUpdate method returns true', () => {
      directive.ngOnInit();

      matSliderMock._skipUpdate = () => true;
      matSliderMock._updateThumbUI({ translateX: 500 });

      expect(matSliderMock._thumbs.first._hostElement.style.transform).toBe('');
    });
  });
});
