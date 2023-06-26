export abstract class HashString {
	public abstract hashString: (data: string) => Promise<string>;
}
