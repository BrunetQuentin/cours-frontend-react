import './index.scss'
import { Routes, Route, NavLink } from 'react-router-dom'
import Blog from '../Blog'
import Recettes from '../Recettes'
import Nav from 'react-bootstrap/Nav'

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
					<Route path="/recettes" element={<Recettes />}></Route>
					<Route path="/blog" element={<Blog />}></Route>
				</Routes>
			</main>
		</>
	)
}

export default Menu
