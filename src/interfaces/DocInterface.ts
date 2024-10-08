export interface OnThisPageProps {
  // sectionsRef: React.MutableRefObject<(HTMLElement | null)[]>;
  referenceLink: ReferenceLinkType[];
}

export interface TopicsType {
  name: string;
  route: string;
}

type ContentType = 'para' | 'bullet';

export interface ReferenceLinkType {
  name: string;
  link: string;
}

export interface ContentData {
  title: string;
  paragraphs: string[];
  referenceLink?: ReferenceLinkType;
  type?: ContentType;
}

interface CustomProps {
  contentData: ContentData;
}

export type ContentRendererProps = CustomProps &
  React.HTMLAttributes<HTMLElement>;
