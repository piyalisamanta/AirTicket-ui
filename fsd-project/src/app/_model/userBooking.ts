export interface UserBooking{

    airlines: string,
	departDate: string,
	departTime: string,
	arrivalTime: string,
	passCount?: number,
	totalCost: number,
	emailAddress: string,
	toBeCancelled?: boolean,

}