import {Component, Input, forwardRef, Output, EventEmitter, OnDestroy, OnInit} from "@angular/core";
import {FormGroup, FormBuilder, FormArray, ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl} from "@angular/forms";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

import {DropdownChangeEvent} from "primeng/dropdown";

import {OperatorType, Operator, Predicate} from "@appModel/predicate";

@Component({
	selector: "operand",
	templateUrl: "./operand.component.html",
	styleUrls: ["./operand.component.css"],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => OperandComponent),
			multi: true
		}
	]
})
export class OperandComponent implements ControlValueAccessor, OnDestroy, OnInit {

	@Output()
	remove: EventEmitter<void> = new EventEmitter<void>();

	_form: FormGroup;

	operators: Operator[] = Operator.operators;

	protected readonly OperatorType = OperatorType;

	private _onChange: (
		value: Predicate | null | undefined
	) => void;

	private _destroy$: Subject<void> = new Subject<void>();

	constructor(private _fb: FormBuilder) {
		this._form = this._fb.group({});
		this._onChange = function (value: Predicate | null | undefined) {
		};
	}

	get format(): string {
		var val = this._form.value;
		if (!val) {
			return 'null';
		} else if (val.operator === Operator.NONE) {
			return 'none';
		} else if (val.operator === Operator.VALUE) {
			return val.value;
		} else {
			return val.operator.name;
		}
	}

	ngOnInit() {
		this._createFormGroup();

		this._setupObservables();
	}

	ngOnDestroy() {
		if (this._destroy$ && !this._destroy$.closed) {
			this._destroy$.next();
			this._destroy$.complete();
		}
	}

	writeValue(value: Predicate | null | undefined): void {
		if (!value) {
			return;
		}

		this._form.patchValue(value);
	}

	operatorChange(event: DropdownChangeEvent): void {
		if (!event.value) {
			return;
		}

		var val = this._form.value;
		const operType = event.value.type;
		if (operType === OperatorType.NONE) {
			val.value = null;
			val.left = null;
			val.right = null;
		} else if (operType === OperatorType.VALUE) {
			val.left = null;
			val.right = null;
		} else if (operType === OperatorType.PREFIX) {
			val.value = null;
			val.left = null;
		} else if (operType === OperatorType.POSTFIX) {
			val.value = null;
			val.left = null;
		} else { //INFIX
			val.value = null;
		}

		this._form.patchValue(val);
	}

	registerOnChange(
		fn: (value: Predicate | null | undefined) => void
	): void {
		this._onChange = fn;
	}

	registerOnTouched(fn: any): void {
		// TODO: implement this method
		// throw new Error('registerOnTouched not implemented');
	}

	setDisabledState(isDisabled: boolean): void {
		// TODO: implement this method
		// throw new Error('setDisabledState not implemented');
	}

	get _operatorType() {
		return (this._form.get("operator")?.value as Operator).type;
	}

	private _createFormGroup() {
		this._form = this._fb.group({
			operator: Operator.NONE,
			value: undefined,
			left: undefined,
			right: undefined,
		});
	}

	private _setupObservables() {
		this._form.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(value => {
			if (this._onChange) {
				this._onChange(value);
			}
		});
	}

	get expression() {
		return this.expr(this._form.value);
	}

	private expr(predicate: Predicate | undefined): string {
		if (!predicate) {
			return 'none';
		} else if (!predicate.operator) {
			return '???';
		}

		const operType = predicate.operator.type;
		if (operType === OperatorType.NONE) {
			return 'none';
		} else if (operType === OperatorType.VALUE) {
			return !predicate.value ? '???' : typeof (predicate.value) === 'number' ? predicate.value.toString() : predicate.value;
		} else if (operType === OperatorType.PREFIX) {
			return predicate.operator.name + this.expr(predicate.right);
		} else if (operType === OperatorType.POSTFIX) {
			return this.expr(predicate.left) + predicate.operator.name;
		} else { //INFIX
			return '(' + this.expr(predicate.left) + ' ' + predicate.operator.name + ' ' + this.expr(predicate.right) + ')';
		}
	}
}
