import React from 'react';

import './style.css';

import imagePerfil from '../../assets/img/leandro-macedo.jpg';

class SiteHeader extends React.Component {
    render() {
        return (
            <header className="cv-header">

                <div className="container">

                    <div className="row">

                        <div className="col-xs-5 col-sm-3">
                            <div className="cv-header-avatar">
                                <img src={imagePerfil} alt="Leandro Macedo"
                                    className="img-responsive img-circle img-thumbnail" />
                            </div>
                        </div>

                        <div className="col-xs-7 col-sm-5">
                            <div className="cv-header-titles">
                                <h1 className="cv-header-title">
                                    Leandro<br />
                                    <span className="color-a">Macedo</span>
                                </h1>
                                <h2 className="cv-header-subtitle" itemprop="jobTitle">Desenvolvedor</h2>
                            </div>
                        </div>

                        <div className="col-xs-12 col-sm-4">
                            <address className="cv-header-address">
                                <p>Telefone: <strong className="color-a" itemprop="telephone">+55 11 98739-1075</strong></p>
                                <p>E-mail: <strong className="color-a" itemprop="email">fmlimao@gmail.com</strong></p>
                            </address>
                        </div>

                    </div>

                </div>

            </header>
        )
    }
}

export default SiteHeader;
