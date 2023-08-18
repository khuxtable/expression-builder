import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {PanelModule} from 'primeng/panel';

import {AppComponent} from '@app/app.component';
import {OperandComponent} from '@app/operand/operand.component';

@NgModule({
	imports: [
		BrowserAnimationsModule,
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		ButtonModule,
		DropdownModule,
		InputTextModule,
		PanelModule
	],
	declarations: [
		AppComponent,
		OperandComponent
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
}
