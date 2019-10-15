import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {

    constructor() {
        super();

        this.state = {
            menu: [],
            isExpanded: false,

        };

        this.LoadData = this.LoadData.bind(this);
    }

    componentDidMount() {
        this.LoadData()
    }

    LoadData() {
        const list_menu = [
                        {text: "Tentang", url: "/tentang"},
                        {text: "Bantuan", url: "/bantuan"},
                     ];
        this.setState( {menu: list_menu} )
    }

    render() {

        return (
        <header className="lg:px-16 px-6 flex flex-wrap items-center lg:py-0 py-2 fixed top-0 w-screen bg-gray-300 h-15">
            <div className="flex-1 flex justify-between items-center">
                <Link to="/">
                    {/* Logo image
                    <img src={Logo} alt="Enjoy the Qur'an Logo" className="w-10 h-10"/> */}
                    <strong>Enjoy the Qur'an</strong>
                </Link>
            </div>
        
            <label htmlFor="menu-toggle" className="pointer-cursor lg:hidden block"><svg className="fill-current text-gray-900" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><title>menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path></svg></label>
            <input className="hidden" type="checkbox" id="menu-toggle" onClick={() => this.setState({isExpanded: !this.state.isExpanded})}/>
        
            <div className={`${ this.state.isExpanded ? `block` : `hidden` } lg:flex lg:items-center lg:w-auto w-full`} id="menu">
                <nav>
                    <ul className="lg:flex items-center justify-between text-base text-gray-700 pt-4 lg:pt-0">
                        { this.state.menu.map(
                            menu =>   <Link to={menu.url} key={menu.text}> <li className="MenuItem lg:p-4 hover:border-indigo-400">{menu.text}</li> </Link>
                        )}
                    </ul>
                </nav>
                {/* Profile image
                    <Link to="/" className="lg:ml-4 flex items-center justify-start lg:mb-0 mb-4 pointer-cursor">
                    <img className="rounded-full w-10 h-10 border-2 border-transparent hover:border-indigo-400" src="https://pbs.twimg.com/profile_images/1128143121475342337/e8tkhRaz_normal.jpg" alt="Andy Leverenz" />
                </Link> */}
        
            </div>
        
          </header>
        );
    }
}

export default Navbar;