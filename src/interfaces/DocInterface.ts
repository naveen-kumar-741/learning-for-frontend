export interface OnThisPageProps {
  // sectionsRef: React.MutableRefObject<(HTMLElement | null)[]>;
  referenceLink: ReferenceLinkType[];
  externalReferenceLink: ReferenceLinkType[];
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
  id?: string;
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
