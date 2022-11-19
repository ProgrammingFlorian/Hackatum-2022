export const apiDashboard = (): string => {
       return `/dashboard`;
}

export const apiVehicleInfoRoute = (id: number): string => {
       return `/vehicles/${id}`;
}

export const apiVehicleCheckinRoute = (id: number): string => {
       return `/vehicles/check-in?id=${id}`;
}