import React from 'react';

const About = () => {
  return (
    <div className="bg-white text-gray-800 lg:text-2xl sm:text-base">
      <div className="container about-page p-4 w-[90%] md:w-[70%] mx-auto mt-10 mb-10">
        <section className="prose prose-headings:mt-4 prose-p:mt-2 prose-li:mt-1 max-w-none">
          <p>
            Welcome to <strong>Eventsnode</strong>, your trusted partner in event marketing and ticketing solutions. With over a decade of experience and innovation, we empower event organizers to bring their ideas to life, connect with their audience, and achieve success.
          </p>

          <h3 className='mt-2 py-2 font-semibold text-3xl'>Our Vision</h3>
          <p>To revolutionize the event industry by providing seamless, reliable, and user-friendly solutions tailored for every organizer’s needs.</p>

          <h3  className='mt-2 py-2 font-semibold text-3xl'>What We Offer</h3>
          <p>At Eventsnode, we specialize in offering a comprehensive platform for event organizers. Whether you're planning a concert, workshop, seminar, or any event, our services are designed to make your journey smooth and rewarding:</p>

          <ul className="list-disc list-inside py-4">
            <li >
              <strong>Event Listing:</strong> Showcase your events to a wide audience through our intuitive platform.
            </li>
            <li>
              <strong>Ticketing Solutions:</strong> Simplify seat bookings with our robust and efficient ticketing services.
            </li>
            <li>
              <strong>Backend Dashboard Tools:</strong>
              <ul className="list-disc list-inside ml-5">
                <li><strong>Event Management:</strong> Easily create, edit, and manage events with a few clicks.</li>
                <li><strong>Real-Time Analytics:</strong> Monitor ticket sales, attendance rates, and revenue generation in real time.</li>
                <li><strong>Seat Mapping:</strong> Visualize and customize seating arrangements with ease.</li>
                <li><strong>Attendee Management:</strong> Access detailed attendee information for better engagement and support.</li>
                <li><strong>Sales Tracking:</strong> Keep tabs on ticket sales performance and trends.</li>
                <li><strong>Custom Reporting:</strong> Generate detailed reports for insights into your event’s success metrics.</li>
                <li><strong>Secure Payment Gateway Integration:</strong> Track and manage payments with built-in security features.</li>
              </ul>
            </li>
          </ul>

          <h3  className='mt-2 py-4 font-semibold text-3xl'>Why Choose Us?</h3>
          <ul className="list-disc list-inside">
            <li><strong>Expertise You Can Trust:</strong> With 10+ years in the industry, we understand the unique challenges organizers face.</li>
            <li><strong>Tailored for Organizers:</strong> We focus solely on services that empower organizers, providing tools that are practical and effective.</li>
            <li><strong>Reliability at Every Step:</strong> From planning to execution, our platform ensures your events run smoothly.</li>
          </ul>

          <h3  className='mt-2 py-2 font-semibold text-3xl'>Our Belive</h3>
          <p>
            At EventsNode, we believe every event is an opportunity to inspire, connect, and create unforgettable experiences. We’re here to support you every step of the way because <strong>“You're in Good Company.”</strong>
          </p>
          <p  className='mt-2 py-2 text-2xl'><strong>We are the one-stop shop for all your customer-centric needs.</strong></p>

          <h4>At EventsNode, we have a ‘four-square’ slab for businesses</h4>

          <h3  className='mt-2 py-2 font-semibold text-3xl'>Square One: Venue</h3>
          <p>Your space is our craze! We bring in our expertise from a range covering events to leisure walk-ins.</p>

          <h3  className='mt-2 py-2 font-semibold text-3xl'>Square Two: Organizers</h3>
          <p>Our portal engages whom you want to engage with—no shooting in the dark.</p>

          <h3  className='mt-2 py-2 font-semibold text-3xl'>Square Three: Artists</h3>
          <p>Musicians, DJs, chefs, comedians, and everyone else with artistic penchant, we help you leverage your craft and reach audiences.</p>

          <h3  className='mt-2 py-2 font-semibold text-3xl'>Square Four: User Members</h3>
          <p>
            <a href="https://dev.eventsnode.com/login" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              Sign up
            </a>{' '}
            with us to explore endless possibilities through all forms of content..
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
