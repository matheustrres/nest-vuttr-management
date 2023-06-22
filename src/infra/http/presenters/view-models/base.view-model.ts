export interface BaseViewModel<TModel, TResponse> {
	toHTTP: (model: TModel) => TResponse;
	mapArrayToHTTP: (models: TModel[]) => TResponse[];
}
