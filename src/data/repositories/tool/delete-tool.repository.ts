export abstract class DeleteToolRepository {
	public abstract delete: (id: string) => Promise<void>;
}
