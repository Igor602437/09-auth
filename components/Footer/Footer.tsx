import Link from 'next/link';
import css from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Igor Afonin </p>
          <p>
            Contact us:
            <Link href="mailto:student@notehub.app">
              ` igorafonin.g@gmail.com`
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
