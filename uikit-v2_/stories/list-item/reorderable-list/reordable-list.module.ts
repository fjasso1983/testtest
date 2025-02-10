import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReordableListItemComponent } from './reorderable-list.component';
import { DragDropModule  } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StoriesCommonModule } from 'stories/stories-common.module';
import { 
    Uk2IconRegistryService,
    Uk2ServicesModule,
    Uk2MenuListItemModule,
    Uk2ListItemModule
} from '@axos/uikit-v2-lib';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations:[ReordableListItemComponent],
    imports:[
        CommonModule,
        StoriesCommonModule,
        Uk2ListItemModule,
        DragDropModule,
        MatIconModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        Uk2ServicesModule,
        HttpClientModule,
        Uk2MenuListItemModule,
    ],
    exports:[
        StoriesCommonModule,
        Uk2ListItemModule,
        DragDropModule,
        ReordableListItemComponent,
        MatIconModule,
        MatCheckboxModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
    ],
    providers:[
        Uk2IconRegistryService
    ]
})

export class ReordableListModule {}