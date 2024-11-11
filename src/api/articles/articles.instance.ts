import { makeAutoObservable } from "mobx"
import { LocalStorageContants } from "@/app/types"
import { IArticle } from "./articles.types"

class ArticleService {
	articles: IArticle[] = []
	article_drafts: IArticle[] = []
	constructor() {
		makeAutoObservable(this)
	}

	load = () => {
		if (typeof window !== "undefined") {
			const _articles = localStorage.getItem(LocalStorageContants.Articles)
			if (_articles) {
				this.articles = JSON.parse(_articles) as IArticle[]
			}
			const _artc_drafts = localStorage.getItem(LocalStorageContants.ArticleDraft)
			if (_artc_drafts) {
				this.article_drafts = JSON.parse(_artc_drafts) as IArticle[]
			}
		}
	}

	clearAll = () => {
		if (typeof window !== "undefined") {
			localStorage.removeItem(LocalStorageContants.Articles)
			localStorage.removeItem(LocalStorageContants.ArticleDraft)
			this.article_drafts = []
			this.articles = []
		}
	}

	createArticle = (article: IArticle, workflowId: string) => {
		if (typeof window !== "undefined") {
			const tasksJson = localStorage.getItem(LocalStorageContants.Articles)
			if (tasksJson) {
				article.id = `${workflowId}-A-${this.articles.length + 1}`
				const tasks = JSON.parse(tasksJson) as IArticle[]
				const updated = [...tasks, article]
				localStorage.setItem(LocalStorageContants.Articles, JSON.stringify(updated))
				this.articles = updated
				return
			}
			article.id = `${workflowId}-A-1`
			const newArticleList = JSON.stringify([article] as IArticle[])
			localStorage.setItem(LocalStorageContants.Articles, newArticleList)
			this.articles = [article]
		}
	}

	createDraft = (draft: IArticle) => {
		if (typeof window !== "undefined") {
			const tasksJson = localStorage.getItem(LocalStorageContants.ArticleDraft)
			if (tasksJson) {
				draft.id = `draft-${this.article_drafts.length + 1}`
				const _articles = JSON.parse(tasksJson) as IArticle[]
				const updated = [..._articles, draft]
				localStorage.setItem(LocalStorageContants.ArticleDraft, JSON.stringify(updated))
				this.article_drafts = updated
				return
			}
			draft.id = `draft-1`
			const newArticleList = JSON.stringify([draft] as IArticle[])
			localStorage.setItem(LocalStorageContants.ArticleDraft, newArticleList)
			this.article_drafts = [draft]
		}
	}

	clearDrafts = () => {
		this.article_drafts = []
		localStorage.removeItem(LocalStorageContants.ArticleDraft)
	}

	editArticle = (article: IArticle) => {
		if (typeof window !== "undefined") {
			const articlesJson = localStorage.getItem(LocalStorageContants.Articles)
			if (articlesJson) {
				const _articles = JSON.parse(articlesJson) as IArticle[]
				const findArticleId = _articles.findIndex(
					f => f.id?.toUpperCase() === article.id?.toUpperCase()
				)
				if (_articles[findArticleId]) {
					article.modifiedAt = new Date()
					_articles[findArticleId] = article
					localStorage.setItem(LocalStorageContants.Articles, JSON.stringify(_articles))
					this.articles = _articles
					return
				}
				throw "Article not found"
			}
			throw "Article not found"
		}
	}

	deleteArticle = (articleId: string) => {
		if (typeof window !== "undefined") {
			const tasksJson = localStorage.getItem(LocalStorageContants.Tasks)
			if (tasksJson && tasksJson.length !== 0) {
				const _articles = JSON.parse(tasksJson) as IArticle[]
				const filteredArticles = _articles.filter((f, i) => f.id !== articleId)
				if (filteredArticles.length === 0) {
					localStorage.removeItem(LocalStorageContants.Articles)
					this.articles = []
					return
				}
				if (filteredArticles) {
					localStorage.setItem(LocalStorageContants.Articles, JSON.stringify(filteredArticles))
					this.articles = filteredArticles
					return
				}
				throw "Article not found"
			}
			throw "Articles not found"
		}
	}
}

export const articleService = new ArticleService()
