import React, { useRef } from 'react';
import OnThisPage from '../../components/OnThisPage/OnThisPage';
import { CodeBlock, obsidian } from 'react-code-blocks';
import { Link } from 'react-router-dom';
import { ContentData } from '../../interfaces/DocInterface';
import ContentRenderer from '../../sharedComponent/ContentRenderer/ContentRenderer';
import styles from './MaintainingContextComponent.module.scss';

const MaintainingContextComponent: React.FC = () => {
  const contentData: ContentData[] = [
    {
      title: 'What This Page is About',
      paragraphs: [
        `This page explains the best practices for maintaining context in a React
      application when navigating between different parts of your app.
      Specifically, it focuses on the differences between using the **Link**
      component from **react-router-dom** and the traditional **<a>** tag for navigation.`,
        `You'll learn why **Link** is preferred for internal routing in React
      applications, as it helps preserve the app's state and context without
      causing a full page reload. In contrast, the **<a>** tag, though familiar,
      triggers a complete page refresh, which can result in losing the current
      state and negatively impacting the user experience.`,
        `This guide will also cover the use of **useNavigate**, a powerful hook from
      **react-router-dom** that provides programmatic navigation while preserving
      context, making it easier to manage user interactions and navigation
      flows.`,
        `By the end of this page, you should have a clear understanding of when to
      use **Link**, useNavigate, or the traditional **<a>** tag in your React projects.`,
      ],
      referenceLink: {
        name: 'Link from react-router-dom docs',
        link: 'https://reactrouter.com/en/main/components/link',
      },
    },
    {
      title: 'Difference between <a> tag and Link from react-router-dom',
      paragraphs: [],
    },
    {
      title: '<a> Tag:',
      type: 'bullet',
      paragraphs: [
        `**Page Reload:** When you click on an **<a>** tag, the browser performs a full page
      reload, which means the entire page is requested from the server. This can
      cause the loss of any in-memory state, such as form inputs, animations, or
      data loaded via client-side APIs.
        `,
        `**Browser Default Behavior:** The **<a>** tag follows the default browser behavior for
      navigating between pages. It works well for linking to external sites or
      pages not managed by React.`,
        `**SEO:** The **<a>** tag is recognized by search engines and can be useful for linking
      to external content or for cases where you need the SEO benefits of a
      standard hyperlink.`,
      ],
      referenceLink: {
        name: 'anchor tag docs',
        link: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a',
      },
    },
    {
      title: 'Link Component from react-router-dom:',
      type: 'bullet',
      paragraphs: [
        `**Client-Side Navigation:** The **Link** component enables navigation without a
      full page reload. It leverages React’s routing capabilities to change the
      URL and render the appropriate component, all while keeping the current
      state and context intact.`,
        `**Maintains State:** Because **Link** does not trigger a full reload, it preserves
      the in-memory state of your application, which is crucial for a smooth
      user experience.`,
        `**Single Page Application (SPA):** **Link** is ideal for navigation within a React
      SPA, where the goal is to keep the application as responsive and fast as
      possible without unnecessary server requests.`,
        `**Programmatic Control:** With **Link**, you can more easily integrate navigation
      logic with other parts of your React code, such as conditionally rendering
      links based on state or props.`,
      ],
    },
    {
      title: 'When to Use Each:',
      type: 'bullet',
      paragraphs: [
        `**Use <a> tag:** When linking to external sites or resources outside the scope of
      your React application, where a full page load is acceptable or desired.`,
        `**Use Link:** When navigating within your React application, to ensure a
      seamless user experience with maintained context and state.`,
      ],
    },
    {
      title: '',
      paragraphs: [
        `In summary, while the <a> tag is suitable for traditional web navigation, Link
      is tailored for modern React applications, ensuring smooth client-side
      transitions and preserving the application's state and context.`,
      ],
    },
    {
      title: 'For Example :-',
      paragraphs: [],
    },
  ];
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  const code = [
    `<a href="/home">Link by anchor tag</a>`,
    `<Link to={"/home"}>Link</Link>`,
  ];

  return (
    <div className={styles.contextMaintainingDemo}>
      {contentData.map((content, idx) => (
        <ContentRenderer
          key={content.title + idx}
          contentData={content}
          ref={(el: HTMLElement) => (sectionsRef.current[idx] = el)}
        />
      ))}
      <div className={styles.demoCodeBlock}>
        <p>Example of link using Link Tag from react-router-dom</p>
        <p>{`Example of link using <a> Tag`}</p>
        <CodeBlock
          text={code[1]}
          language={'jsx'}
          theme={obsidian}
          showLineNumbers={false}
        />
        <CodeBlock
          text={code[0]}
          language={'jsx'}
          theme={obsidian}
          showLineNumbers={false}
        />
        <Link to={'/home'}>Link to home</Link>
        <a href="/home">Link by anchor tag</a>
        <p>
          NOTE: After redirecting to the home page, select the "Maintaining
          Context" option from the sidebar. You'll notice that the page
          preserves your previous position, allowing you to resume exactly where
          you left off.
        </p>
        <p>
          NOTE: After redirecting to the home page, you'll notice that the
          sidebar automatically closes. This occurs because the global context
          controlling the sidebar's state is reset.
        </p>
      </div>
      <p>
        As shown in the example above, using an anchor <b>{`(<a>)`}</b> tag
        refreshes the entire page and resets the context during a redirect. In
        contrast, <b>Link</b> from react-router-dom avoids a full page refresh
        and preserves the context.
      </p>
      <OnThisPage
        referenceLink={contentData
          .map((data) => data.referenceLink)
          ?.filter((link) => !!link)}
      />
    </div>
  );
};

export default MaintainingContextComponent;
