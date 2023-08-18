import {Component, VERSION} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, FormArray} from "@angular/forms";

import {OperatorType, Operator, Predicate} from "@appModel/predicate";

@Component({
	selector: "my-app",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"]
})
export class AppComponent {
	_form: FormGroup;

	constructor(private fb: FormBuilder) {
		this._form = this._createForm();
	}

	get _predicateControl(): FormControl {
		return this._form.get("predicate") as FormControl;
	}

	private _createForm(): FormGroup {
		return this.fb.group({
			predicate: new Predicate(Operator.NONE)
		});
	}
}
