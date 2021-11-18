import React from 'react'

import './footer.css'

const FooterC = () => {
    return (
        <footer className="sticky-footer">
            <p>Copyright © {new Date().getFullYear()}</p>
        </footer>
    )
}

export default FooterC
