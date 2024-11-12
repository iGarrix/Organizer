import { CBackupPage } from "./clientside"

export default function BackupPage(props: { searchParams: { [key: string]: string | null } }) {
	return <CBackupPage searchParams={props.searchParams} />
}
