import { CWorkflow } from "./clienttasks"

export default function Home(props: { searchParams: { [key: string]: string | null } }) {
	return <CWorkflow searchParams={props.searchParams} />
}
