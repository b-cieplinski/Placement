import axios from "axios"

import { endpoints } from "../constance"
import { Location } from "../types/locationiq"

export const getSuggestedLocations = async (text: string, limit: number) => {
    try {
        let finalLimit = 8;
        if (limit) finalLimit = limit;

        const url = `${endpoints.autoCompleteEndpoint}?location=${text}&limit=${finalLimit}`
        const {data} = await axios.get<Location[]>(url);
        if (data) return data

        return[]

    } catch (error) {
        console.error(error)
        return[]
    }
}


export const searchLocations = async (text: string) => {
    try {

        const url = `${endpoints.searchEndpoint}?location=${text}`
        const {data} = await axios.get<Location[]>(url);
        if (data) return data

        return[]

    } catch (error) {
        console.error(error)
        return[]
    }
}
