import { useContext } from 'react'
import { UserContext } from '../context/UserContext.jsx'

export const useUser = () => {
    const context = useContext(UserContext)

    if (context === undefined) {
        throw new Error('useCart must be used within a CartContextProvider')
    }

    return context
}