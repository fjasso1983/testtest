import { Component, Input,  OnInit } from '@angular/core';
import { Uk2IconRegistryService, Uk2ListItem, Uk2ListItemCurrencyOptions, Uk2Tier1UtilityEnum } from '@axos/uikit-v2-lib';
import { CdkDragDrop, moveItemInArray, } from '@angular/cdk/drag-drop';

@Component({
    selector: 'lib-reordable-list-item',
    templateUrl: './reordable-list.component.html',
    styleUrls: ['./reordable-list.component.scss'],
})
export class ReordableListItemComponent implements OnInit {

    @Input() currencyOptions: Uk2ListItemCurrencyOptions = {
        currencyCode: 'USD',
        display: 'symbol',
        digitsInfo: '1.2-2',
      };

    constructor(private iconRegister:Uk2IconRegistryService) {}

    listItemFirst: Uk2ListItem = {
        headerLabelName: 'First item',
        value: 'firstitem',
    };
    
    listItemSecond: Uk2ListItem = {
        headerLabelName: 'Second Item',
        value: 'seconditem',
    };
    
    listItemThird: Uk2ListItem = {
        headerLabelName: 'Third Item',
        value: 'thirditem',
    };

    menuItemFirst = {
        bodyText: 'First item',
        svgIconName: 'uk2-download',
        value: 'option1',
        isSelected: false,
    };

    menuItemSecond = {
        bodyText: 'Second Item',
        svgIconName: 'uk2-share',
        value: 'option2',
        isSelected: false,
    };

    menuItemThird = {
        bodyText: 'Third Item',
        svgIconName: 'uk2-upload',
        value: 'option3',
        isSelected: false,
    };

    dragIcon!:Uk2Tier1UtilityEnum;
    listItems!:Uk2ListItem[];
    menuListItems!:any[];
    showDragIcon:boolean=true;

    ngOnInit(): void {
        this.iconRegister.registerAllCategories();
        this.listItems= [this.listItemFirst, this.listItemSecond,this.listItemThird];
        this.menuListItems=[this.menuItemFirst,this.menuItemSecond,this.menuItemThird];
        this.dragIcon=Uk2Tier1UtilityEnum.dotGridDrag;
    }

    dropEvent(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.listItems, event.previousIndex, event.currentIndex);
        moveItemInArray(this.menuListItems, event.previousIndex, event.currentIndex);
    }
}
