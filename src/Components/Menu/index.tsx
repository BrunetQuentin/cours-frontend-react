import './index.scss'
import { Routes, Route, NavLink, Navigate } from 'react-router-dom'
import Blog from '../Blog'
import Recettes from '../Recettes'
import Nav from 'react-bootstrap/Nav'
import RecetteDetail from '../RecetteDetail'

type MenuPropsType = {}

const Menu: React.FC<MenuPropsType> = ({}) => {
	return (
		<>
			<Nav variant="tabs" fill defaultActiveKey="/recettes" className="menu">
				<Nav.Item>
					<Nav.Link eventKey="recettes" as={NavLink} to={'/recettes'}>
						Recettes
					</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey="blog" as={NavLink} to={'/blog'}>
						Blog
					</Nav.Link>
				</Nav.Item>
			</Nav>
			<main>
				<Routes>
					<Route path="/recettes" element={<Recettes />} />
					<Route path="/blog" element={<Blog />} />
					<Route path="/" element={<Navigate to={'/recettes'} />} />
				</Routes>
			</main>
		</>
	)
}

export default Menu
