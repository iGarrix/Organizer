/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { LoaderState } from "@/app/types"
import CustomSuspencer from "@/components/suspencers/custom_suspencer"
import { observer } from "mobx-react-lite"
import { ReactNode, useEffect, useState } from "react"
import { useStorage } from "./db.provider"
import { articleService } from "../articles/articles.instance"
import { notificationService } from "../notifications/notification.instance"

const MobxStorageProtector = ({ children }: { children: ReactNode }) => {
	const [state, setState] = useState(LoaderState.Loading)
	const { loadFromLocalStorage } = useStorage()
	const { load: articleLoad } = articleService
	const { load: notificationLoad } = notificationService

	useEffect(() => {
		if (state === LoaderState.Loading) {
			const success = loadFromLocalStorage()
			articleLoad()
			notificationLoad()
			if (success) {
				setState(LoaderState.Initialized)
				return
			}
			setState(LoaderState.InitExecuted)
		}
	}, [])

	if (state === LoaderState.Loading) {
		return (
			<>
				<CustomSuspencer message={`Loading orginizer workflow`} />
			</>
		)
	}
	return children
}
const protector = observer(MobxStorageProtector)
export { protector as MobxStorageProtector }
