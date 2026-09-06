import profileImgLarge from '~/assets/profile-large.jpg';
import profileImgPlaceholder from '~/assets/profile-placeholder.jpg';
import profileImg from '~/assets/profile.jpg';
import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Image } from '~/components/image';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { Fragment, useState } from 'react';
import { media } from '~/utils/style';
import { sitePath } from '~/utils/site';
import katakana from './katakana.svg';
import styles from './profile.module.css';

const ProfileText = ({ visible, titleId }) => ( <Fragment> <Heading className={styles.title} data-visible={visible} level={3} id={titleId}> <DecoderText text="About me" start={visible} delay={500} /> </Heading>

<Text className={styles.description} data-visible={visible} size="l" as="p">
  I’m Shahabedin, a Full Stack Developer with a background in WordPress
  development and IT support. Over the past 10+ years, I’ve built,
  optimized, and maintained websites and IT systems while helping
  businesses solve technical challenges through practical solutions.
</Text>

<Text className={styles.description} data-visible={visible} size="l" as="p">
  My experience includes WordPress development, hosting management,
  website migrations, DNS and domain configuration, performance
  optimization, and technical troubleshooting. Recently, I expanded my
  expertise by earning the IBM Full Stack Software Developer certification
  and continue exploring modern web technologies and AI-assisted
  development workflows.
</Text>

<Text className={styles.description} data-visible={visible} size="l" as="p">
  I enjoy learning new technologies, building useful digital experiences,
  and turning complex problems into simple solutions. I’m always open to
  discussing new opportunities, collaborations, and exciting projects.
</Text>

  </Fragment>
);


export const Profile = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.profile}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={0}>
        {({ visible, nodeRef }) => (
          <div className={styles.content} ref={nodeRef}>
            <div className={styles.column}>
              <ProfileText visible={visible} titleId={titleId} />
              <Button
                secondary
                className={styles.button}
                data-visible={visible}
                href={sitePath('/contact')}
                icon="send"
              >
                Send me a message
              </Button>
            </div>
            <div className={styles.column}>
              <div className={styles.tag} aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={!visible}
                  collapseDelay={1000}
                />
                <div className={styles.tagText} data-visible={visible}>
                  About me
                </div>
              </div>
              <div className={styles.image}>
                <Image
                  reveal
                  delay={100}
                  placeholder={profileImgPlaceholder}
                  srcSet={`${profileImg} 480w, ${profileImgLarge} 960w`}
                  width={960}
                  height={1280}
                  sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                  alt="Me smiling like a goofball at the Qwilr office in Sydney"
                />
                <svg className={styles.svg} data-visible={visible} viewBox="0 0 136 766">
                  <use href={`${katakana}#katakana-profile`} />
                </svg>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};
