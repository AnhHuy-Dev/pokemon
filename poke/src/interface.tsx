export interface Pokemon {
	id: number;
	name: string;
	sprites: {
		front_default: string;
	};
}

export interface PokemonDetail extends Pokemon {
	ability: {
		name: string;
	};
}
