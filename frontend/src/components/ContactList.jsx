import React, { useEffect, useState } from "react";
import axios from "axios";

const ContactList = ({ refresh }) => {
  const [contacts, setContacts] = useState([]);

 useEffect(() => {
  axios
    .get(`${import.meta.env.VITE_API_URL}/api/contacts`)
    .then((res) => setContacts(res.data))
    .catch((err) => console.error(err));
}, [refresh]);


  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Saved Contacts
      </h3>

      {contacts.length === 0 && (
        <p className="text-sm text-gray-500 text-center">
          No contacts added yet
        </p>
      )}

      <ul className="space-y-3">
        {contacts.map((c) => (
          <li
            key={c._id}
            className="rounded-xl border border-gray-200 bg-gray-50 p-4 transition hover:shadow-md"
          >
            <p className="text-base font-semibold text-gray-800">{c.name}</p>

            <p className="text-sm text-gray-600">📞 {c.phone}</p>

            {c.email && <p className="text-sm text-gray-500">✉️ {c.email}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
