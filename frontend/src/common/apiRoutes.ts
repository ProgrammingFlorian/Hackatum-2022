export const apiDashboard = (): string => {
       return `/dashboard`;
}

export const apiVehicleCheckinRoute = (id: number): string => {
       return `/vehicles/check-in?id=${id}`;
}