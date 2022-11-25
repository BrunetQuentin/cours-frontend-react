import axios from 'axios'
import { useEffect, useState } from 'react'
import './index.scss'

type FilterPropsType = {
	onFilterChange: (filter?: any) => void
}

const Filter: React.FC<FilterPropsType> = ({ onFilterChange }) => {
	const [filter, setFilter] = useState<any>({
		s: '', // name
		i: '', // ingredient
		c: '', // category
		a: '', // area
	})

	const [allOptions, setAllOptions] = useState<any>({
		c: [],
		a: [],
		i: [],
	})

	useEffect(() => {
		Object.keys(allOptions).forEach((key) => {
			axios({
				method: 'get',
				url: 'https://www.themealdb.com/api/json/v1/1/list.php?' + key + '=list',
			}).then((response: any) => {
				setAllOptions((old: any) => {
					if (response.data.meals) old[key] = response.data.meals
					return { ...old }
				})
			})
		})
	}, [])

	const handleChange = (key: string, value: string) => {
		setFilter((old: any) => {
			return {
				...old,
				[key]: value,
			}
		})
	}

	useEffect(() => {
		onFilterChange(filter)
	}, [filter])

	console.log(allOptions)

	return (
		<div className="filter">
			<input type="text" placeholder="Nom de la recette" onChange={(e) => handleChange('s', e.target.value)} />
			<select onChange={(e) => handleChange('c', e.target.value)}>
				<option value="">Catégorie</option>
				{allOptions.c.map((option: any) => {
					return <option value={option.strCategory}>{option.strCategory}</option>
				})}
			</select>
			<select onChange={(e) => handleChange('a', e.target.value)}>
				<option value="">Pays</option>
				{allOptions.a.map((option: any) => {
					return <option value={option.strArea}>{option.strArea}</option>
				})}
			</select>
			<select onChange={(e) => handleChange('i', e.target.value)}>
				<option value="">Ingrédient</option>
				{allOptions.i.map((option: any) => {
					return <option value={option.strIngredient}>{option.strIngredient}</option>
				})}
			</select>
		</div>
	)
}

export default Filter
