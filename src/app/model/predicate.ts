export enum OperatorType {
	INFIX,
	PREFIX,
	POSTFIX,
	VALUE,
	NONE
}

export class Operator {
	name: string;
	type: OperatorType;

	constructor(name: string, type: OperatorType) {
		this.name = name;
		this.type = type;
	}

	public static readonly AND: Operator = {name: '&&', type: OperatorType.INFIX};
	public static readonly OR: Operator = {name: '||', type: OperatorType.INFIX};
	public static readonly EQUALS: Operator = {name: '=', type: OperatorType.INFIX};
	public static readonly NOT_EQUALS: Operator = {name: '!=', type: OperatorType.INFIX};
	public static readonly LESS_THAN: Operator = {name: '<', type: OperatorType.INFIX};
	public static readonly LESS_THAN_OR_EQUAL_TO: Operator = {name: '<=', type: OperatorType.INFIX};
	public static readonly GREATER_THAN: Operator = {name: '>', type: OperatorType.INFIX};
	public static readonly GREATER_THAN_OR_EQUAL_TO: Operator = {name: '>=', type: OperatorType.INFIX};
	public static readonly PLUS: Operator = {name: '+', type: OperatorType.INFIX};
	public static readonly MINUS: Operator = {name: '-', type: OperatorType.INFIX};
	public static readonly TIMES: Operator = {name: '*', type: OperatorType.INFIX};
	public static readonly DIVIDE: Operator = {name: '/', type: OperatorType.INFIX};
	public static readonly NOT: Operator = {name: '!', type: OperatorType.PREFIX};
	public static readonly VALUE: Operator = {name: 'value', type: OperatorType.VALUE};
	public static readonly NONE: Operator = {name: 'none', type: OperatorType.NONE};

	public static readonly operators = [
		Operator.NONE,
		Operator.VALUE,
		Operator.NOT,
		Operator.AND,
		Operator.OR,
		Operator.EQUALS,
		Operator.NOT_EQUALS,
		Operator.LESS_THAN,
		Operator.LESS_THAN_OR_EQUAL_TO,
		Operator.GREATER_THAN,
		Operator.GREATER_THAN_OR_EQUAL_TO,
		Operator.PLUS,
		Operator.MINUS,
		Operator.TIMES,
		Operator.DIVIDE,
	];
}

export class Predicate {

	operator: Operator;

	value?: number | string;

	left?: Predicate;
	right?: Predicate;

	constructor(operator: Operator) {
		this.operator = operator;
	}
}
