/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { LoaderState } from "@/app/types"
import CustomSuspencer from "@/components/suspencers/custom_suspencer"
import { observer } from "mobx-react-lite"
import { usePathname, useRouter } from "next/navigation"
import { ReactNode, useEffect, useState } from "react"
import { useStorage } from "./db.provider"
import { articleService } from "../articles/articles.instance"

const MobxStorageProtector = ({ children }: { children: ReactNode }) => {
	// Should be loading as default
	const [state, setState] = useState(LoaderState.Loading)
	const { workflow, isGotted, loadFromLocalStorage } = useStorage()
	const { load: articleLoad } = articleService
	const pathname = usePathname()
	const { push } = useRouter()

	useEffect(() => {
		if (!isGotted) {
			loadFromLocalStorage()
			articleLoad()
		}
	}, [isGotted])

	useEffect(() => {
		if (!workflow && isGotted) {
			push("/setup")
			setTimeout(() => {
				setState(LoaderState.Setup)
			}, 100)
			return
		}
		setTimeout(() => {
			setState(LoaderState.Initialized)
		}, 100)
		if (pathname === "/setup") {
			push("/")
		}
	}, [workflow, isGotted])

	if (state === LoaderState.Loading) {
		return (
			<div>
				<CustomSuspencer message={`Loading orginizer workflow`} />
			</div>
		)
	}

	return children
}
const protector = observer(MobxStorageProtector)
export { protector as MobxStorageProtector }
