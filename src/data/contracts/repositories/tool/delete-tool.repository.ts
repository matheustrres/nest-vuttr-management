export namespace DeleteToolRepository {
	export type Input = {
		id: string;
		userId: string;
	};
	export type Output = void;
}

export abstract class DeleteToolRepository {
	public abstract delete: (
		input: DeleteToolRepository.Input,
	) => Promise<DeleteToolRepository.Output>;
}
