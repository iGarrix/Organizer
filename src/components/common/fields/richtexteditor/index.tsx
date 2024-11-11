/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useEditor, EditorContent, isActive } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Heading from "@tiptap/extension-heading"
import Paragraph from "@tiptap/extension-paragraph"
import Bold from "@tiptap/extension-bold"
import Highlight from "@tiptap/extension-highlight"
import Blockquote from "@tiptap/extension-blockquote"
import Code from "@tiptap/extension-code"
import CodeBlock from "@tiptap/extension-code-block"
import BulletList from "@tiptap/extension-bullet-list"
import OrderedList from "@tiptap/extension-ordered-list"
import TaskItem from "@tiptap/extension-task-item"
import TaskList from "@tiptap/extension-task-list"
import Placeholder from "@tiptap/extension-placeholder"
import HardBreak from "@tiptap/extension-hard-break"
import { UseFormSetValue } from "react-hook-form"
import { NewTaskValues } from "@/forms/create-task-validation/types"

import { ChevronDown } from "lucide-react"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TbBold, TbItalic, TbStrikethrough } from "react-icons/tb"
import Italic from "@tiptap/extension-italic"
import Strike from "@tiptap/extension-strike"
import { Color } from "@tiptap/extension-color"
import TextStyle from "@tiptap/extension-text-style"
import { RiDoubleQuotesR } from "react-icons/ri"
import { IoCodeSlashOutline } from "react-icons/io5"
import { RiCodeBlock } from "react-icons/ri"
import { IoIosList } from "react-icons/io"
import { AiOutlineOrderedList } from "react-icons/ai"
import { BsListCheck } from "react-icons/bs"
import "./stylizer.scss"
import { useEffect } from "react"

interface IRichTextEditorProps {
	setValue: UseFormSetValue<NewTaskValues>
	initialValue?: string
	isClear?: boolean
}

