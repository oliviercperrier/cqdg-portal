import React from 'react';
import { useIntl } from 'react-intl';
import { Button } from 'antd';

import '@ferlab/style/themes/cqdg/components/footer.scss';

const Footer = (): React.ReactElement => {
    const intl = useIntl();
    return (
        <footer className="footer">
            <div className="footer__wrapper">
                <div className="footer__wrapper__text">
                    <h3 className="title">{intl.formatMessage({ id: 'footer.title' })}</h3>
                    <p className="more-info">
                        {intl.formatMessage({ id: 'footer.info' })}{' '}
                        <Button href="mailto:support@cqdg.ca" type="link">
                            {'support@cqdg.ca'}
                        </Button>
                    </p>
                </div>
                <div className="footer__wrapper__logos">
                    <Button href={intl.formatMessage({ id: 'footer.logo.genome.link' })} target="_blank" type="link">
                        <img alt="genome" src="/assets/img/genome_qc_logo_RS_icon.svg" />
                    </Button>
                    <Button href={intl.formatMessage({ id: 'footer.logo.chusj.link' })} target="_blank" type="link">
                        <img alt="chusj" src="/assets/img/chusj_logo_icon.svg" />
                    </Button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
