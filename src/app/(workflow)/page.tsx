"use client"

import { notificationService } from "@/api/notifications/notification.instance"
import { NotificationType } from "@/api/notifications/notifications.types"
import { useStorage } from "@/api/storage/db.provider"
import { ITask } from "@/api/storage/db.types"
import TaskCard from "@/components/common/cards/taskcard/taskcard.component"
import { Link } from "@/components/common/link/link"
import Loader from "@/components/common/loaders/loader/loader.component"
import { CustomPagination } from "@/components/common/paginator/paginator.component"

import { Slider } from "@/components/ui/slider"
import { FilterSchema, FilterValues } from "@/forms/filter-form/types"
import { generatePaginationByParams, TASK_LIMIT } from "@/services/paginator/paginator.helpers"
import { PaginatedResult } from "@/services/paginator/paginator.types"
import { addSearchParam } from "@/services/url/url.service"
import { zodResolver } from "@hookform/resolvers/zod"
import { toJS } from "mobx"
import { observer } from "mobx-react-lite"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { IoIosSearch } from "react-icons/io"
import { toast } from "sonner"

function Home(props: { searchParams: { [key: string]: string | null } }) {
	const { workflow, isGotted, tasks, deleteTask } = useStorage()
	const [paginatedTasks, setPaginatedTasks] = useState<PaginatedResult<ITask> | null>()
	const { notify } = notificationService
	const { push } = useRouter()
	const [cardSize, setCardSize] = useState<"minimal" | "medium">(
		(props.searchParams.size as "minimal" | "medium") || "medium"
	)
	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		watch,
		formState: { errors, isSubmitSuccessful },
	} = useForm<FilterValues>({
		defaultValues: {
			findValue: props.searchParams.search || "",
			selectAll: false,
			selectedTaskIds: [],
		},
		resolver: zodResolver(FilterSchema),
	})

	const wSelectedTasks = watch("selectedTaskIds")
	const wSelectAll = watch("selectAll")

	const onSubmit = (values: FilterValues) => {
		const jsTasks = toJS(tasks)
		const paginateModel = generatePaginationByParams(
			jsTasks.filter(f => f.title.toLowerCase().includes(values.findValue.toLowerCase())),
			props.searchParams
		)
		if (paginateModel) {
			setPaginatedTasks(paginateModel)
		}
		push(addSearchParam(props.searchParams, { search: values.findValue }))
	}

	const onDeleteAllTasks = (value: FilterValues) => {
		if (value.selectedTaskIds.length > 0) {
			let _tasks = toJS(tasks)
			value.selectedTaskIds.forEach(f => {
				deleteTask(f)
				_tasks = _tasks.filter(s => s.id !== f)
			})
			const paginateModel = generatePaginationByParams(_tasks, props.searchParams)
			if (paginateModel) {
				setPaginatedTasks(paginateModel)
			}
			notify({
				title: "Task removing",
				content: "All selected task was deleted",
				type: NotificationType.Warn,
				createdAt: new Date(),
			})
			toast.warning("Selected task was deleted")
			setValue("selectAll", false)
			setValue("selectedTaskIds", [])
			return
		}
		toast.info("Select tasks in order to delete")
	}
	useEffect(() => {
		if (tasks) {
			const paginateModel = generatePaginationByParams(toJS(tasks), props.searchParams)
			if (paginateModel) {
				setPaginatedTasks(paginateModel)
			}
		}
	}, [])

	useEffect(() => {
		const findValue = props.searchParams.search
		const jsTasks = toJS(tasks)
		if (findValue) {
			const paginateModel = generatePaginationByParams(
				jsTasks.filter(f => f.title.toLowerCase().includes(findValue.toLowerCase())),
				props.searchParams
			)
			if (paginateModel) {
				setPaginatedTasks(paginateModel)
			}
			return
		}
		if (jsTasks.length > 0) {
			setPaginatedTasks(generatePaginationByParams(jsTasks, props.searchParams))
		} else {
			setPaginatedTasks(generatePaginationByParams([], props.searchParams))
		}
	}, [props.searchParams])
	if (!tasks || tasks.length === 0 || !paginatedTasks || !workflow) {
		return (
			<div className="flex flex-col items-center justify-center">
				<h1 className="uppercase font-semibold text-2xl">Tasks empty</h1>
				<Link href={"/new-task"} className="text-blue-600 transition-all hover:text-blue-600">
					Create first time
				</Link>
			</div>
		)
	}
	return (
		<div className="h-full min-h-screen flex flex-col gap-4 pb-6 overflow-x-hidden">
			<div className="flex flex-col gap-2 xs:px-2 md:px-0">
				<div className="w-full">
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex justify-stretch w-full min-h-[2rem]"
					>
						{/* <Popover>
							<PopoverTrigger asChild>
								<button
									type="button"
									className="bg-blue-500 text-white rounded-l text-sm tracking-wide px-2 py-2 grid grid-cols-[1fr_16px] items-center gap-2 grow whitespace-nowrap"
								>
									Filter parameters
									<ChevronDown className="w-4 h-4" />
								</button>
							</PopoverTrigger>
							<PopoverContent className="bg-light rounded p-0 py-2 select-none">
								<div>ggg</div>
							</PopoverContent>
						</Popover> */}
						<input
							type="text"
							{...register("findValue")}
							placeholder="Enter search request"
							className="bg-transparent text-sm outline-none border-y border-l rounded-l border-black/20 px-2 w-full dark:border-light/20"
						/>
						<button className="flex items-center justify-center px-2 border-r border-y rounded-r border-black/20 text-gray-500 font-semibold dark:border-light/20 dark:text-gray-400">
							<IoIosSearch className="w-4 h-4 text-gray-500" />
						</button>
						<div className="flex items-center justify-center px-3 text-gray-500 font-semibold dark:text-neutral-300">
							{paginatedTasks.metadata.itemCount}/{paginatedTasks.metadata.totalItems}
						</div>
					</form>
				</div>
				<form onSubmit={handleSubmit(onDeleteAllTasks)} className="pt-2 flex items-center gap-4">
					<input
						type="checkbox"
						checked={wSelectAll}
						placeholder="Enter search request"
						className="w-4 h-4"
						onChange={e => {
							if (e.target.checked) {
								setValue("selectAll", true)
								const ids = tasks.map(f => f.id as string)
								setValue("selectedTaskIds", ids)
							} else {
								setValue("selectAll", false)
								setValue("selectedTaskIds", [])
							}
						}}
					/>
					<div className="rounded border divide-x dark:border-light/20 dark:divide-light/20">
						{wSelectAll && (
							<button
								type="button"
								className="px-2 transition-all text-blue-500 hover:text-white hover:bg-blue-500"
								onClick={() => {
									setValue("selectedTaskIds", [])
								}}
							>
								Unselect
							</button>
						)}
						<button
							type="submit"
							className="px-2 transition-all text-red-500 hover:text-white hover:bg-red-500"
						>
							Delete
						</button>
					</div>
					<div className="font-semibold uppercase flex gap-2">
						<span>S</span>
						<Slider
							defaultValue={cardSize === "medium" ? [75] : [25]}
							max={100}
							step={1}
							className="w-[5rem]"
							onChange={(e: any) => {
								if (Number(e.target.value as any) >= 50) {
									if (cardSize !== "medium") {
										//push(addSearchParam(props.searchParams, "size", "medium"))
										push(addSearchParam(props.searchParams, { size: "medium" }))
										setCardSize("medium")
									}
								} else {
									if (cardSize !== "minimal") {
										//push(addSearchParam(props.searchParams, "size", "minimal"))
										push(addSearchParam(props.searchParams, { size: "minimal" }))
										setCardSize("minimal")
									}
								}
							}}
						/>
						<span>L</span>
					</div>
				</form>
			</div>
			<div className="">
				{paginatedTasks.list
					.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
					.map((f, i) => (
						<TaskCard
							key={i}
							cardSize={cardSize}
							task={f}
							htmlContent={f.htmlContent}
							workflowId={workflow?.id}
							selectIdle={wSelectAll}
							isSelected={wSelectedTasks.includes(f.id as string)}
							onSelectTask={e => {
								if (!e) {
									setValue(
										"selectedTaskIds",
										wSelectedTasks.filter(st => st !== f.id)
									)
								} else if (f.id) {
									setValue("selectedTaskIds", [...wSelectedTasks, f.id])
								}
							}}
							onRedirect={() => {
								push(`/task/${f.id}`)
							}}
						/>
					))}
			</div>

			{paginatedTasks.metadata.totalPages > 1 && (
				<div className="flex justify-center select-none">
					<CustomPagination
						currentPage={Number(props.searchParams.page) || 1}
						totalPages={paginatedTasks.metadata.totalPages}
						onPageChange={e => {
							push(addSearchParam(props.searchParams, { page: String(e) }))
							//setPaginatedTasks(paginate(toJS(tasks), { page: e}))
						}}
					/>
				</div>
			)}
		</div>
	)
}
export default observer(Home)
