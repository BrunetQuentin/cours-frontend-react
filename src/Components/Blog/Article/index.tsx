import { faBan, faCheck, faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormEvent, useRef, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { LENGTHOFMESSAGE } from '..'
import { verifyArticle } from '../../../Util'
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
	onModify?: (value: ArticleType) => void
}

const Article: React.FC<ArticlePropsType> = ({ article, onDelete, onModify }) => {
	const [localArticle, setLocalArticle] = useState<ArticleType>(article)

	const [modifingArticle, setModifingArticle] = useState<ArticleType>(article)

	const [date] = useState(new Date(article.date))

	const [modify, setModify] = useState<boolean>(false)

	const handleModify = (e: any) => {
		if (verifyArticle(modifingArticle)) {
			e.preventDefault()
			onModify && onModify(modifingArticle)
			setModify(false)
			setLocalArticle(modifingArticle)
		}
	}

	const cancelModify = (e: any) => {
		setModify(false)
		setModifingArticle(localArticle)
	}

	const handleChange = (e: FormEvent<HTMLParagraphElement>, key: string) => {
		setModifingArticle({ ...modifingArticle, [key]: e.currentTarget.outerText })
	}

	return (
		<Container className="article">
			<div className="header">
				{modify ? (
					<p key="modify" className="title editable" contentEditable onInput={(e) => handleChange(e, 'author')} suppressContentEditableWarning>
						{localArticle.author}
					</p>
				) : (
					<p key="notModify" className="title">
						{localArticle.author}
					</p>
				)}
				<p className="date">Posté le {date.getDay() + date.getMonth()}</p>
			</div>
			{modify ? (
				<p key="modify" className="content editable" contentEditable onInput={(e) => handleChange(e, 'content')} suppressContentEditableWarning>
					{localArticle.content}
				</p>
			) : (
				<p key="notModify" className="content">
					{localArticle.content}
				</p>
			)}
			<FontAwesomeIcon icon={faXmark} onClick={() => onDelete && onDelete(localArticle.id)} className="delete svg-button" title="Supprimer" />
			{modify ? (
				<FontAwesomeIcon icon={faCheck} title="Modifier" onClick={handleModify} className="acceptEdit svg-button" />
			) : (
				<FontAwesomeIcon icon={faPenToSquare} title="Modifier" onClick={() => setModify(true)} className="edit svg-button" />
			)}
			{modify && <FontAwesomeIcon icon={faBan} onClick={cancelModify} title="Annuler" className="cancelEdit svg-button" />}
		</Container>
	)
}

export default Article
