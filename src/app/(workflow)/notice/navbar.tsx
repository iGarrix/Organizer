"use client"

import { articleService } from "@/api/articles/articles.instance"
import { Link } from "@/components/common/link/link"
import { format } from "date-fns"
import { observer } from "mobx-react-lite"
import { FaPlus } from "react-icons/fa"

function NavbarNotice() {
	const { articles } = articleService
	return (
		<div className="w-full sticky top-[5rem]">
			<div className="w-full bg-gray-200/60 border rounded overflow-hidden dark:bg-dark-100 dark:border-light/20">
				<div className="flex items-center justify-between py-2">
					<h1 className="text-lg font-semibold uppercase px-4">Notices</h1>
					<Link
						href={"/notice/new"}
						className="flex items-center justify-center px-5 hover:text-pink-500"
					>
						<FaPlus className="w-3 h-3" />
					</Link>
				</div>
				<hr className="border-black/10 dark:border-light/20" />
				<ul className="flex flex-col max-h-[60svh] overflow-auto">
					{articles.length === 0 && (
						<div className="flex justify-center items-center text-gray-500 py-4">Notices empty</div>
					)}
					{articles.map((f, i) => (
						<Link
							key={i}
							href={`/notice/${f.id}`}
							className="py-2 px-4 transition-all hover:bg-blue-500/10 dark:hover:text-pink-500 grid grid-cols-[1fr_auto] gap-2 items-center"
						>
							<span className="line-clamp-1 capitalize">{f.title}</span>
							<span className="flex overflow-hidden ml-auto text-gray-400 text-sm">
								{format(new Date(f.createdAt), "dd/MM")}
							</span>
						</Link>
					))}
				</ul>
			</div>
		</div>
	)
}

export default observer(NavbarNotice)
