export interface UIThemeColors {
  background: string;
  text: string;
  border: string;
  progressBg: string;
  progressFill: string;
  shadow: string;
}

export interface UIElementSet {
  container: HTMLDivElement;
  status: HTMLDivElement;
  progressBar: HTMLDivElement;
  percentText: HTMLDivElement;
}

export interface ProgressUIConfig {
  position?:
    | 'top-right'
    | 'top-left'
    | 'top-center'
    | 'bottom-left'
    | 'bottom-right'
    | 'bottom-center'
    | 'center';
  width?: string;
  theme?: 'light' | 'dark' | 'custom';
  title?: string;
  closable?: boolean;
  colors?: Partial<UIThemeColors>;
  duration?: number;
}
