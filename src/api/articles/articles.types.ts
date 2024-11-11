import { IBase } from "@/app/types"
import { ITag } from "../storage/db.types"

export interface IArticle extends IBase {
	id?: string
	title: string
	htmlContent: string
	tags?: ITag[]
}
