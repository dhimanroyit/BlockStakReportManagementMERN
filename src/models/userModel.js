import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'name must be required'],
      min: [2, 'name must not be at least 3 character long'],
      max: [50, 'name must be no longer than 50 characters '],
    },
    address: String,
    phone: {
      type: String,
      trim: true,
      validate: {
        validator: function (value) {
          const phoneRegex = /^(?:\+88|01)?\d{11}$/;
          return phoneRegex.test(value);
        },
        message: (props) => `${props.value} is not a valid phone number`,
      },
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: [true, 'email must be required'],
      validate: {
        validator: function (value) {
          const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
          return emailRegex.test(value);
        },
        message: (props) => `${props.value} is not a valid email address`,
      },
    },
    password: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ['regular', 'admin'],
      default: 'regular',
    },
    profession: String,
    favoriteColor: String,
  },
  {
    timestamps: true,
  }
);

export const User = model('User', userSchema);
