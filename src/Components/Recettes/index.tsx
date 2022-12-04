import axios from 'axios'
import { useEffect, useState } from 'react'
import { keysIndexToList } from '../../Util'
import Recette, { RecetteType } from './Recette'
import './index.scss'
import Filter from './Filter'
import { Route, Routes, useLocation } from 'react-router-dom'
import RecetteDetail from '../RecetteDetail'
import { Button, Modal } from 'react-bootstrap'

type RecettesPropsType = {}

const Recettes: React.FC<RecettesPropsType> = () => {
	const [recettes, setRecettes] = useState<RecetteType[]>([])

	const [filter, setFilter] = useState<any>({})

	let { pathname } = useLocation()

	const [idMealClicked, setIdMealClicked] = useState<string | null>(null)

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

	return (
		<>
			<Filter onFilterChange={(filter) => setFilter(filter)} />
			<p>
				<i>Un filtre a la fois</i>
			</p>
			<div className="recettes">
				{recettes.map((recette: RecetteType) => {
					return <Recette recette={recette} key={recette.idMeal} onReceteClick={(id) => setIdMealClicked(id)} />
				})}
			</div>

			<Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={idMealClicked !== null} onHide={() => setIdMealClicked(null)}>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">Detail de la recette</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<RecetteDetail idMeal={idMealClicked!} />
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={() => setIdMealClicked(null)}>Fermer</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default Recettes
