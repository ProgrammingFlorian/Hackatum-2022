const apiRoute = "/api"

export const apiVehicleInfoRoute = (id: number): string => {
       return `${apiRoute}/vehicles/${id}`
}