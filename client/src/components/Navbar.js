import { Link } from 'react-router-dom';
import useAuth from '../hooks/auth';
import React from 'react';

const Navbar = () => {
    const { isLoggedIn, logout, getProfile } = useAuth();
    return (
        <div className="flex justify-center py-4">
            <h3>Menu</h3>
            <ul>
                <li><Link to="/">Accueil</Link></li>
                <li><Link to='/notes'>Notes</Link></li>
                {isLoggedIn() ?
                    <>
                        <li>Hello, {getProfile().email}</li>
                        <li><Link onClick={() => logout()} to='/'>Déconnecter</Link></li>
                    </>
                    :
                    <>
                        <li><Link to="/signup">Inscrivez-vous</Link></li>
                        <li><Link to="/login">Connexion</Link></li>
                    </>
                }
                
            </ul>
            
        </div>
        
    );
};

export default Navbar;