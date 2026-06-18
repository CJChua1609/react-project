import React from 'react';
import './Footer.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
        <footer className="footer">
            <p className="footer__copy">&copy; {year} Chua Chi Jun. All rights reserved.</p>

            <div className="footer__links">
                
                <a href="https://github.com/CJChua1609"
                target="_blank"
                rel="noopener noreferrer"
                >
                GitHub
                </a>
                
                <a href="https://linkedin.com/in/chi-jun"
                target="_blank"
                rel="noopener noreferrer"
                >
                LinkedIn
                </a>
            </div>
        </footer>
    </>
  );
}

export default Footer;