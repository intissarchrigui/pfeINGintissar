import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VgCoreModule, VgControlsModule, VgOverlayPlayModule, VgBufferingModule } from 'ngx-videogular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { ChatRoutingModule } from "./chat-routing.module";

import { ChatComponent } from "./chat.component";

@NgModule({
    imports: [
        CommonModule,
        ChatRoutingModule,
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,
        PerfectScrollbarModule,
        FormsModule, ReactiveFormsModule,
        NgbModule
    ],
    declarations: [
        ChatComponent
    ]
})
export class ChatModule { }
