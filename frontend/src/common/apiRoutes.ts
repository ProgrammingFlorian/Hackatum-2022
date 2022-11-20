export const apiDashboard = (): string => {
       return `/dashboard`;
}

export const apiVehicleCheckinRoute = (plate: string): string => {
       return `/vehicle/checkin/${plate}`;
}

export const apiVehiclesRoute = (): string => {
       return `/vehicles`;
}