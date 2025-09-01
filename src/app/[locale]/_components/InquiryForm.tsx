"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { sendGTMEvent } from '@next/third-parties/google'
import { usePathname, useRouter } from "@/i18n/navigation";

const schema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(7, { message: "Invalid phone number" }),
    message: z.string().min(5, { message: "Message is required" }),
    agreement1: z.boolean().refine((val) => val, { message: "You must agree to this" }),
    agreement2: z.boolean().optional(),
    agreement3: z.boolean().optional(),
});
interface InquiryFormProps {
    hideFeedbackButton?: boolean;
}
type FormData = z.infer<typeof schema>;

const InquiryForm: React.FC<InquiryFormProps> = ({ hideFeedbackButton = false }) => {
    const router = useRouter();
    const pathname = usePathname();
    const locale = pathname.split("/")[1] || "en"; 
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
        agreement1: true,
        agreement2: true,
        agreement3: true,
        },
    });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postId, setPostId] = useState<string | null>(null);
  const onSubmit = async (data: FormData) => {
    sendGTMEvent({ event: 'Inquiry', value: '1' })
    setIsSubmitting(true);
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get("utm_source");
    const currentUrl = window.location.href;

    const remarks = `
        Additional consent 1: ${data.agreement1 ? "Yes" : "No"} </br>
        Additional consent 2: ${data.agreement2 ? "Yes" : "No"} </br>
        Additional consent 3: ${data.agreement3 ? "Yes" : "No"} </br>
        Client Name: ${data.firstName} ${data.lastName} </br>
        Client Email: ${data.email} </br>
        Client Phone: ${data.phone} </br>
        Client Message: ${data.message} </br>
        URL coming from: ${currentUrl}
    `;

    const formDataToSend = {
        TitleID: "129932",
        FirstName: data.firstName,
        FamilyName: data.lastName,
        MobileCountryCode: "",
        MobileAreaCode: "",
        MobilePhone: data.phone,
    };

    try {
        const mailRes = await fetch("https://admin.elbayt.com/api/sendemail.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                body: `
                <h2>New Lead Submission</h2>
                <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
                <p><strong>Phone:</strong> ${data.phone}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Message:</strong> ${data.message}</p>
                <p><strong>Form Submitted From:</strong> ${currentUrl}</p>
                `,
                receiver: "elbaytae@gmail.com,elbayteg@gmail.com",
                subject: `New Lead - ${data.firstName} ${data.lastName} - ${data.phone} `,
                filename: "",
                filedata: "",
            }),
        });
      
        if (mailRes.ok) {
            setPostId("Success");
            //window.location.href = `/${locale}/thankyou?email=${encodeURIComponent(data.email)}`;
        } else {
            alert("Error submitting the form.");
        }
    } catch (error) {
        console.error("Error:", error);
        setPostId("Error");
    } finally {
        setIsSubmitting(false);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-white p-6 rounded-lg">
        {/* Success/Error Messages */}
        {postId === "Success" && <div className="p-3 mb-3 rounded bg-green-500 text-white">Form submitted successfully!</div>}
        {postId === "Error" && <div className="p-3 mb-3 rounded bg-red-500 text-white">Submission failed. Try again.</div>}
        <h2 className="text-lg font-bold mb-4 text-[#111954]">Inquire</h2>
        <div className="mb-3">
          <input
            type="text"
            {...register("firstName")}
            placeholder="First Name"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
        </div>
        <div className="mb-3">
          <input
            type="text"
            {...register("lastName")}
            placeholder="Last Name"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
        </div>
        <div className="mb-3">
          <input
            type="email"
            {...register("email")}
            placeholder="Email"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div className="mb-3">
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInput
                {...field}
                international
                defaultCountry="AE"
                placeholder="+971-555555555"
                className="w-full p-3 border rounded-md mb-3"
              />
            )}
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>
        <div className="mb-3">
          <textarea
            {...register("message")}
            placeholder="Hi, I would like to contact you"
            rows={4}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
        </div>
        <button
          type="submit"
          className="w-full border border-[#111954] p-3 mb-6 rounded-md hover:text-[#0c1445] hover:bg-white bg-[#0c1445] text-white font-semibold cursor-pointer"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        <div className="mb-3">
          <label className="flex items-center space-x-2">
            <span className="text-sm">By clicking Submit, you agree to our Terms & Conditions and Privacy Policy</span>
          </label>
        </div>
        <div className="mb-3 hidden">
          <label className="flex items-center space-x-2">
            <input type="checkbox" {...register("agreement1")} className="rounded border-gray-300" defaultChecked />
            <span className="text-sm">I agree to the Terms & Conditions and Privacy Policy</span>
          </label>
          {errors.agreement1 && <p className="text-red-500 text-sm">{errors.agreement1.message}</p>}
        </div>

        <div className="mb-3 hidden">
          <label className="flex items-center space-x-2">
            <input type="checkbox" {...register("agreement2")} className="rounded border-gray-300" defaultChecked />
            <span className="text-sm">Agree to receive calls and communications</span>
          </label>
        </div>
        <div className="mb-3 hidden">
          <label className="flex items-center space-x-2">
            <input type="checkbox" {...register("agreement3")} className="rounded border-gray-300" defaultChecked />
            <span className="text-sm">Receive calls about various projects</span>
          </label>
        </div>
      </form>
      {!hideFeedbackButton && (
        <div className="mt-4">
          <button
            type="button"
            className="w-full bg-[#111954] text-white p-3 rounded-md hover:bg-[#0c1445] transition"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              router.push("/en/customer-feedback");
            }}
          >
            Your Feedback
          </button>
        </div>
      )}
    </>
  );
};

export default InquiryForm;