function RichTextEditor({ setValue, initialValue, ...props }: IRichTextEditorProps) {
	const editor = useEditor({
		extensions: [
			Placeholder.configure({
				placeholder: "Document more details",
			}),
			StarterKit,
			HardBreak,
			Paragraph,
			Heading.configure({
				levels: [3, 4, 5, 6],
			}),
			Bold,
			Italic,
			Strike,
			TextStyle,
			Color,
			Highlight.configure({ multicolor: true }),
			Blockquote,
			Code,
			CodeBlock,
			BulletList,
			OrderedList,
			TaskList,
			TaskItem.configure({
				nested: true,
			}),
		],
		content: initialValue || "",
		immediatelyRender: false,
		onUpdate: ({ editor }) => {
			setValue("htmlContent", editor.getHTML())
		},
	})

	useEffect(() => {
		editor?.commands.clearContent()
	}, [props.isClear])
	useEffect(() => {
		if (initialValue) {
			editor?.commands.setContent(initialValue)
		}
	}, [initialValue])

	return (
		<div className="relative">
			{editor && (
				<div className="flex gap-3 items-center px-2 py-2 border-x border-t border-b rounded-t bg-light z-50 *:transition-all sticky top-[9.8rem] dark:bg-dark-100 dark:border-light/20">
					<DropdownMenu>
						<DropdownMenuTrigger className="flex items-center hover:text-accent-blue outline-none">
							{editor.isActive("heading", { level: 3 })
								? "Heading 1"
								: editor.isActive("heading", { level: 4 })
								? "Heading 2"
								: editor.isActive("heading", { level: 5 })
								? "Heading 3"
								: editor.isActive("heading", { level: 6 })
								? "Heading 4"
								: "Paragraph"}
							<ChevronDown className="w-3 h-3" />
						</DropdownMenuTrigger>
						<DropdownMenuContent className="p-0 text-sm *:px-4 *:py-2 *:cursor-pointer *:rounded-none dark:*:hover:text-light dark:text-light dark:bg-dark-100 dark:border-light/20">
							<DropdownMenuItem
								className="hover:!bg-sky-600/20"
								onClick={() => editor.chain().focus().setParagraph().run()}
							>
								Paragraph
							</DropdownMenuItem>
							<DropdownMenuItem
								className="hover:!bg-sky-600/20 text-2xl font-bold"
								onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
							>
								Heading 1
							</DropdownMenuItem>
							<DropdownMenuItem
								className="hover:!bg-sky-600/20 text-xl font-bold"
								onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
							>
								Heading 2
							</DropdownMenuItem>
							<DropdownMenuItem
								className="hover:!bg-sky-600/20 text-lg font-bold"
								onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
							>
								Heading 3
							</DropdownMenuItem>
							<DropdownMenuItem
								className="hover:!bg-sky-600/20 text-lg font-bold"
								onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
							>
								Heading 4
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<div className="h-[0.8rem] w-[1px] bg-black/20"></div>
					<button
						className="hover:text-sky-600"
						type="button"
						onClick={() => editor.chain().focus().toggleBold().run()}
					>
						<TbBold className={`w-4 h-4 ${editor.isActive("bold") ? "text-accent-blue" : ""}`} />
					</button>
					<button
						className="hover:text-sky-600"
						type="button"
						onClick={() => {
							if (!editor.isActive("italic")) {
								editor.chain().focus().setItalic().run()
							} else {
								editor.chain().focus().unsetItalic().run()
							}
						}}
					>
						<TbItalic
							className={`w-4 h-4 ${editor.isActive("italic") ? "text-accent-blue" : ""}`}
						/>
					</button>
					<button
						className="hover:text-sky-600"
						type="button"
						onClick={() => {
							if (!editor.isActive("strike")) {
								editor.chain().focus().setStrike().run()
							} else {
								editor.chain().focus().unsetStrike().run()
							}
						}}
					>
						<TbStrikethrough
							className={`w-4 h-4 ${editor.isActive("strike") ? "text-accent-blue" : ""}`}
						/>
					</button>
					<div className="h-[0.8rem] w-[1px] bg-black/20"></div>
					<DropdownMenu>
						<DropdownMenuTrigger className="flex items-center hover:text-accent-blue outline-none">
							<div className="w-5 h-5 rounded flex items-center justify-center">A</div>
							<ChevronDown className="w-3 h-3" />
						</DropdownMenuTrigger>
						<DropdownMenuContent className="p-0 text-[12px] *:px-4 *:py-2 dark:text-light dark:bg-dark-100 dark:border-light/20">
							<DropdownMenuItem
								className="hover:!bg-sky-600/10 cursor-pointer rounded-none dark:hover:text-light"
								onClick={() => {
									editor.chain().focus().unsetColor().run()
									editor.chain().focus().toggleHighlight().run()
								}}
							>
								<div className="w-5 h-5 rounded border text-black flex items-center justify-center dark:text-light dark:border-light/20">
									A
								</div>
								<span className="ml-2">Plain text</span>
							</DropdownMenuItem>
							<h3 className="uppercase text-neutral-500">Text colors</h3>
							<DropdownMenuItem
								className="hover:!bg-sky-600/10 cursor-pointer rounded-none dark:hover:text-light"
								onClick={() => editor.chain().focus().setColor("#6b7280").run()}
							>
								<div className="w-5 h-5 rounded border text-gray-500/60 flex items-center justify-center dark:border-light/20">
									A
								</div>
								<span className="ml-2">Gray</span>
							</DropdownMenuItem>
							<DropdownMenuItem
								className="hover:!bg-sky-600/10 cursor-pointer rounded-none dark:hover:text-light"
								onClick={() => editor.chain().focus().setColor("#3b82f6").run()}
							>
								<div className="w-5 h-5 rounded border text-blue-500/60 flex items-center justify-center dark:border-light/20">
									A
								</div>
								<span className="ml-2">Blue</span>
							</DropdownMenuItem>
							<DropdownMenuItem
								className="hover:!bg-sky-600/10 cursor-pointer rounded-none dark:hover:text-light"
								onClick={() => editor.chain().focus().setColor("#ef4444").run()}
							>
								<div className="w-5 h-5 rounded border text-red-500/60 flex items-center justify-center dark:border-light/20">
									A
								</div>
								<span className="ml-2">Red</span>
							</DropdownMenuItem>
							<DropdownMenuItem
								className="hover:!bg-sky-600/10 cursor-pointer rounded-none dark:hover:text-light"
								onClick={() => editor.chain().focus().setColor("#f97316").run()}
							>
								<div className="w-5 h-5 rounded border text-orange-500/60 flex items-center justify-center dark:border-light/20">
									A
								</div>
								<span className="ml-2">Orange</span>
							</DropdownMenuItem>
							<DropdownMenuItem
								className="hover:!bg-sky-600/10 cursor-pointer rounded-none dark:hover:text-light"
								onClick={() => editor.chain().focus().setColor("#22c55e").run()}
							>
								<div className="w-5 h-5 rounded border text-green-500/60 flex items-center justify-center dark:border-light/20">
									A
								</div>
								<span className="ml-2">Green</span>
							</DropdownMenuItem>
							<h3 className="uppercase text-neutral-500 leading-none">Highlight colors</h3>
							<DropdownMenuItem
								className="hover:!bg-sky-600/10 cursor-pointer rounded-none dark:hover:text-light"
								onClick={() => editor.chain().focus().toggleHighlight({ color: "#b0b6c2" }).run()}
							>
								<div className="w-5 h-5 rounded bg-gray-500/60 flex items-center justify-center">
									A
								</div>
								<span className="ml-2">Gray</span>
							</DropdownMenuItem>
							<DropdownMenuItem
								className="hover:!bg-sky-600/10 cursor-pointer rounded-none dark:hover:text-light"
								onClick={() => editor.chain().focus().toggleHighlight({ color: "#3b82f6" }).run()}
							>
								<div className="w-5 h-5 rounded bg-blue-500/60 flex items-center justify-center">
									A
								</div>
								<span className="ml-2">Blue</span>
							</DropdownMenuItem>
							<DropdownMenuItem
								className="hover:!bg-sky-600/10 cursor-pointer rounded-none dark:hover:text-light"
								onClick={() => editor.chain().focus().toggleHighlight({ color: "#ef4444" }).run()}
							>
								<div className="w-5 h-5 rounded bg-red-500/60 flex items-center justify-center">
									A
								</div>
								<span className="ml-2">Red</span>
							</DropdownMenuItem>
							<DropdownMenuItem
								className="hover:!bg-sky-600/10 cursor-pointer rounded-none dark:hover:text-light"
								onClick={() => editor.chain().focus().toggleHighlight({ color: "#f97316" }).run()}
							>
								<div className="w-5 h-5 rounded bg-orange-500/60 flex items-center justify-center">
									A
								</div>
								<span className="ml-2">Orange</span>
							</DropdownMenuItem>
							<DropdownMenuItem
								className="hover:!bg-sky-600/10 cursor-pointer rounded-none dark:hover:text-light"
								onClick={() => editor.chain().focus().toggleHighlight({ color: "#22c55e" }).run()}
							>
								<div className="w-5 h-5 rounded bg-green-500/60 flex items-center justify-center">
									A
								</div>
								<span className="ml-2">Green</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<div className="h-[0.8rem] w-[1px] bg-black/20"></div>
					<button
						className="hover:text-sky-600"
						type="button"
						onClick={() => editor.chain().focus().toggleBlockquote().run()}
					>
						<RiDoubleQuotesR
							className={`w-4 h-4 ${editor.isActive("blockquote") ? "text-accent-blue" : ""}`}
						/>
					</button>
					<button
						className="hover:text-sky-600"
						type="button"
						onClick={() => editor.chain().focus().toggleCode().run()}
					>
						<IoCodeSlashOutline
							className={`w-4 h-4 ${editor.isActive("code") ? "text-accent-blue" : ""}`}
						/>
					</button>
					<button
						className="hover:text-sky-600"
						type="button"
						onClick={() => editor.chain().focus().toggleCodeBlock().run()}
					>
						<RiCodeBlock
							className={`w-4 h-4 ${editor.isActive("codeBlock") ? "text-accent-blue" : ""}`}
						/>
					</button>
					<div className="h-[0.8rem] w-[1px] bg-black/20"></div>
					<button
						className="hover:text-sky-600"
						type="button"
						onClick={() => editor.chain().focus().toggleBulletList().run()}
					>
						<IoIosList
							className={`w-5 h-5 ${editor.isActive("bulletList") ? "text-accent-blue" : ""}`}
						/>
					</button>
					<button
						className="hover:text-sky-600"
						type="button"
						onClick={() => editor.chain().focus().toggleOrderedList().run()}
					>
						<AiOutlineOrderedList
							className={`w-5 h-5 ${editor.isActive("orderedList") ? "text-accent-blue" : ""}`}
						/>
					</button>
					<button
						className="hover:text-sky-600"
						type="button"
						onClick={() => editor.chain().focus().toggleTaskList().run()}
					>
						<BsListCheck
							className={`w-5 h-5 ${editor.isActive("taskList") ? "text-accent-blue" : ""}`}
						/>
					</button>
				</div>
			)}
			<div className="p-2 border-x border-b rounded-b font-sourcecode dark:border-b-light/20 dark:border-x-light/20">
				<EditorContent className="*:!outline-none" editor={editor} />
			</div>
		</div>
	)
}
export default RichTextEditor
