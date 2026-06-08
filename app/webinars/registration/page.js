import Link from "next/link";
import { contactDetails } from "../../lib/site-data";
import CommunityJoinForm from "../../community/CommunityJoinForm";

export const metadata = {
  title: "Webinar Registration | Veterinary Business Institute",
  description: "Register for an upcoming live veterinary business webinar or panel discussion.",
};

export default function WebinarRegistrationPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow text-accent">Live Event Registration</span>
            <h1>
              Reserve your <em>seat.</em>
            </h1>
            <p className="hero-lead">
              Sign up for our upcoming live webinars and panel sessions to learn 
              from industry experts about operations, growth, team retention, 
              and smarter veterinary leadership.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split-grid">
          <div className="section-copy">
             <span className="eyebrow text-accent">Registration Process</span>
             <h2>How to secure your spot</h2>
             <p>
               Once registered, you will receive an automatic email directly from 
               our event platform containing your private viewing link and a calendar 
               invitation so you do not miss the live conversation.
             </p>

             <div className="note-card" style={{ marginTop: "2rem", padding: "1.5rem", borderLeft: "4px solid var(--teal-500)", backgroundColor: "var(--sand-100)" }}>
               <h4>Cannot make it live?</h4>
               <p style={{ marginTop: "0.5rem", fontSize: "0.95rem" }}>
                 Register anyway. All registrants will automatically be sent a link 
                 to the event replay and summary notes within 24 hours of the broadcast.
               </p>
             </div>
          </div>

          <div className="form-wrapper">
             <CommunityJoinForm
               email={contactDetails[2].label}
               title="Secure Your Webinar Registration"
               description="Fill in your details below to request access. If you are registering for a specific advertised event, your request will map accordingly."
               buttonLabel="Register Now"
               note="If you do not receive a confirmation within an hour, please contact our team."
               dark={false}
             />
          </div>
        </div>
      </section>
    </>
  );
}
