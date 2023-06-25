export abstract class HashString {
	public abstract hashString: (data: string, salt?: string) => Promise<string>;
}
