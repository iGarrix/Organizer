import { CArticlePage } from "./client"

export default function ArticlePage(props: { params: { article: string } }) {
	return <CArticlePage params={props.params} />
}
