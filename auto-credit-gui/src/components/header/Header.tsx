import { useEffect, useState } from "react";
import { useGlobal } from "contexts/GlobalContext";
import { ArrowDownIcon, ArrowUpIcon, Container, LoginButton, Logo, Menu, MenuButton, MenuItem, MenuList, UserIcon } from "./Header.styles";

function Header() {
  const { user } = useGlobal();

  const [userName, setUserName] = useState('Unknow');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setUserName(user.username);
    }
  }, [user]);


  return (
    <Container>
      <Logo />
      <Menu>
        {
          user ?
            <MenuButton
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <UserIcon />
              {userName}
              {menuOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
            </MenuButton>
            :
            <LoginButton to={'/login'}>Entrar</LoginButton>
        }
        {
          menuOpen &&
          <MenuList>
            <MenuItem to={'/'}>Meus dados</MenuItem>
            <MenuItem to={'/consignado'}>Solicitar</MenuItem>
            <MenuItem to={'/emprestimos'}>Solicitações</MenuItem>
            <MenuItem to={'/logout'}>Sair</MenuItem>
          </MenuList>
        }
      </Menu>
    </Container>
  );
}

export default Header;