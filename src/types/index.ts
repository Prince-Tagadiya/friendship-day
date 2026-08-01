export type VisitorName = 'Khushi' | 'Nisarg' | 'Rudra' | 'Prince' | 'unknown';
export type DeviceType = 'laptop' | 'mobile' | 'unknown-device';

export type AppStage =
  | 'loading'
  | 'hero'
  | 'opening'
  | 'letter'
  | 'unknown'
  | 'mobile-redirect'
  | 'secret-timer';

export interface Visitor {
  name: VisitorName;
  greeting: string;
  emoji: string;
  letterId: string;
  isAdmin: boolean;
}

export type ParagraphVariant =
  | 'normal'       // Regular paragraph
  | 'highlight'    // Rose gold color, slightly heavier
  | 'quote'        // Indented quote block with left border
  | 'center-bold'  // Centered, bold, accent color (for Hinglish punchlines)
  | 'separator'    // Visual divider line (text is ignored)
  | 'small';       // Smaller, muted — for P.S. / footnotes

export interface LetterParagraph {
  text: string;           // Supports **bold** markdown inline
  variant?: ParagraphVariant;
  topSpacing?: boolean;   // Extra margin above
}

export interface LetterContent {
  id: string;
  recipient: VisitorName;
  opening: string;        // "Dear Khushi," line
  lines: LetterParagraph[];
}

export interface AudioTrack {
  id: string;
  src: string;
  loop: boolean;
  volume: number;
}
