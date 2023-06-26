type CompareStringsInput = {
	plainText: string;
	hash: string;
};

export abstract class CompareStrings {
	public abstract compareStrings: (
		input: CompareStringsInput,
	) => Promise<boolean>;
}
