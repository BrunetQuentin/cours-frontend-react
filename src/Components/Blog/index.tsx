import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Container, ProgressBar, Row } from 'react-bootstrap'
import { verifyArticle } from '../../Util'
import Article, { ArticleType } from './Article'
import './index.scss'

type BlogPropsType = {}

export const LENGTHOFMESSAGE = 140

const Blog: React.FC<BlogPropsType> = () => {
	const [articles, setArticles] = useState<ArticleType[]>([])

	const [newArticle, setNewArticle] = useState<ArticleType>({
		author: '',
		content: '',
		date: Date.now(),
		id: Date.now(),
	})

	useEffect(() => {
		let url = 'http://localhost:3003/articles'
		axios({
			method: 'get',
			url: url,
		}).then((response: any) => {
			setArticles(response.data)
		})
	}, [])

	const handleModify = (value: string, key: string) => {
		setNewArticle({ ...newArticle, [key]: value })
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (verifyArticle(newArticle)) {
			let url = 'http://localhost:3003/articles'
			axios({
				method: 'POST',
				url: url,
				data: newArticle,
			})
			setArticles((old) => [...old, newArticle])
		}

		setNewArticle({
			author: '',
			content: '',
			date: Date.now(),
			id: Date.now(),
		})
	}

	const handleDelete = (id: number) => {
		let url = 'http://localhost:3003/articles/' + id
		axios({
			method: 'DELETE',
			url: url,
		})

		setArticles((old) => old.filter((article) => article.id !== id))
	}

	const handleModifyArticle = (value: ArticleType) => {
		let url = 'http://localhost:3003/articles/' + value.id
		axios({
			method: 'PUT',
			url: url,
			data: value,
		})

		setArticles((old) => old.map((article) => (article.id === value.id ? value : article)))
	}

	return (
		<Container className="blog">
			<h2>Blog</h2>
			<form onSubmit={handleSubmit}>
				<input placeholder="Nom" onChange={(e) => handleModify(e.target.value, 'author')} />
				<textarea rows={8} placeholder="Message" onChange={(e) => handleModify(e.target.value, 'content')} />
				<ProgressBar
					now={newArticle.content.length}
					max={LENGTHOFMESSAGE}
					className={newArticle.content.length >= LENGTHOFMESSAGE ? 'completed' : ''}
					label={newArticle.content.length}
				/>
				<p className="warning" style={{ display: newArticle.content.length >= LENGTHOFMESSAGE ? 'none' : 'block' }}>
					Veuillez écrire in minimum de {LENGTHOFMESSAGE} caractères
				</p>
				<button type="submit">Publier</button>
			</form>
			<Container>
				{articles.map((article: ArticleType) => {
					return (
						<Row key={article.id}>
							<Col>
								<Article article={article} onDelete={handleDelete} onModify={handleModifyArticle} />
							</Col>
						</Row>
					)
				})}
			</Container>
		</Container>
	)
}

export default Blog
