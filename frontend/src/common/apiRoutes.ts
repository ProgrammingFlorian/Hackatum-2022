export const apiDashboard = (): string => {
       return `/dashboard`;
}

export const apiVehicleCheckinRoute = (plate: string): string => {
       return `/vehicle/checkin/${plate}`;
}