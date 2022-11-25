import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useHref, useLocation, useNavigate, useNavigation, useParams } from 'react-router-dom'
import { keysIndexToList } from '../../Util'
import { RecetteType } from '../Recettes/Recette'
import './index.scss'

const RecetteDetail: React.FC = () => {
	let { pathname } = useLocation()

	let { id } = useParams()

	const navigate = useNavigate()

	const [recette, setRecette] = useState<RecetteType | null>()

	useEffect(() => {
		axios({
			method: 'get',
			url: 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id,
		}).then((response: any) => {
			const object = response.data.meals[0]

			object['strIngredients'] = keysIndexToList(object, 'strIngredient')
			object['strMeasures'] = keysIndexToList(object, 'strMeasure')

			setRecette(object)
		})
	}, [])

	if (!recette) return <div>Chargement...</div>

	return (
		<div className="recette-detail">
			<FontAwesomeIcon icon={faArrowLeft} onClick={() => navigate(-1)} />
			<h2>{recette.strMeal}</h2>
			<img src={recette.strMealThumb} alt={recette.strMeal} />
			<section>
				<div>
					<p>{recette.strInstructions}</p>
					{recette.strYoutube && <iframe src={recette.strYoutube.replace('watch?v=', 'embed/')}></iframe>}
				</div>
				<ul>
					{recette.strIngredients.map((ingredient: string, index: number) => {
						return (
							<li key={index}>
								<img src={'https://www.themealdb.com/images/ingredients/' + ingredient + '.png'} alt={ingredient} />
								<p>
									{ingredient} - {recette.strMeasures[index]}
								</p>
							</li>
						)
					})}
				</ul>
			</section>
		</div>
	)
}

export default RecetteDetail
