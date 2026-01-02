import React, { useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

const App = () => {
  const [refresh, setRefresh] = useState(false);
  const [showContacts, setShowContacts] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 flex items-center justify-center px-4 py-10">
      
      {/* Main Card */}
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Contact Management
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Save and manage your contacts effortlessly
          </p>
        </div>

        {/* Contact Form */}
        <ContactForm onSuccess={() => setRefresh(!refresh)} />

        {/* Toggle Button */}
        <button
          onClick={() => setShowContacts(!showContacts)}
          className="mt-6 w-full rounded-xl border border-indigo-600 text-indigo-600 font-semibold py-2.5 hover:bg-indigo-600 hover:text-white transition"
        >
          {showContacts ? "Hide Saved Contacts" : "View Saved Contacts"}
        </button>

        {/* Saved Contacts */}
        {showContacts && (
          <div className="mt-8">
            <ContactList refresh={refresh} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
