"use client";
import { useState } from "react"
import { PublicNav } from "@/components/public/public-nav"
import { Footer } from "@/components/landing/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import Swal from "sweetalert2"


export default function ContactPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  // No need for alert state, use SweetAlert2 instead

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
        confirmButtonColor: "#dc2626"
      });
      setLoading(false);
      return;
    }
    // Compose the full name
    const name = `${firstName} ${lastName}`.trim();
    try {
      const { error } = await supabase.from("contact").insert([
        {
          name,
          email,
          message,
          first_name: firstName,
          last_name: lastName,
          phone,
          company
        }
      ]);
      if (error) throw error;
      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Your message has been sent! We'll get back to you soon.",
        confirmButtonColor: "#059669"
      });
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setMessage("");
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "Something went wrong. Please try again.",
        confirmButtonColor: "#dc2626"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      <PublicNav />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Want to Post Your Properties With Us?</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Contact us now and start showcasing your properties to thousands of potential buyers and renters across
              the Philippines.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Get Started Today</CardTitle>
                <p className="text-gray-600">
                  Ready to list your properties? Send us a message and we'll help you get started.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">First Name</label>
                      <Input placeholder="Juan" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Last Name</label>
                      <Input placeholder="Dela Cruz" value={lastName} onChange={e => setLastName(e.target.value)} required />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Email Address</label>
                    <Input type="email" placeholder="juan@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Phone Number</label>
                    <Input placeholder="+63 912 345 6789" value={phone} onChange={e => setPhone(e.target.value)} />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Company/Agency (Optional)</label>
                    <Input placeholder="ABC Realty" value={company} onChange={e => setCompany(e.target.value)} />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Message</label>
                    <Textarea placeholder="Tell us about your properties and how we can help you..." rows={4} value={message} onChange={e => setMessage(e.target.value)} required />
                  </div>

                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700" type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info & CTA */}
            <div className="space-y-8">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">Why List With ProperPinoy?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
                    <div>
                      <h3 className="font-medium text-gray-900">5 Free Listings</h3>
                      <p className="text-sm text-gray-600">
                        Start showcasing your properties immediately with no upfront costs
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
                    <div>
                      <h3 className="font-medium text-gray-900">Professional Dashboard</h3>
                      <p className="text-sm text-gray-600">Manage all your listings from one easy-to-use interface</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
                    <div>
                      <h3 className="font-medium text-gray-900">Direct Buyer Contact</h3>
                      <p className="text-sm text-gray-600">Connect directly with interested buyers and renters</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
                    <div>
                      <h3 className="font-medium text-gray-900">Mobile-Optimized</h3>
                      <p className="text-sm text-gray-600">Your properties look great on all devices</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg bg-emerald-50 border-emerald-200">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Get Started?</h3>
                  <p className="text-gray-600 mb-4">
                    Skip the contact form and create your account now to start listing properties immediately.
                  </p>
                  <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                    <Link href="/signup">Create Account Now</Link>
                  </Button>
                </CardContent>
              </Card>

              <div className="text-center space-y-2">
                <p className="text-gray-600">Need immediate assistance?</p>
                <p className="text-emerald-600 font-medium">support@properpinoy.com</p>
                <p className="text-emerald-600 font-medium">+63 912 345 6789</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
