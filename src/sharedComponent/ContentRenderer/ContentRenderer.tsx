import React, { ForwardedRef } from 'react';
import Markdown from 'react-markdown';
import { ContentRendererProps } from '../../interfaces/DocInterface';
import styles from './ContentRenderer.module.scss';

const ContentRenderer = React.forwardRef<HTMLElement, ContentRendererProps>(
  ({ contentData, ...rest }, ref: ForwardedRef<HTMLElement>) => {
    const type = contentData.type || 'para';
    return (
      <section
        className={styles.contentRendererSection}
        id={contentData.id}
        ref={ref}
        {...rest}
      >
        <div className={styles.contentRendererTitle}>{contentData.title}</div>
        {type === 'para' ? (
          <div className={styles.contentRendererPara}>
            {contentData.paragraphs.map((para, idx) => (
              <p key={idx}>
                <Markdown
                  components={{
                    p: ({ node, ...props }) => <span {...props} />,
                  }}
                >
                  {para}
                </Markdown>
              </p>
            ))}
          </div>
        ) : (
          <div className={styles.contentRendererBullets}>
            <ul>
              {contentData.paragraphs.map((bullets, idx) => {
                return (
                  <li key={idx}>
                    <Markdown
                      components={{
                        p: ({ node, ...props }) => <span {...props} />,
                      }}
                    >
                      {bullets}
                    </Markdown>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </section>
    );
  }
);

export default ContentRenderer;
