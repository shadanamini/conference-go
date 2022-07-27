import { NavLink } from 'react-router-dom';
import { menuItems } from './menuItems';
import MenuItems from './MenuItem'

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-info">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">Conference GO!</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="menus">
          {menuItems.map((menu, index) => {
            return <MenuItems items={menu} key={index} />
          })}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;