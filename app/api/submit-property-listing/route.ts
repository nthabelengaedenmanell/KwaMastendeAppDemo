import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Validate required fields
    const requiredFields = [
      "fullName",
      "phoneNumber",
      "whatsappNumber",
      "email",
      "streetAddress",
      "city",
      "suburb",
      "province",
      "areaCode",
      "bedrooms",
      "bathrooms",
      "propertyType",
      "monthlyRent",
      "depositAmount",
    ]

    for (const field of requiredFields) {
      if (!formData[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Format the email content
    const emailSubject = `New Property Listing Submission - ${formData.propertyType.toUpperCase()} in ${formData.suburb}`

    const emailBody = `
NEW PROPERTY LISTING SUBMISSION
==============================

PERSONAL INFORMATION:
- Full Name: ${formData.fullName}
- Phone Number: ${formData.phoneNumber}
- WhatsApp Number: ${formData.whatsappNumber}
- Email: ${formData.email}

LOCATION DETAILS:
- Street Address: ${formData.streetAddress}
- City: ${formData.city}
- Suburb: ${formData.suburb}
- Province: ${formData.province}
- Area Code: ${formData.areaCode}

PROPERTY DETAILS:
- Number of Bedrooms: ${formData.bedrooms}
- Number of Bathrooms: ${formData.bathrooms}
- Property Type: ${formData.propertyType.toUpperCase()}

PRICING DETAILS:
- Monthly Rent: R${formData.monthlyRent}
- Deposit Amount: R${formData.depositAmount}

==============================
Submitted on: ${new Date().toLocaleString("en-ZA", { timeZone: "Africa/Johannesburg" })}

Please contact ${formData.fullName} at ${formData.phoneNumber} or ${formData.email} to proceed with the listing.
    `.trim()

    // Create mailto URL for email client
    const mailtoUrl = `mailto:kwamastende@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`

    // In a production environment, you would use a proper email service like:
    // - Resend
    // - SendGrid
    // - Nodemailer with SMTP
    // - AWS SES

    // For now, we'll simulate email sending and log the content
    console.log("Property Listing Submission:")
    console.log("Subject:", emailSubject)
    console.log("Body:", emailBody)
    console.log("Mailto URL:", mailtoUrl)

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real implementation, you would send the actual email here
    // Example with a hypothetical email service:
    /*
    await emailService.send({
      to: 'kwamastende@gmail.com',
      from: formData.email,
      subject: emailSubject,
      text: emailBody,
    })
    */

    return NextResponse.json({
      success: true,
      message: "Property listing submitted successfully",
      mailtoUrl: mailtoUrl, // Include mailto URL for fallback
    })
  } catch (error) {
    console.error("Error processing property listing submission:", error)
    return NextResponse.json({ error: "Failed to process property listing submission" }, { status: 500 })
  }
}
