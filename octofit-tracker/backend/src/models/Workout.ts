import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  description: string;
  exercises: string[];
  createdAt: Date;
}

const WorkoutSchema = new Schema<IWorkout>({
  name:        { type: String, required: true },
  description: { type: String, default: '' },
  exercises:   [{ type: String }],
  createdAt:   { type: Date, default: Date.now },
});

export default mongoose.model<IWorkout>('Workout', WorkoutSchema);
