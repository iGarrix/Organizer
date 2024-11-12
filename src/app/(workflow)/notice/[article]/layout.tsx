import type { Metadata } from "next"

export async function generateMetadata(props: { params: { article: string } }): Promise<Metadata> {
	return {
		title: `${props.params.article.toUpperCase()}`,
	}
}

export default function ArticleLayout(props: Readonly<{ children: React.ReactNode }>) {
	return props.children
}
