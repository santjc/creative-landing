import { Power4, gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';

import MenuIcon from '@components/Icons/MenuIcon';

import styles from './Menu.module.scss';

export default function Menu() {
  const menuOptionsContainer = useRef<HTMLDivElement>(null);
  const menuContainer = useRef<HTMLDivElement>(null);
  const menuIcon = useRef<HTMLDivElement>(null);
  const menuFooter = useRef<HTMLDivElement>(null);
  const timeline = useRef(gsap.timeline({ paused: true }));
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const menuOptionsArray =
      menuOptionsContainer.current?.querySelectorAll('div') || [];
    gsap.set(menuFooter.current, { yPercent: 150 });
    gsap.set(menuOptionsArray, { autoAlpha: 0, xPercent: -15 });

    timeline.current
      .to(menuContainer.current, { duration: 0.2, css: { height: '100vh' } })
      .to(menuOptionsArray, { autoAlpha: 1, xPercent: 0, duration: 0.2 })
      .to(menuFooter.current, {
        duration: 0.3,
        yPercent: 0,
        ease: Power4.easeOut,
      })

      .reverse();
  }, []);

  useEffect(() => {
    timeline.current.reversed(!open);
  }, [open]);
  return (
    <div ref={menuContainer} className={styles.container}>
      <div className={styles.menuHeader}>
        <h1>{'</>'}</h1>
        <div
          onClick={() => setOpen(!open)}
          ref={menuIcon}
          className={styles.menuIcon}
          style={{ color: open ? '#eb367f' : '#fff' }}
        >
          <MenuIcon size={'28px'} />
        </div>
      </div>

      <div ref={menuOptionsContainer} className={styles.menuOptionsContainer}>
        <div className={styles.menuOption}>
          <a>Home</a>
        </div>
      </div>
      <div ref={menuFooter} className={styles.menuFooter}>
        <div className={styles.footerColumn}>
          <p>Get in touch</p>
          <a
            href={'mailto:sjcolombatto@gmail.com'}
            rel={'noreferrer'}
            target="_blank"
          >
            sjcolombatto@gmail.com
          </a>
        </div>
        <div className={styles.footerColumn}>
          <p>Code</p>
          <a
            href={'https://github.com/santjc'}
            rel={'noreferrer'}
            target="_blank"
          >
            github
          </a>{' '}
        </div>
        <div className={styles.footerColumn}>
          <p>Job</p>
          <a
            href={'https://linkedin.com/in/santco'}
            rel={'noreferrer'}
            target="_blank"
          >
            linkedin
          </a>
        </div>
        <div className={styles.footerColumn}>
          <p>Social</p>
          <a
            href={'https://twitter.com/__sanco'}
            rel={'noreferrer'}
            target="_blank"
          >
            twitter
          </a>
        </div>
      </div>
    </div>
  );
}
