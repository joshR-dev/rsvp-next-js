"use server";

import GuestModel from "../models/guestModel";
import connectDB from "../utils/connection";
import { Guest } from "../utils/types";

export async function getGuest() {
	try {
		await connectDB();
		const data = await GuestModel.find();

		return JSON.parse(JSON.stringify(data));
	} catch (error) {
		console.error("error getting guests", error);

		return { errMsg: error };
	}
}

export async function addGuests(guests: Guest[]) {
	try {
		await connectDB();

		// const bulkUpdateOps = guests.map((item) => ({
		// 	updateOne: {
		// 		filter: { firstName: item.firstName, lastName: item.lastName },
		// 		update: item,
		// 	},
		// }));

		const bulkOperations = [];

		for (const guest of guests) {
			const existingItem = await GuestModel.findOne({
				firstName: guest.firstName,
				lastName: guest.lastName,
			});

			if (existingItem) {
				// Update existing item
				bulkOperations.push({
					updateOne: {
						filter: {
							firstName: guest.firstName,
							lastName: guest.lastName,
						},
						update: guest,
					},
				});
			} else {
				// Add new item
				bulkOperations.push({
					insertOne: {
						document: guest,
					},
				});
			}
		}

		const result = await GuestModel.bulkWrite(bulkOperations);

		console.log("results", result);

		// const savedItems = await GuestModel.bulkSave(
		// 	guests.map((guest) => new GuestModel(guest))
		// );

		return JSON.parse(JSON.stringify(result));
	} catch (error) {
		console.error("error getting guests", error);

		return { errMsg: error };
	}
}
