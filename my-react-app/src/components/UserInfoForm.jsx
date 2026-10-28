import { useState } from "react";

export default function UserInfoForm() {
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:3002/user_info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          date_of_birth: dateOfBirth,
          phone_number: phoneNumber,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.error || result.message || "Submission failed."); 
        return;
      }

      setMessage("Information submitted successfully.");
      setName("");
      setDateOfBirth("");
      setPhoneNumber("");
    } catch {
      setMessage("Could not connect to the backend server.");
    }
  }

  return (
    <form className="user-info-form" onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
      />

      <label htmlFor="date_of_birth">Date of birth</label>
      <input
        id="date_of_birth"
        type="date"
        value={dateOfBirth}
        onChange={(event) => setDateOfBirth(event.target.value)}
        required
      />

      <label htmlFor="phone_number">Phone number</label>
      <input
        id="phone_number"
        type="tel"
        value={phoneNumber}
        onChange={(event) => setPhoneNumber(event.target.value)}
        required
      />

      <button type="submit">Submit</button>

      {message && <p role="status">{message}</p>}
    </form>
  );
}