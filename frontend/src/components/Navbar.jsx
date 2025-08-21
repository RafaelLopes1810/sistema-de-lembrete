function Navbar({ onOpenModal }) {
  return (
    <nav className="navbar">
      <div class="esquerda">
        <img src="src\imgs\sino.png" alt="Ícone Lembrete" class="icone"/>
        <h1>Lembretes.com</h1>
      </div>  
      <button className="btn" onClick={onOpenModal}>
        <img src="src\imgs\mais.png" alt="Ícone Mais" class="icone2"/>
        <h3>Criar Lembrete</h3>
      </button>
    </nav>
  );
}
export default Navbar;
