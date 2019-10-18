import React from 'react';
import Helmet from 'react-helmet';
import './App.css';

import SiteHeader from './components/SiteHeader/index';

function App() {
  // document.title = 'Leandro Macedo'

  return (
    <>
      <Helmet>
        <title>Leandro Macedo</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Leandro Macedo" />
        <meta name="description" content="Leandro Macedo Desenvolvedor" />
        <meta name="keywords" content="Leandro Macedo, Desenvolvedor" />
        <meta name="copyright" content="© 2019 Leandro Macedo" />
        <meta name="robots" content="all" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png" />
        <link rel="manifest" href="site.webmanifest" />
      </Helmet>

      <main className="cv-main" itemscope itemtype="http://schema.org/Person">

        <SiteHeader></SiteHeader>

      </main>
    </>
  );
}

export default App;
