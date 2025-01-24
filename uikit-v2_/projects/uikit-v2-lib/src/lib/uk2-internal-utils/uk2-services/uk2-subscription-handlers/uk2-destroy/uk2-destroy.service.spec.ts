import { TestBed } from "@angular/core/testing";
import { Uk2DestroyService } from "./uk2-destroy.service";

describe('Uk2DestroyService', () => {
  let service: Uk2DestroyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Uk2DestroyService],
    });
    service = TestBed.inject(Uk2DestroyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call next and complete on destroy', () => {
    const nextSpy = spyOn(service, 'next');
    const completeSpy = spyOn(service, 'complete');

    service.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
