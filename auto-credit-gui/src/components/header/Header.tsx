import { useState } from "react";
import { ArrowDownIcon, ArrowUpIcon, Container, Logo, MenuButton, UserIcon } from "./Header.styles";

function Header() {
  const [userName, setUserName] = useState('Unknow');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Container>
      <Logo />
      <MenuButton
        onClick={() => setMenuOpen(!menuOpen)}
        onBlur={() => setMenuOpen(false)}
      >
        <UserIcon />
        {userName}
        {menuOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </MenuButton>
    </Container>
  );
}

export default Header;