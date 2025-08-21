function Navbar({ onOpenModal }) {
  return (
    <nav className="navbar">
      <h1>Lembretes.com</h1>
      <button className="btn" onClick={onOpenModal}>
        Criar Lembrete
      </button>
    </nav>
  );
}
export default Navbar;