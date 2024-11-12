/* export function addSearchParam(
	searchParams: { [key: string]: string | null },
	param: string,
	value: string
) {
	// Create a new searchParams object (so we don't mutate the original)
	const updatedParams = { ...searchParams }

	// Add or update the parameter in the object
	updatedParams[param] = value

	// Convert the updated searchParams object to a query string
	const queryString = new URLSearchParams(updatedParams as any).toString()

	return "?" + queryString
} */

/* export function addSearchParam(
	searchParams: { [key: string]: string | null },
	param: string,
	value: string
) {
	// Create a new searchParams object (so we don't mutate the original)
	const updatedParams = { ...searchParams }

	// Add or update the parameter if value is not empty, else delete it
	if (value) {
		updatedParams[param] = value
	} else {
		delete updatedParams[param]
	}

	// Convert the updated searchParams object to a query string
	const queryString = new URLSearchParams(updatedParams as any).toString()

	return "?" + queryString
}
 */

export function addSearchParam(
	searchParams: { [key: string]: string | null },
	newParams: { [key: string]: string | null }
) {
	// Create a new searchParams object (so we don't mutate the original)
	const updatedParams = { ...searchParams }

	// Iterate over newParams and add, update, or delete parameters based on their values
	for (const [key, value] of Object.entries(newParams)) {
		if (value) {
			// Add or update the parameter if value is not empty
			updatedParams[key] = value
		} else {
			// Delete the parameter if value is empty or null
			delete updatedParams[key]
		}
	}

	// Convert the updated searchParams object to a query string
	const queryString = new URLSearchParams(updatedParams as any).toString()

	return "?" + queryString
}
