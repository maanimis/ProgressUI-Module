import { ProgressUIConfig, UIElementSet, UIThemeColors } from '../interfaces';

const DEFAULT_THEMES: Record<'light' | 'dark', UIThemeColors> = {
  light: {
    background: '#f8f8f8',
    text: '#333333',
    border: '#e0e0e0',
    progressBg: '#e0e0e0',
    progressFill: '#4CAF50',
    shadow: 'rgba(0,0,0,0.2)',
  },
  dark: {
    background: '#2a2a2a',
    text: '#ffffff',
    border: '#444444',
    progressBg: '#444444',
    progressFill: '#4CAF50',
    shadow: 'rgba(0,0,0,0.5)',
  },
};

class ProgressUI {
  private readonly elements: UIElementSet;
  private readonly config: Required<ProgressUIConfig>;
  private removalTimeout?: number;

  constructor(config: ProgressUIConfig = {}) {
    this.config = this.validateConfig(config);
    this.elements = this.createUIElements();
    this.applyStyles();
    this.attachToDOM();
  }

  public update(message?: string, percent?: number): boolean {
    if (!this.isMounted) return false;

    if (message) {
      this.elements.status.textContent = message;
    }

    if (typeof percent === 'number') {
      const clamped = Math.max(0, Math.min(100, percent));
      this.elements.progressBar.style.width = `${clamped}%`;
      this.elements.percentText.textContent = `${Math.round(clamped)}%`;
    }

    return true;
  }

  public scheduleCleanup(delay: number = 3000, fade: boolean = true): void {
    window.clearTimeout(this.removalTimeout);
    this.removalTimeout = window.setTimeout(() => this.remove(fade), delay);
  }

  public remove(fade: boolean = true): void {
    if (!this.isMounted) return;

    if (fade) {
      this.elements.container.style.opacity = '0';
      window.setTimeout(() => this.detachFromDOM(), 300);
    } else {
      this.detachFromDOM();
    }
  }

  public get isMounted(): boolean {
    return document.body.contains(this.elements.container);
  }

  public static showQuick(
    message: string,
    config: ProgressUIConfig & { percent?: number } = {},
  ): ProgressUI {
    const instance = new ProgressUI({
      ...config,
      closable: config.closable ?? false,
      duration: config.duration ?? 3000,
    });

    instance.update(message, config.percent ?? 100);
    instance.scheduleCleanup(config.duration, true);
    return instance;
  }

  private validateConfig(config: ProgressUIConfig): Required<ProgressUIConfig> {
    return {
      position: config.position ?? 'top-right',
      width: config.width ?? '300px',
      theme: config.theme ?? 'light',
      title: config.title ?? '',
      closable: config.closable ?? true,
      colors: config.colors ?? {},
      duration: config.duration ?? 3000,
    };
  }

  private createUIElements(): UIElementSet {
    const container = document.createElement('div');
    const status = document.createElement('div');
    const progressBar = document.createElement('div');
    const percentText = document.createElement('div');
    const progressBarContainer = document.createElement('div');

    // Set up the DOM structure
    progressBarContainer.appendChild(progressBar);
    container.appendChild(status);
    container.appendChild(progressBarContainer);
    container.appendChild(percentText);

    // Add classes for easier styling (optional)
    container.classList.add('progress-ui-container');
    status.classList.add('progress-ui-status');
    progressBarContainer.classList.add('progress-ui-bar-container');
    progressBar.classList.add('progress-ui-bar');
    percentText.classList.add('progress-ui-percent');

    return { container, status, progressBar, percentText };
  }

  private applyStyles(): void {
    const colors = this.getThemeColors();

    // Container styles
    Object.assign(this.elements.container.style, {
      position: 'fixed',
      zIndex: '9999',
      ...this.getPositionStyles(),
      backgroundColor: colors.background,
      color: colors.text,
      padding: '15px',
      borderRadius: '5px',
      boxShadow: `0 0 10px ${colors.shadow}`,
      width: this.config.width,
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      transition: 'opacity 0.3s ease',
    });

    // Status element
    Object.assign(this.elements.status.style, {
      marginBottom: '10px',
      fontSize: '14px',
      fontWeight: '500',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    });

    // Progress bar container
    Object.assign(this.elements.progressBar.parentElement!.style, {
      width: '100%',
      backgroundColor: colors.progressBg,
      borderRadius: '4px',
      height: '10px',
      overflow: 'hidden',
    });

    // Progress bar
    Object.assign(this.elements.progressBar.style, {
      height: '100%',
      width: '0%',
      backgroundColor: colors.progressFill,
      transition: 'width 0.3s',
    });

    // Percentage text
    Object.assign(this.elements.percentText.style, {
      textAlign: 'right',
      marginTop: '5px',
      fontSize: '12px',
      fontWeight: '600',
    });

    this.addOptionalElements();
  }

  private getPositionStyles(): Record<string, string> {
    const positionStyles: Record<string, string> = {};

    switch (this.config.position) {
      case 'top-left':
        positionStyles.top = '20px';
        positionStyles.left = '20px';
        break;
      case 'top-center':
        positionStyles.top = '20px';
        positionStyles.left = '50%';
        positionStyles.transform = 'translateX(-50%)';
        break;
      case 'bottom-left':
        positionStyles.bottom = '20px';
        positionStyles.left = '20px';
        break;
      case 'bottom-right':
        positionStyles.bottom = '20px';
        positionStyles.right = '20px';
        break;
      case 'bottom-center':
        positionStyles.bottom = '20px';
        positionStyles.left = '50%';
        positionStyles.transform = 'translateX(-50%)';
        break;
      case 'center':
        positionStyles.top = '50%';
        positionStyles.left = '50%';
        positionStyles.transform = 'translate(-50%, -50%)';
        break;
      default: // top-right
        positionStyles.top = '20px';
        positionStyles.right = '20px';
    }

    return positionStyles;
  }

  private getThemeColors(): UIThemeColors {
    const baseTheme =
      this.config.theme === 'custom'
        ? DEFAULT_THEMES.light
        : DEFAULT_THEMES[this.config.theme];

    return { ...baseTheme, ...this.config.colors };
  }

  private addOptionalElements(): void {
    if (this.config.title) {
      const title = document.createElement('div');
      title.textContent = this.config.title;
      Object.assign(title.style, {
        marginBottom: '10px',
        fontSize: '16px',
        fontWeight: 'bold',
        paddingRight: '15px',
      });
      this.elements.container.prepend(title);
    }

    if (this.config.closable) {
      const closeButton = document.createElement('div');
      closeButton.innerHTML = '×';
      Object.assign(closeButton.style, {
        position: 'absolute',
        top: '5px',
        right: '8px',
        fontSize: '18px',
        fontWeight: 'bold',
        cursor: 'pointer',
        opacity: '0.6',
      });
      closeButton.addEventListener('click', () => this.remove());
      this.elements.container.appendChild(closeButton);
    }
  }

  private attachToDOM(): void {
    document
      .querySelectorAll('.progress-ui-container')
      .forEach((el) => el.remove());
    document.body.appendChild(this.elements.container);
  }

  private detachFromDOM(): void {
    if (this.isMounted) {
      document.body.removeChild(this.elements.container);
    }
  }
}

const globalContext = window;
globalContext.ProgressUI = ProgressUI;

export { ProgressUI };

// const globalContext =
//   typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;
