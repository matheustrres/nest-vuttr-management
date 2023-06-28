export type DeleteToolRepositoryInput = {
	id: string;
	userId: string;
};

export abstract class DeleteToolRepository {
	public abstract delete: (input: DeleteToolRepositoryInput) => Promise<void>;
}
