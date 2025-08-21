import { useState } from "react";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import ReminderList from "./components/ReminderList";
import Footer from "./components/Footer";
function App() {
  const [reminders, setReminders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addReminder = (reminder) => {
    setReminders([...reminders, reminder]);
    setIsModalOpen(false);
  };

  return (
    <div className="app">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />

      <main className="container">
        <ReminderList reminders={reminders} />
      </main>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} onCreate={addReminder} />
      )}

      <Footer />
    </div>
  );
}

export default App;
