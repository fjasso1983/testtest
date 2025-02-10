import { OverlayRef } from '@angular/cdk/overlay';

export interface IUk2FilterChipOverlay {
  ngOnInit(): void;
  ngAfterContentInit(): void;
  ngOnDestroy(): void;
  open(): OverlayRef;
  close(): void;
  isOpen(): boolean;
  clearValue(): void;
  handleKeyEvent(event: KeyboardEvent): void;
}
