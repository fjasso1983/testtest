import { AfterViewInit, Directive, EventEmitter, Input, OnChanges, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Uk2SortDirectionEnum } from './uk2-table-header-sorting/enums';

@Directive({
  selector: 'mat-table[uk2TableSorting]',
})
export class Uk2TableSortingDirective extends MatSort implements OnInit, OnChanges, AfterViewInit {
  @Input() uk2DisableTableSorting: boolean = false;
  @Input() uk2InitSortFirstColumn: boolean = true;
  @Input() uk2InitSortDirection: Uk2SortDirectionEnum = Uk2SortDirectionEnum.ascending;

  uk2DisableTableSortingChange = new EventEmitter<boolean>();
  uk2InitSortFirstColumnEmit = new EventEmitter<boolean>();

  private previousDisableSortingValue: boolean;

  constructor() {
    super();
    this.previousDisableSortingValue = this.uk2DisableTableSorting;
  }

  ngOnInit(): void {
    this.direction = this.uk2InitSortDirection;
  }

  ngAfterViewInit(): void {
    this.uk2DisableTableSortingChange.emit(this.uk2DisableTableSorting);
    this.uk2InitSortFirstColumnEmit.emit(this.uk2InitSortFirstColumn);
  }

  ngOnChanges(): void {
    if (this.previousDisableSortingValue !== this.uk2DisableTableSorting) {
      this.uk2DisableTableSortingChange.emit(this.uk2DisableTableSorting);
      this.previousDisableSortingValue = this.uk2DisableTableSorting;
    }
  }
}
