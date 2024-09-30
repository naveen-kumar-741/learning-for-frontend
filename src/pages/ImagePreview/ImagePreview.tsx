import React, { ChangeEvent, useContext, useRef, useState } from "react";
import ContentRenderer, {
  ContentData,
} from "../../sharedComponent/ContentRenderer";
import OnThisPage from "../../components/OnThisPage/OnThisPage";
import { CodeBlock, obsidian } from "react-code-blocks";
import { sidebarContext } from "../../providers/AppProvider";
import styles from "./ImagePreview.module.scss";

const ImagePreview: React.FC = () => {
  const contentData: ContentData[] = [
    {
      title: "What This Page is About",
      paragraphs: [
        `Welcome to the Image Preview Demo! This page is dedicated to exploring a
      powerful technique that allows you to display image previews directly in
      your web application without needing to upload the image to remote storage
      solutions like S3.`,
        `In an era where user experience is paramount, being able to show a preview
      of an image before it’s uploaded can make a significant difference.
      Whether you're developing a file upload component, a photo editor, or a
      form where users need to attach images, this feature enhances usability,
      speeds up workflows, and maintains user engagement.`,
      ],
      referenceLink: {
        name: "What is data URL?",
        link: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs",
      },
    },
    {
      title: "Key Concepts Covered",
      type: "bullet",
      paragraphs: [
        `**Client-Side Image Preview:** Discover how to use client-side technologies to
        generate and display image previews instantly. This method leverages
        browser capabilities to render images before any upload, ensuring users
        can see their image in real-time without the need for server-side
        processing or storage.`,
        `**FileReader API:** Learn how to utilize the FileReader API to read image
        files selected by users. We’ll guide you through the process of converting
        these files into data URLs, which can be used as sources for image
        previews. This technique allows for immediate feedback on image selection,
        enhancing user experience.`,
        `**Enhanced User Experience**: See how client-side previews improve user
        interaction by providing instant visual feedback. This approach not only
        speeds up the process of reviewing images but also ensures a smoother and
        more intuitive user experience.`,
        `**Performance and Privacy Benefits**: Explore the performance benefits of
        keeping image handling within the client’s browser. By avoiding the need
        for server-side uploads, you reduce server load and latency. Additionally,
        this method enhances privacy by ensuring that image data remains local
        until a user decides to proceed with an upload.`,
        `**Best Practices and Pitfalls**: Gain insights into best practices for
        implementing image previews, including handling various file types and
        sizes. We’ll also cover common pitfalls and how to avoid them to ensure a
        seamless experience for all users.`,
        `**Practical Implementation**: Dive into practical examples and code snippets
        that demonstrate how to integrate image previews into your applications.
        These examples will guide you through the steps necessary to create a
        responsive and user-friendly image preview feature.`,
      ],
      referenceLink: {
        name: "What is FileReader?",
        link: "https://developer.mozilla.org/en-US/docs/Web/API/FileReader",
      },
    },
    {
      title: "",
      paragraphs: [
        `By the end of this page, you’ll have a comprehensive understanding of how
      to effectively implement image previews without relying on external
      storage solutions. This technique not only streamlines the image upload
      process but also provides a more responsive and privacy-conscious solution
      for handling user images in your web applications.`,
      ],
    },
  ];

  const code = `const [fileUrl, setFileUrl] = useState<string>();
const handleFilePreview = (fileData: ChangeEvent<HTMLInputElement>) => {
  if (fileData.target.files?.[0]) {
    const reader = new FileReader();
    reader.onload = () => {
      setFileUrl(reader.result as string);
    };
    reader.readAsDataURL(fileData.target.files?.[0]);
  }
};
return(
  <React.Fragment>
    <input
      type="file"
      accept=".png,.jpg,.jpeg"
      onChange={handleFilePreview}
      className={styles.demoFileSelector}
    />
    {fileUrl ? (
      <img src={fileUrl} className={styles.demoImagePreview} />
    ) : (
      <div className={styles.previewPlaceHolder}>Preview</div>
    )}
  </React.Fragment>
)`;

  const { isExpand } = useContext(sidebarContext);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const [fileUrl, setFileUrl] = useState<string>();

  const handleFilePreview = (fileData: ChangeEvent<HTMLInputElement>) => {
    if (fileData.target.files?.[0]) {
      console.log(fileData.target.files?.[0]);
      const reader = new FileReader();
      reader.onload = () => {
        setFileUrl(reader.result as string);
      };
      reader.readAsDataURL(fileData.target.files?.[0]);
    }
  };

  return (
    <div className={styles.imagePreviewDemo}>
      {contentData.map((content, idx) => (
        <ContentRenderer
          key={content.title + idx}
          contentData={content}
          ref={(el: HTMLElement) => (sectionsRef.current[idx] = el)}
        />
      ))}
      <div className={styles.contentRendererTitle}>Code Snippet</div>
      <div
        className={`${styles.imagePreviewDemoSection} ${
          isExpand ? "flex-column" : "flex-row"
        }`}
      >
        <div
          className={`${styles.demoCodeBlock} ${isExpand ? "w-100" : "w-50"}`}
        >
          <CodeBlock
            text={code}
            language={"jsx"}
            theme={obsidian}
            showLineNumbers={false}
          />
          <span>Demo button:-</span>
          <div className={styles.demoUploadButtonBlock}>
            <label htmlFor="fileUpload" className={styles.demoUploadButton}>
              Select File
            </label>
            <input
              id="fileUpload"
              type="file"
              accept=".png,.jpg,.jpeg"
              onChange={handleFilePreview}
              className={styles.demoFileSelector}
            />
          </div>
        </div>
        <div
          className={`${styles.demoPreviewBlock} ${
            isExpand ? "w-100" : "w-50"
          }`}
        >
          <span>Preview for the selected Image</span>
          {fileUrl ? (
            <img
              src={fileUrl}
              className={styles.demoImagePreview}
              alt="Preview"
            />
          ) : (
            <div className={styles.previewPlaceHolder}>No file selected</div>
          )}
        </div>
      </div>
      <OnThisPage
        referenceLink={contentData
          .map((data) => data.referenceLink)
          ?.filter((link) => !!link)}
      />
    </div>
  );
};

export default ImagePreview;
