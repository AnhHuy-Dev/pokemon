import axios from "axios";
import { useState } from "react";
import { Pokemon, PokemonDetail } from "./interface";
import "./pokemon.css";

type PokemonCollectionProps = {
	poke: Pokemon[];
	show: boolean;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const PokemonCollection = ({ poke, show, setShow }: PokemonCollectionProps) => {
	// const [showDetail, setShowDetails] = useState<boolean>(false);
	const [abilities, setAbilities] = useState<string[]>([]);
	const [pokemon, setPokemon] = useState<Pokemon>();
	const handleSelect = async (name: string) => {
		setAbilities([]);
		const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
		res.data.abilities.forEach(async (item: PokemonDetail) => {
			setAbilities((prev) => [...prev, item.ability.name]);
		});
		// setShowDetails(true);
		setPokemon(res.data);
		setShow(true);
	};
	return (
		<div className="collection-container">
			{show ? (
				<section className="pokemon-list-detailed">
					<div className="detail-container">
						<p className="detail-close" onClick={() => setShow(false)}>
							X
						</p>
						<div className="detail-info">
							<img src={pokemon?.sprites.front_default} alt="pokemon" className="detail-img" />
							<p className="detail-name">{pokemon?.name}</p>
						</div>
						<div className="detail-skill">
							<p className="detail-ability"> Ablities:</p>
							{abilities.map((item, index) => (
								<div key={index}>{item}</div>
							))}
						</div>
					</div>
				</section>
			) : (
				poke.map((item) => {
					return (
						<section key={item.id} className="pokemon-list-container" onClick={() => handleSelect(item.name)}>
							<p className="pokemon-name">{item.name}</p>
							<img src={item.sprites.front_default} alt="pokemon" />
						</section>
					);
				})
			)}
		</div>
	);
};

export default PokemonCollection;
