"use client"
import { ComponentPropsWithoutRef, useState } from "react"
import { cn } from "@/lib/utils"
interface ICardResizerProps extends ComponentPropsWithoutRef<"div"> {
	size: string
}

function CardResizer({ size: searchResult, ...props }: ICardResizerProps) {
	const [cardSize, setCardSize] = useState<"minimal" | "medium">(
		(searchResult as "minimal" | "medium") || "medium"
	)

	return <div></div>
}

CardResizer.DEF = <></>
export default CardResizer
