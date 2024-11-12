import { CTaskDetailsPage } from "./client"

export default function TaskDetailsPage(props: { params: { taskId: string } }) {
	return <CTaskDetailsPage params={props.params} />
}
