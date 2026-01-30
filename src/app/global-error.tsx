'use client';

import { useEffect } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          backgroundColor: '#0a0c14',
          color: '#f8fafc',
          fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
        }}
      >
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              maxWidth: '28rem',
            }}
          >
            <div
              style={{
                marginBottom: '2rem',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '8rem',
                  height: '8rem',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <AlertTriangle
                  style={{
                    width: '4rem',
                    height: '4rem',
                    color: '#ef4444',
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <span
                style={{
                  fontSize: '4rem',
                  fontWeight: 'bold',
                  color: 'rgba(239, 68, 68, 0.2)',
                }}
              >
                500
              </span>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h1
                style={{
                  fontSize: '1.875rem',
                  fontWeight: 'bold',
                  marginBottom: '0.75rem',
                }}
              >
                Critical Error
              </h1>
              <p
                style={{
                  color: 'rgba(248, 250, 252, 0.6)',
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                }}
              >
                A critical error occurred in the application. Please try
                reloading the page.
              </p>
              {error.digest && (
                <p
                  style={{
                    color: 'rgba(248, 250, 252, 0.4)',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-geist-mono), monospace',
                    marginTop: '0.5rem',
                  }}
                >
                  Error ID: {error.digest}
                </p>
              )}
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                alignItems: 'center',
              }}
            >
              <button
                onClick={reset}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#c2410c',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = '#9a3412')
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = '#c2410c')
                }
              >
                <RefreshCcw style={{ width: '1rem', height: '1rem' }} />
                Try Again
              </button>
              <a
                href="/"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'transparent',
                  color: '#f8fafc',
                  border: '1px solid rgba(248, 250, 252, 0.2)',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s',
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.borderColor = 'rgba(248, 250, 252, 0.4)')
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.borderColor = 'rgba(248, 250, 252, 0.2)')
                }
              >
                <Home style={{ width: '1rem', height: '1rem' }} />
                Go to Home
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
