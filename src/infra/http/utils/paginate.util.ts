type Paginate = {
	skip: number;
	take: number;
};

type PaginationOptions = {
	skip?: number;
	take?: number;
};

export const paginate = (opts: PaginationOptions): Paginate => {
	let { skip, take } = opts;

	if (!skip) skip = 0;

	if (!take || (take && take >= 10)) {
		take = 10;
	}

	return {
		skip,
		take,
	};
};
