type NonFunctionPropertyNames<T> = {
	// eslint-disable-next-line @typescript-eslint/ban-types
	[K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type ExcludeMethods<T> = Pick<T, NonFunctionPropertyNames<T>>;

export type GetProps<T> = Omit<
	ExcludeMethods<T>,
	'id' | 'createdAt' | 'updatedAt'
> & {
	id?: string;
	createdAt?: Date;
	updatedAt?: Date;
};
