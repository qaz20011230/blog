import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './App';
import './index.css';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github.css';

export const createRoot = ViteReactSSG({ routes });
