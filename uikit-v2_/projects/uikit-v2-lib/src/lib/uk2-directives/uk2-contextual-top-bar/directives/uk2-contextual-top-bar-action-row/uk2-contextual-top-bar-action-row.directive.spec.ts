import { Uk2ContextualTopBarActionTemplateRef } from '../../enums';
import { Uk2ContextualTopBarActionRowDirective } from './uk2-contextual-top-bar-action-row.directive';
import { ElementRef, EmbeddedViewRef, TemplateRef, ViewContainerRef } from '@angular/core';

describe('Uk2ContextualTopBarActionRowDirective', () => {
  let directive: Uk2ContextualTopBarActionRowDirective;
  let viewContainerRef: jasmine.SpyObj<ViewContainerRef>;
  let elementRef: jasmine.SpyObj<ElementRef<Element>>;
  const voidFakeFn = () => {};
  beforeEach(() => {
    viewContainerRef = jasmine.createSpyObj('ViewContainerRef', ['createEmbeddedView', 'remove', 'length']);
    elementRef = jasmine.createSpyObj('ElementRef', ['nativeElement']);
    directive = new Uk2ContextualTopBarActionRowDirective(viewContainerRef, elementRef);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should call back button template ref handler on input change', () => {
    // @ts-ignore: Change private access notation
    spyOn(directive, 'handleButtonTemplateRef').and.callFake(voidFakeFn);
    directive.uk2BackButton = undefined;
    // @ts-ignore: Change private access notation
    expect(directive.handleButtonTemplateRef).toHaveBeenCalled();
  })

  it('should call close button template ref handler on input change', () => {
    // @ts-ignore: Change private access notation
    spyOn(directive, 'handleButtonTemplateRef').and.callFake(voidFakeFn);
    directive.uk2CloseButton = undefined;
    // @ts-ignore: Change private access notation
    expect(directive.handleButtonTemplateRef).toHaveBeenCalled();
  })

  it('should handle undefined back button template ref', () => {
    // @ts-ignore: Change private access notation
    directive.handleButtonTemplateRef(undefined);
    expect(viewContainerRef.createEmbeddedView).not.toHaveBeenCalled();
  });

  it('should handle undefined close button template ref', () => {
    // @ts-ignore: Change private access notation
    directive.handleButtonTemplateRef(undefined);
    expect(viewContainerRef.createEmbeddedView).not.toHaveBeenCalled();
  });

  it('should remove previous close button template ref when templateRef is undefined', () => {
    const previousCloseButtonTemplateRef = {
      templateRef: jasmine.createSpyObj('TemplateRef', ['destroy']),
      index: 0,
    };
    // @ts-ignore: Change private access notation
    directive.uk2ButtonNodes.set(Uk2ContextualTopBarActionTemplateRef.backButton, previousCloseButtonTemplateRef);
    // @ts-ignore: Change private access notation
    directive.handleButtonTemplateRef(undefined, Uk2ContextualTopBarActionTemplateRef.backButton);
    expect(viewContainerRef.remove).toHaveBeenCalledWith(previousCloseButtonTemplateRef.index);
    expect(directive['uk2ButtonNodes'].has(Uk2ContextualTopBarActionTemplateRef.backButton)).toBe(false);
  });

  it('should remove previous back button template ref when templateRef is undefined', () => {
    const previousCloseButtonTemplateRef = {
      templateRef: jasmine.createSpyObj('TemplateRef', ['destroy']),
      index: 0,
    };
    // @ts-ignore: Change private access notation
    directive.uk2ButtonNodes.set(Uk2ContextualTopBarActionTemplateRef.closeButton, previousCloseButtonTemplateRef);
    // @ts-ignore: Change private access notation
    directive.handleButtonTemplateRef(undefined, Uk2ContextualTopBarActionTemplateRef.closeButton);
    expect(viewContainerRef.remove).toHaveBeenCalledWith(previousCloseButtonTemplateRef.index);
    expect(directive['uk2ButtonNodes'].has(Uk2ContextualTopBarActionTemplateRef.closeButton)).toBe(false);
  });

  it('should add new template ref for close button and set a local reference for later reference diff process', () => {
    // @ts-ignore: Change private access notation
    const bindUk2ButtonClassToRootNodeSpy = spyOn(directive, 'bindUk2ButtonClassToRootNode');
    // @ts-ignore: Change private access notation
    const setTemplateRefLocalReferenceSpy = spyOn(directive.uk2ButtonNodes, 'set');
    const firstTemplateRef = {} as TemplateRef<unknown>;
    const firsRootNodes = [document.createElement('div')];
    // @ts-ignore: Change private access notation
    viewContainerRef.length = 0;
    viewContainerRef.createEmbeddedView.and.returnValue({
      rootNodes: firsRootNodes,
    } as EmbeddedViewRef<unknown>);
    elementRef.nativeElement.appendChild = jasmine.createSpy('appendChildSpy');
    directive.uk2CloseButton = firstTemplateRef;
    expect(bindUk2ButtonClassToRootNodeSpy).toHaveBeenCalled();
    expect(setTemplateRefLocalReferenceSpy).toHaveBeenCalledWith(Uk2ContextualTopBarActionTemplateRef.closeButton, {
      templateRef: firstTemplateRef,
      index: 0,
    });
  });

  it('should add new template ref for close button and remove previous template ref', () => {
    // @ts-ignore: Change private access notation
    const bindUk2ButtonClassToRootNodeSpy = spyOn(directive, 'bindUk2ButtonClassToRootNode');
    // @ts-ignore: Change private access notation
    const setTemplateRefLocalReferenceSpy = spyOn(directive.uk2ButtonNodes, 'set');
    // @ts-ignore: Change private access notation
    spyOn(directive.uk2ButtonNodes, 'get').and.returnValue({
      templateRef: {} as TemplateRef<unknown>,
      index: 0
    })
    const secondTemplateRef = {} as TemplateRef<unknown>;
    const firsRootNodes = [document.createElement('div')];
    // @ts-ignore: Change private access notation
    viewContainerRef.length = 1;
    viewContainerRef.createEmbeddedView.and.returnValue({
      rootNodes: firsRootNodes,
    } as EmbeddedViewRef<unknown>);
    elementRef.nativeElement.appendChild = jasmine.createSpy('appendChildSpy');
    directive.uk2CloseButton = secondTemplateRef;
    expect(viewContainerRef.remove).toHaveBeenCalledWith(0);
    expect(bindUk2ButtonClassToRootNodeSpy).toHaveBeenCalled();
    expect(setTemplateRefLocalReferenceSpy).toHaveBeenCalledWith(Uk2ContextualTopBarActionTemplateRef.closeButton, {
      templateRef: secondTemplateRef,
      index: 0,
    });
  });

  it('should add new template ref for back button and set a local reference for later reference diff process', () => {
    // @ts-ignore: Change private access notation
    const bindUk2ButtonClassToRootNodeSpy = spyOn(directive, 'bindUk2ButtonClassToRootNode');
    // @ts-ignore: Change private access notation
    const setTemplateRefLocalReferenceSpy = spyOn(directive.uk2ButtonNodes, 'set');
    const firstTemplateRef = {} as TemplateRef<unknown>;
    const firsRootNodes = [document.createElement('div')];
    // @ts-ignore: Change private access notation
    viewContainerRef.length = 0;
    viewContainerRef.createEmbeddedView.and.returnValue({
      rootNodes: firsRootNodes,
    } as EmbeddedViewRef<unknown>);
    // @ts-ignore: Change private access notation
    elementRef.nativeElement.firstChild = document.createElement('div');
    elementRef.nativeElement.insertBefore = jasmine.createSpy('insertBeforeSpy');
    directive.uk2BackButton = firstTemplateRef;
    expect(bindUk2ButtonClassToRootNodeSpy).toHaveBeenCalled();
    expect(setTemplateRefLocalReferenceSpy).toHaveBeenCalledWith(Uk2ContextualTopBarActionTemplateRef.backButton, {
      templateRef: firstTemplateRef,
      index: 0,
    });
  });

  it('should add new template ref for back button and remove previous template ref', () => {
    // @ts-ignore: Change private access notation
    const bindUk2ButtonClassToRootNodeSpy = spyOn(directive, 'bindUk2ButtonClassToRootNode');
    // @ts-ignore: Change private access notation
    const setTemplateRefLocalReferenceSpy = spyOn(directive.uk2ButtonNodes, 'set');
    // @ts-ignore: Change private access notation
    spyOn(directive.uk2ButtonNodes, 'get').and.returnValue({
      templateRef: {} as TemplateRef<unknown>,
      index: 0
    })
    const secondTemplateRef = {} as TemplateRef<unknown>;
    const firsRootNodes = [document.createElement('div')];
    // @ts-ignore: Change private access notation
    viewContainerRef.length = 1;
    viewContainerRef.createEmbeddedView.and.returnValue({
      rootNodes: firsRootNodes,
    } as EmbeddedViewRef<unknown>);
    elementRef.nativeElement.insertBefore = jasmine.createSpy('insertBeforeSpy');
    directive.uk2BackButton = secondTemplateRef;
    expect(viewContainerRef.remove).toHaveBeenCalledWith(0);
    expect(bindUk2ButtonClassToRootNodeSpy).toHaveBeenCalled();
    expect(setTemplateRefLocalReferenceSpy).toHaveBeenCalledWith(Uk2ContextualTopBarActionTemplateRef.backButton, {
      templateRef: secondTemplateRef,
      index: 0,
    });
  });

  it('should append css class "uk2-contextual-top-bar-row-action-button" to the provided node', () => {
    const node = document.createElement('div');
    // @ts-ignore: Change private access notation
    directive.bindUk2ButtonClassToRootNode(node);
    expect(node.classList.contains('uk2-contextual-top-bar-row-action-button')).toBeTrue();
  });

});
