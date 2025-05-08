const zod = require("zod");
const jwt = require("jsonwebtoken");

const secret = "mysecretkey";

const emailSchema = zod
  .string()
  .email()
  .min(5)
  .max(50)
  .transform((email) => email.toLowerCase());
const passwordSchema = zod
  .string()
  .min(8)
  .max(20)
  .regex(/[a-zA-Z]/, "Password must contain at least one letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[@$!%*?&]/, "Password must contain at least one special character");
const nameSchema = zod
  .string()
  .min(2)
  .max(50)
  .regex(/^[a-zA-Z]+$/, "Name must contain only letters");


const obj = {
    email: "shaurya@iiitg.ac.in",
    password: "password123",
    name: "Shaurya"
};

const objSchema = zod.object({
    email: emailSchema,
    password: passwordSchema,
    name: nameSchema
});

function signer(obj) {
    let valid = objSchema.safeParse(obj);
    if (!valid.success) {
        console.log(valid.error.format());
        return;
    }
    const token = jwt.sign(obj, secret);
    console.log("Token: ", token);
    const decoded = jwt.verify(token, secret);
    console.log("Decoded: ", decoded);
    const verified = objSchema.safeParse(decoded);
    if (!verified.success) {
        console.log(verified.error.format());
        return;
    }
    console.log("Verified: ", verified.data);
    console.log("Verified email: ", verified.data.email);
    console.log("Verified password: ", verified.data.password);
    console.log("Verified name: ", verified.data.name);
}


const mails = ['shaurya@gmail.com','sinsfoefef']
const names = ['Shaurya','Sa']
const passwords = ['password123','pa123','Zephyr@111']


for (let i = 0; i < mails.length; i++) {
    for (let j = 0; j < names.length; j++) {
        for (let k = 0; k < passwords.length; k++) {
            const obj = {
                email: mails[i],
                password: passwords[k],
                name: names[j]
            };
            signer(obj);
        }
    }
}