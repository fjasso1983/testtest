import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileViewerFullScreenComponent } from './file-viewer-full-screen.component';

describe('FileViewerFullScreenComponent', () => {
  let component: FileViewerFullScreenComponent;
  let fixture: ComponentFixture<FileViewerFullScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileViewerFullScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileViewerFullScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
