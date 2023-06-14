import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Pokemon } from "./interface";
import PokemonCollection from "./PokemonCollection";

interface Pokemons {
	name: string;
	url: string;
}

const App: React.FC = () => {
	const [pokemons, setPokemons] = useState<Pokemon[]>([]);
	const [nextUrl, setNextUrl] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);
	const [showDetail, setShowDetail] = useState<boolean>(false);

	useEffect(() => {
		const getPokemons = async () => {
			const res = await axios.get("https://pokeapi.co/api/v2/pokemon");
			setNextUrl(res.data.next);
			// console.log(res.data.results);
			res.data.results.forEach(async (pokemon: Pokemons) => {
				const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);

				setPokemons((prev) => [...prev, poke.data]);
				setLoading(false);
			});
		};

		getPokemons();
	}, []);

	const nextPage = async () => {
		const res = await axios.get(nextUrl);
		setNextUrl(res.data.next);

		res.data.results.forEach(async (pokemon: Pokemons) => {
			const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);

			setPokemons((prev) => [...prev, poke.data]);
			setLoading(false);
		});
	};
	return (
		<div className="container">
			<header className="pokemon-header">Pokemon</header>
			<PokemonCollection poke={pokemons} show={showDetail} setShow={setShowDetail} />
			{!showDetail && (
				<div className="btn">
					<button onClick={nextPage}>{loading ? "Loading..." : "Load more"} </button>
				</div>
			)}
		</div>
	);
};

export default App;
