import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VgCoreModule, VgControlsModule, VgOverlayPlayModule, VgBufferingModule } from 'ngx-videogular';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { ChatRoutingModule } from "./chat-routing.module";

import { ChatComponent } from "./chat.component";
import{SearchClientPipe} from "../../back/pipes/chat.pipe"
@NgModule({
    imports: [
        CommonModule,
        ChatRoutingModule,
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,
        PerfectScrollbarModule,
        FormsModule, ReactiveFormsModule 
    ],
    declarations: [
        ChatComponent,
        SearchClientPipe
    ]
})
export class ChatModule { }
