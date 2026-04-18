import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { OrderProvider } from './context/OrderContext.tsx';
import './index.css';

{
  const base = import.meta.env.BASE_URL;
  const href = base === '/' ? '/favicon.svg' : `${base.replace(/\/?$/, '/')}favicon.svg`;
  let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/svg+xml';
    document.head.appendChild(link);
  }
  link.href = href;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <OrderProvider>
      <App />
    </OrderProvider>
  </StrictMode>,
);
