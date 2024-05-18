import { Schema, model, models } from "mongoose";

const guestSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		isAddedBy: {
			type: String,
			required: true,
		},
		isGoing: {
			type: Boolean,
			required: true,
		},
	},
	{ timestamps: true }
);

const guestModel = models.guest || model("guest", guestSchema);

export default guestModel;
