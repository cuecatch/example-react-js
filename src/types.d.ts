import * as React from 'react';

interface CueCatchAttributes extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  src?: string|unknown
  class?: string;
  ref?: unknown;
  onchange?: unknown;
  onload?: unknown;
  cache?: 'memory' | 'localstorage';
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'cue-catch': CueCatchAttributes;
    }
  }
}