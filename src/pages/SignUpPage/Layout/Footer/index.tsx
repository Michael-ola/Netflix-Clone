import React from 'react'
import {StyledFooter,StyledLink} from './style/Footer.style'
const footerItems=require('../../../../data/signInPageFooter.json')

const Footer = () => {
    return (
        <StyledFooter footerItems={footerItems} prepend={<StyledLink href="https://help.netflix.com/contactus">Questions? Contact Us</StyledLink>}/>
    )
}

export default Footer
