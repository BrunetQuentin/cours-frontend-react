import { faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useLocation } from 'react-router-dom'
import './index.scss'

export type RecetteType = {
	dateModified: boolean
	idMeal: string
	strArea: string
	strCategory: string
	strCreativeCommonsConfirmed: string
	strDrinkAlternate: string
	strImageSource: string
	strIngredients: string[]
	strInstructions: string
	strMeal: string
	strMealThumb: string
	strMeasures: string[]
	strSource: string
	strTags: string
	strYoutube: string
}

type RecettePropsType = {
	recette: RecetteType
	onReceteClick?: (id: string) => void
}

const Recette: React.FC<RecettePropsType> = ({ recette, onReceteClick }) => {
	let { pathname } = useLocation()

	return (
		<div className="recette-widget" onClick={() => onReceteClick && onReceteClick(recette.idMeal)}>
			<div className="image">
				<img src={recette.strMealThumb} alt={recette.strMeal} />
				<p className="recette-cat">{recette.strCategory}</p>
				<a className="link" href={recette.strSource}>
					<FontAwesomeIcon icon={faLink} />
				</a>
			</div>
			<h3>{recette.strMeal}</h3>
		</div>
	)
}

export default Recette
