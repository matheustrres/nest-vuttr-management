export interface DeleteToolRepository {
	delete: (id: string) => Promise<void>;
}
