import React, { useRef } from 'react';
import ContentRenderer from '../../sharedComponent/ContentRenderer/ContentRenderer';
import OnThisPage from '../../components/OnThisPage/OnThisPage';
import { ContentData } from '../../interfaces/DocInterface';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  const contentData: ContentData[] = [
    {
      id: 'intro',
      title: 'Introduction:',
      paragraphs: [
        `In the ever-evolving landscape of web development, TypeScript and
            React have emerged as powerful tools that can significantly enhance
            the development process. TypeScript, a statically typed superset of
            JavaScript, introduces strong typing and modern features that help
            catch errors early and improve code maintainability. React, a
            popular JavaScript library for building user interfaces, enables
            developers to create dynamic and interactive web applications with
            ease.`,
        `This site aims to provide a comprehensive overview of essential
            concepts and best practices when using TypeScript with React.
            Whether you are a seasoned developer looking to refine your skills
            or a newcomer eager to learn, understanding the synergy between
            these technologies is crucial for building robust, scalable, and
            maintainable applications.`,
        `Join us as we delve into the key aspects of integrating TypeScript
            with React, exploring everything from fundamental principles to
            advanced techniques. Let's unlock the potential of these
            technologies and elevate your development workflow to new heights.`,
      ],
    },
    {
      id: 'react-js',
      title: 'What is React.js?',
      paragraphs: [
        `React.js, commonly referred to as React, is a powerful JavaScript
            library developed by Facebook for building user interfaces,
            particularly single-page applications where a seamless and dynamic
            user experience is essential. Since its release in 2013, React has
            gained immense popularity in the web development community due to
            its simplicity, flexibility, and performance.`,
      ],
      referenceLink: {
        name: 'React.js Docs',
        link: 'https://react.dev/learn',
      },
    },
    {
      id: 'typescript',
      title: 'What is TypeScript?',
      paragraphs: [
        `TypeScript is a statically typed superset of JavaScript developed
            and maintained by Microsoft. It builds upon JavaScript by adding
            optional static types, which can help developers catch errors early,
            enhance code quality, and improve overall development productivity.
            First released in 2012, TypeScript has become a popular choice for
            large-scale JavaScript applications due to its robust tooling and
            type system.`,
        `TypeScript complements JavaScript by adding robust typing and
          development features, making it a powerful tool for building
          high-quality, scalable applications. As we delve deeper into
          integrating TypeScript with React, you'll see how these technologies
          work together to create even more efficient and reliable code.`,
      ],
      referenceLink: {
        name: 'TypeScript Docs',
        link: 'https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html',
      },
    },
  ];

  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  return (
    <div className={styles.home}>
      <div className={styles.homeContent}>
        {contentData.map((content, idx) => (
          <ContentRenderer
            key={content.title + idx}
            contentData={content}
            ref={(el: HTMLElement) => (sectionsRef.current[idx] = el)}
          />
        ))}
      </div>
      <OnThisPage
        externalReferenceLink={contentData
          .map((data) => data.referenceLink)
          ?.filter((link) => !!link)}
        referenceLink={contentData
          ?.filter((val) => !!val.id)
          .map((data) => ({ link: `#${data.id}`, name: data.title }))}
      />
    </div>
  );
};

export default Home;
