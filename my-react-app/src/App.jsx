
import UserInfoForm from "./components/UserInfoForm";

import "./App.css";

export default function App() {
  return (
    <main className="page">
      <section className="form-card">
        <h1>User information</h1>
        <p>Enter your details below.</p>
        <UserInfoForm />
      </section>
    </main>
  );
}