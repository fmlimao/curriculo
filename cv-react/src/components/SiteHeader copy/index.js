import React from 'react';

import './style.css';

import imagePerfil from '../../assets/img/leandro-macedo.jpg';

class SiteHeaderAvatar extends React.Component {
    render() {
        return (
            <div className="cv-header-avatar">
                <img src={imagePerfil} alt="Leandro Macedo"
                    className="img-responsive img-circle img-thumbnail" />
            </div>
        )
    }
}

class SiteHeaderTitles extends React.Component {
    render() {
        return (
            <div className="cv-header-titles">
                <h1 className="cv-header-title">
                    Leandro<br />
                    <span className="color-a">Macedo</span>
                </h1>
                <h2 className="cv-header-subtitle" itemprop="jobTitle">Desenvolvedor</h2>
            </div>
        )
    }
}

class SiteHeaderAddress extends React.Component {
    render() {
        return (
            <address className="cv-header-address">
                <p>Telefone: <strong className="color-a" itemprop="telephone">+55 11 98739-1075</strong></p>
                <p>E-mail: <strong className="color-a" itemprop="email">fmlimao@gmail.com</strong></p>
            </address>
        )
    }
}

class SiteHeader extends React.Component {
    render() {
        return (
            <header className="cv-header">

                <div className="container">

                    <div className="row">

                        <div className="col-xs-5 col-sm-3">
                            <SiteHeaderAvatar></SiteHeaderAvatar>
                        </div>

                        <div className="col-xs-7 col-sm-5">
                            <SiteHeaderTitles></SiteHeaderTitles>
                        </div>

                        <div className="col-xs-12 col-sm-4">
                            <SiteHeaderAddress></SiteHeaderAddress>
                        </div>

                    </div>

                </div>

            </header>
        )
    }
}

export default SiteHeader;
