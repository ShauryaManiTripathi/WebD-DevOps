import * as z from "zod";
import * as jwt from "jsonwebtoken";

// Define the secret key
const secret: string = "mysecretkey";

// Define the schema for email validation
const emailSchema = z
  .string()
  .email()
  .min(5)
  .max(50)
  .transform((email) => email.toLowerCase());

// Define the schema for password validation
const passwordSchema = z
  .string()
  .min(8)
  .max(20)
  .regex(/[a-zA-Z]/, "Password must contain at least one letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[@$!%*?&]/, "Password must contain at least one special character");

// Define the schema for name validation
const nameSchema = z
  .string()
  .min(2)
  .max(50)
  .regex(/^[a-zA-Z]+$/, "Name must contain only letters");

// Define the user object interface
interface UserData {
  email: string;
  password: string;
  name: string;
}

// Create a typed schema for the user object
const objSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: nameSchema
});

// Use this type for our validated user data, derived from the schema
type ValidatedUserData = z.infer<typeof objSchema>;

// Example user object
const obj: UserData = {
  email: "shaurya@iiitg.ac.in",
  password: "password123",
  name: "Shaurya"
};

// Function to sign and verify a user object
function signer(obj: UserData): void {
  const valid = objSchema.safeParse(obj);
  
  if (!valid.success) {
    console.log(valid.error.format());
    return;
  }

  // Sign the token with validated data
  const token = jwt.sign(obj, secret);
  console.log("Token: ", token);
  
  // Verify and decode the token
  try {
    const decoded = jwt.verify(token, secret) as UserData;
    console.log("Decoded: ", decoded);
    
    // Validate the decoded data
    const verified = objSchema.safeParse(decoded);
    if (!verified.success) {
      console.log(verified.error.format());
      return;
    }
    
    // Access the verified data with proper types
    const validData: ValidatedUserData = verified.data;
    console.log("Verified: ", validData);
    console.log("Verified email: ", validData.email);
    console.log("Verified password: ", validData.password);
    console.log("Verified name: ", validData.name);
  } catch (error) {
    console.error("Token verification failed:", error);
  }
}

// Test data arrays
const mails: string[] = ['shaurya@gmail.com', 'sinsfoefef'];
const names: string[] = ['Shaurya', 'Sa'];
const passwords: string[] = ['password123', 'pa123', 'Zephyr@111'];

// Test all combinations
for (let i = 0; i < mails.length; i++) {
  for (let j = 0; j < names.length; j++) {
    for (let k = 0; k < passwords.length; k++) {
      const testObj: UserData = {
        email: mails[i],
        password: passwords[k],
        name: names[j]
      };
      console.log("\n=== Testing new combination ===");
      signer(testObj);
    }
  }
}
