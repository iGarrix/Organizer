'use client'

import { ReactNode, createContext, useContext } from 'react'
import { dbStorage } from './db.storage'

const StoreContext = createContext(dbStorage)
export const useStorage = () => useContext(StoreContext)

export const MobxStorageProvider = ({ children }: { children: ReactNode }) => {
	return (
		<StoreContext.Provider value={dbStorage}>{children}</StoreContext.Provider>
	)
}
