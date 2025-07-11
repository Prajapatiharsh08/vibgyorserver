const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  FullName: { 
    type: String, 
    required: [true, "Full Name is required"],
    match: [/^[A-Za-z\s]{3,50}$/, "Full Name must be 3-50 characters and only letters"]
  },
  email: { 
    type: String, 
    required: [true, "Email is required"], 
    match: [/\S+@\S+\.\S+/, "Please enter a valid email address"] 
  },
  phone_number: { 
    type: String, 
    required: [true, "Phone number is required"],
    match: [/^\d{10}$/, "Phone number must be 10 digits"]
  },
  EventType: { 
    type: String, 
    required: [true, "Event Type is required"] 
  },
  BudgetRange: { 
    type: String, 
    required: [true, "Budget Range is required"] 
  },
  AdditionalRequirements: { 
    type: String, 
    required: [true, "Additional Requirements are required"],
    match: [/^.{5,500}$/, "Additional Requirements must be between 5 to 500 characters"]
  },
  PreferredDate: { 
    type: String, 
    required: [true, "Preferred Date is required"],
    match: [/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"]
  },
  city: { 
    type: String, 
    required: [true, "City is required"],
    match: [/^[A-Za-z\s]{2,50}$/, "City must contain only letters"]
  },
  GuestCount: { 
    type: String, 
    required: [true, "Guest Count is required"],
    match: [/^\d+(-\d+)?(\+)?$/, "Guest Count must be a valid range or number"]
  },
  subject: { 
    type: String, 
    required: [true, "Subject is required"],
    match: [/^.{3,100}$/, "Subject must be between 3 to 100 characters"]
  },
  message: { 
    type: String, 
    required: [true, "Message is required"],
    match: [/^.{10,1000}$/, "Message must be between 10 to 1000 characters"]
  }
}, { timestamps: true });

module.exports = mongoose.model('Form', formSchema);
