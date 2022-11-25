import axios from 'axios'
import { useEffect, useState } from 'react'
import { keysIndexToList } from '../../Util'
import Recette, { RecetteType } from './Recette'
import './index.scss'
import Filter from './Filter'
import { Route, Routes, useHref, useLocation, useMatch, useMatches, useNavigate, useRoutes } from 'react-router-dom'
import RecetteDetail from '../RecetteDetail'

type RecettesPropsType = {}

const Recettes: React.FC<RecettesPropsType> = () => {
	const [recettes, setRecettes] = useState<RecetteType[]>([])

	const [filter, setFilter] = useState<any>({})

	let { pathname } = useLocation()

	useEffect(() => {
		let url
		// différente url en fonction du filtre
		if (filter && filter['s'] && filter['s'] !== '') {
			url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + filter.s
		} else {
			// construction du filter
			let strFilter = ''
			Object.keys(filter).forEach((key: any) => {
				if (filter[key] !== '') strFilter += '&' + key + '=' + filter[key]
			})
			strFilter = strFilter === '' ? '&i=' : strFilter
			url = 'https://www.themealdb.com/api/json/v1/1/filter.php?' + strFilter
		}

		axios({
			method: 'get',
			url: url,
		}).then((response: any) => {
			const object = response.data.meals

			object.forEach((meal: any) => {
				meal['strIngredients'] = keysIndexToList(meal, 'strIngredient')
				meal['strMeasures'] = keysIndexToList(meal, 'strMeasure')
			})
			setRecettes(object)
		})
	}, [filter])

	console.log(pathname)

	return (
		<Routes>
			<Route path="recettes/:id" element={<RecetteDetail />} />
			<Route
				path="/"
				element={
					<>
						<Filter onFilterChange={(filter) => setFilter(filter)} />
						<p>
							<i>Un filtre a la fois</i>
						</p>
						<div className="recettes">
							{recettes.map((recette: RecetteType) => {
								return <Recette recette={recette} key={recette.idMeal} />
							})}
						</div>
					</>
				}
			/>
		</Routes>
	)
}

export default Recettes
