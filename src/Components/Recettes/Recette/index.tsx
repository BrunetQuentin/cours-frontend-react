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
}

const Recette: React.FC<RecettePropsType> = ({ recette }) => {
	let { pathname } = useLocation()

	return (
		<Link to={pathname + '/' + recette.idMeal} className="link-recette">
			<div className="recette-widget">
				<div className="image">
					<img src={recette.strMealThumb} alt={recette.strMeal} />
					<p className="recette-cat">{recette.strCategory}</p>
					<a className="link" href={recette.strSource}>
						<FontAwesomeIcon icon={faLink} />
					</a>
				</div>
				<h3>{recette.strMeal}</h3>
			</div>
		</Link>
	)
}

export default Recette
