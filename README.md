# ProgressUI-Module

The `ProgressUI` module is a lightweight, customizable progress indicator for web applications. It provides a simple and flexible way to display progress updates, status messages, and completion percentages in a visually appealing manner. The module supports both light and dark themes, custom colors, and various positioning options.

## Installation

To use the `ProgressUI` module, simply import it into your project:

```javascript
import { ProgressUI } from './path-to-module';
```

## Usage

### Basic Usage

Create a new instance of `ProgressUI` and update it with a message and progress percentage:

```javascript
const progress = new ProgressUI();
progress.update('Loading...', 50);
```

### Quick Display

For a quick progress display that automatically disappears after a set duration:

```javascript
ProgressUI.showQuick('Task completed!', { percent: 100, duration: 2000 });
```

### Configuration

You can customize the appearance and behavior of the progress indicator by passing a configuration object:

```javascript
const progress = new ProgressUI({
  position: 'bottom-right',
  theme: 'dark',
  title: 'Processing',
  closable: false,
  width: '400px',
  duration: 5000,
});
```

### Updating Progress

Update the progress indicator with a new message and percentage:

```javascript
progress.update('Almost there...', 75);
```

### Removing the Indicator

Remove the progress indicator manually:

```javascript
progress.remove();
```

Or schedule it to be removed after a delay:

```javascript
progress.scheduleCleanup(3000); // Removes after 3 seconds
```

## Configuration Options

The `ProgressUIConfig` interface allows you to customize the progress indicator:

- `position`: Position of the progress indicator. Options: `'top-left'`, `'top-right'`, `'top-center'`, `'bottom-left'`, `'bottom-right'`, `'bottom-center'`, `'center'`. Default: `'top-right'`.
- `width`: Width of the progress indicator. Default: `'300px'`.
- `theme`: Theme of the progress indicator. Options: `'light'`, `'dark'`, `'custom'`. Default: `'light'`.
- `title`: Optional title displayed above the progress bar.
- `closable`: Whether the progress indicator can be closed by the user. Default: `true`.
- `colors`: Custom colors for the progress indicator. Overrides the theme colors.
- `duration`: Duration in milliseconds before the progress indicator automatically disappears. Default: `3000`.

## Methods

- `update(message?: string, percent?: number): boolean`: Updates the progress indicator with a new message and percentage. Returns `true` if the update was successful.
- `scheduleCleanup(delay?: number, fade?: boolean): void`: Schedules the progress indicator to be removed after a delay.
- `remove(fade?: boolean): void`: Removes the progress indicator immediately or with a fade effect.
- `get isMounted(): boolean`: Returns `true` if the progress indicator is currently mounted in the DOM.

## Static Methods

- `showQuick(message: string, config?: ProgressUIConfig & { percent?: number }): ProgressUI`: Displays a quick progress indicator that automatically disappears after the specified duration.

## Themes

The module includes two built-in themes: `light` and `dark`. You can also create a custom theme by specifying custom colors in the `colors` configuration option.

### Default Theme Colors

- **Light Theme**:

  - Background: `#f8f8f8`
  - Text: `#333333`
  - Border: `#e0e0e0`
  - Progress Background: `#e0e0e0`
  - Progress Fill: `#4CAF50`
  - Shadow: `rgba(0,0,0,0.2)`

- **Dark Theme**:
  - Background: `#2a2a2a`
  - Text: `#ffffff`
  - Border: `#444444`
  - Progress Background: `#444444`
  - Progress Fill: `#4CAF50`
  - Shadow: `rgba(0,0,0,0.5)`

## Example

```javascript
import { ProgressUI } from './path-to-module';

// Create a new progress indicator
const progress = new ProgressUI({
  position: 'bottom-right',
  theme: 'dark',
  title: 'Uploading Files',
  closable: true,
  width: '400px',
});

// Update progress
progress.update('Uploading file 1 of 3...', 33);

// Schedule removal after 5 seconds
progress.scheduleCleanup(5000);

// Or remove manually
setTimeout(() => progress.remove(), 3000);
```

This is a userscript initiated from [@violentmonkey/generator-userscript](https://github.com/violentmonkey/generator-userscript).

## Development

```sh
# Compile and watch
$ npm run dev

# Build script
$ npm run build

# Lint
$ npm run lint
```
