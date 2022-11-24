import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Menu from './Menu'
import './index.scss'

const Main = () => {
	return (
		<BrowserRouter>
			<h1>Appli recettes de cuisine</h1>
			<Menu />
		</BrowserRouter>
	)
}

export default Main
