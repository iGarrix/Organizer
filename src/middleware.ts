import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { LocalStorageContants } from "./app/types"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest, response: NextResponse) {
	const { url, cookies } = request
	const workflow = cookies.get(LocalStorageContants.Workflow)
	if (!workflow) {
		if (!url.includes("/setup")) {
			return NextResponse.redirect(new URL("/setup", request.url))
		}
		if (url.includes("/backup")) {
			return NextResponse.redirect(new URL("/", request.url))
		}
	} else {
		if (url.includes("/setup")) {
			return NextResponse.redirect(new URL("/", request.url))
		}
	}
	return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ["/:path", "/setup/:path", "/backup/:path"],
}
