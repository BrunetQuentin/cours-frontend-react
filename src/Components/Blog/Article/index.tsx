import { useRef, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './index.scss'

export type ArticleType = {
	author: string
	content: string
	date: number
	id: number
}

type ArticlePropsType = {
	article: ArticleType
	onDelete?: (id: number) => void
	onModify?: (value: string) => void
}

const Article: React.FC<ArticlePropsType> = ({ article, onDelete, onModify }) => {
	const [localArticle, setLocalArticle] = useState<ArticleType>(article)

	const [modifingArticle, setModifingArticle] = useState<ArticleType>(article)

	const [date] = useState(new Date(article.date))

	const [modify, setModify] = useState<boolean>(false)

	const handleModify = (e: any) => {
		e.preventDefault()
		onModify && onModify(e.target.value)
		setModify(false)
		setLocalArticle(modifingArticle)
	}

	const cancelModify = (e: any) => {
		setModify(false)
		setModifingArticle(localArticle)
	}

	const handleChange = (e: any, key: string) => {
		console.log(key, e.target.value)

		setModifingArticle({ ...modifingArticle, [key]: e.target.value })
	}

	return (
		<Container className="article">
			<div className="header">
				{modify ? (
					<p key="modify" className="title" contentEditable onChange={(e) => handleChange(e, 'author')}>
						{modifingArticle.author}
					</p>
				) : (
					<p key="notModify" className="title">
						{localArticle.author}
					</p>
				)}
				<p className="date">Posté le {date.getDay() + date.getMonth()}</p>
			</div>
			{modify ? (
				<p key="modify" className="content" contentEditable onChange={(e) => handleChange(e, 'content')}>
					{modifingArticle.content}
				</p>
			) : (
				<p key="notModify" className="content">
					{localArticle.content}
				</p>
			)}
			<button onClick={() => onDelete && onDelete(localArticle.id)}>Supprimer</button>
			{modify ? <button onClick={handleModify}>Valider</button> : <button onClick={() => setModify(true)}>Modifier</button>}
			{modify && <button onClick={cancelModify}>Annuler</button>}
		</Container>
	)
}

export default Article
