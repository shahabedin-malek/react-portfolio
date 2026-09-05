import usesBackgroundPlaceholder from '~/assets/uses-background-placeholder.jpg';
import usesBackground from '~/assets/uses-background.mp4';
import { Footer } from '~/components/footer';
import { Link } from '~/components/link';
import { List, ListItem } from '~/components/list';
import { Table, TableBody, TableCell, TableHeadCell, TableRow } from '~/components/table';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectSection,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from '~/layouts/project';
import { baseMeta } from '~/utils/meta';
import styles from './uses.module.css';

export const meta = () => {
  return baseMeta({
    title: 'Uses',
    description: 'A list of hardware and software I use to do my thing',
  });
};

export const Uses = () => {
  return (
    <>
<ProjectContainer className={styles.uses}>
  <ProjectBackground
    src={usesBackground}
    placeholder={usesBackgroundPlaceholder}
    opacity={0.7}
  />

<ProjectHeader
 title="Uses"
 description="A collection of the tools, technologies, and workflows I use to build websites, solve technical challenges, and continue growing as a Full Stack Developer."
/>

  <ProjectSection padding="none" className={styles.section}>
    <ProjectSectionContent>
      <ProjectTextRow width="m">
        <ProjectSectionHeading>Design</ProjectSectionHeading>

    <ProjectSectionText as="div">
      <List>
        <ListItem>
          <Link href="https://figma.com/@shahabedinmalek">
            Figma
          </Link>{' '}
          is my primary tool for wireframing, UI exploration, and planning
          interfaces for web projects.
        </ListItem>

        <ListItem>
          I use Canva and lightweight design tools when preparing visuals,
          presentations, and content for websites and social media.
        </ListItem>

        <ListItem>
          As I continue my Full Stack journey, I’m actively improving my
          understanding of design principles to create better user
          experiences.
        </ListItem>
      </List>
    </ProjectSectionText>
  </ProjectTextRow>
</ProjectSectionContent>

  </ProjectSection>

  <ProjectSection padding="none" className={styles.section}>
    <ProjectSectionContent>
      <ProjectTextRow width="m">
        <ProjectSectionHeading>Development</ProjectSectionHeading>

    <ProjectSectionText as="div">
      <List>
        <ListItem>
          I use Visual Studio Code as my primary editor for WordPress,
          JavaScript, React, and Full Stack projects.
        </ListItem>

        <ListItem>
          Firefox is my preferred browser for development, debugging, and
          daily use.
        </ListItem>

        <ListItem>
          <Link href="https://react.dev/">React</Link> has become my
          preferred front-end library as I continue building modern web
          applications.
        </ListItem>

        <ListItem>
          Git and GitHub are essential parts of my workflow for version
          control, collaboration, and maintaining project history.
        </ListItem>

        <ListItem>
          I regularly work with Cloudflare, cPanel, DNS management, SSL
          certificates, hosting environments, website migrations, and
          technical troubleshooting.
        </ListItem>

        <ListItem>
          AI-assisted development tools help me learn faster, prototype
          ideas, and solve technical challenges more efficiently.
        </ListItem>
      </List>
    </ProjectSectionText>
  </ProjectTextRow>
</ProjectSectionContent>

  </ProjectSection>

  <ProjectSection padding="none" className={styles.section}>
    <ProjectSectionContent>
      <ProjectTextRow stretch width="m">
        <ProjectSectionHeading>System</ProjectSectionHeading>

    <Table>
      <TableBody>
        <TableRow>
          <TableHeadCell>Operating System</TableHeadCell>
          <TableCell>Windows 10</TableCell>
        </TableRow>

        <TableRow>
          <TableHeadCell>Code Editor</TableHeadCell>
          <TableCell>Visual Studio Code</TableCell>
        </TableRow>

        <TableRow>
          <TableHeadCell>Browser</TableHeadCell>
          <TableCell>Firefox</TableCell>
        </TableRow>

        <TableRow>
          <TableHeadCell>Version Control</TableHeadCell>
          <TableCell>Git & GitHub</TableCell>
        </TableRow>

        <TableRow>
          <TableHeadCell>Hosting Tools</TableHeadCell>
          <TableCell>
            Cloudflare, cPanel, GoDaddy, HostGator, Bluehost
          </TableCell>
        </TableRow>

        <TableRow>
          <TableHeadCell>Development Focus</TableHeadCell>
          <TableCell>
            WordPress, React, Full Stack Development
          </TableCell>
        </TableRow>

        <TableRow>
          <TableHeadCell>Certification</TableHeadCell>
          <TableCell>
            IBM Full Stack Software Developer
          </TableCell>
        </TableRow>

        <TableRow>
          <TableHeadCell>Workflow</TableHeadCell>
          <TableCell>
            AI-Assisted Development & Technical Problem Solving
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </ProjectTextRow>
</ProjectSectionContent>

  </ProjectSection>
</ProjectContainer>

      <Footer />
    </>
  );
};
