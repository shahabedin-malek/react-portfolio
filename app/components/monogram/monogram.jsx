import { forwardRef, useId } from 'react';

import { classes } from '~/utils/style';

import styles from './monogram.module.css';

/**
 * SM geometric monogram.
 *
 * True vector artwork recreated from the supplied
 * favicon-transparent-64.png. No raster image and no text glyphs
 * are used, so the mark remains sharp at any display size.
 *
 * The original Monogram component API and highlight behavior are
 * preserved so existing callers do not need to change.
 */
export const Monogram = forwardRef(
  ({ highlight, className, ...props }, ref) => {
    const id = useId();
    const clipId = `${id}monogram-clip`;

    return (
      <svg
        aria-hidden="true"
        className={classes(styles.monogram, className)}
        width="48pt"
        height="44.25pt"
        viewBox="0 0 64 59"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        ref={ref}
        {...props}
      >
        <defs>
          <clipPath id={clipId}>
            <path
              d="M 31.926 2.105 L 9.024 15.766 L 9.073 42.010 L 31.828 55.475 L 54.731 42.010 L 54.780 15.815 Z M 31.877 4.896 L 52.230 17.039 L 52.279 17.969 L 52.230 40.737 L 31.975 52.635 L 31.779 52.635 L 11.770 40.884 L 11.525 40.541 L 11.574 17.039 Z"
              fill="#ffffff"
              fillRule="evenodd"
              clipRule="evenodd"
            />
            <path d="M 30.210 10.233 L 15.056 19.291 L 15.056 26.097 L 27.611 33.490 L 27.611 42.402 L 27.120 42.304 L 17.753 36.869 L 17.704 34.568 L 15.105 33.099 L 15.056 38.387 L 30.161 47.249 L 30.210 32.022 L 17.704 24.628 L 17.704 20.613 L 27.366 14.885 L 27.611 14.983 L 27.611 20.809 L 30.210 19.144 Z" fill="#ffffff" />
            <path d="M 33.447 9.939 L 33.398 47.788 L 36.144 46.172 L 36.144 33.784 L 45.609 28.398 L 45.805 28.447 L 45.805 40.296 L 48.601 38.632 L 48.601 19.144 L 45.805 17.529 L 45.805 25.412 L 36.193 30.749 L 36.144 11.604 Z" fill="#ffffff" />
          </clipPath>
        </defs>

        <path
          d="M 31.926 2.105 L 9.024 15.766 L 9.073 42.010 L 31.828 55.475 L 54.731 42.010 L 54.780 15.815 Z M 31.877 4.896 L 52.230 17.039 L 52.279 17.969 L 52.230 40.737 L 31.975 52.635 L 31.779 52.635 L 11.770 40.884 L 11.525 40.541 L 11.574 17.039 Z"
          fill="#ffffff"
          fillRule="evenodd"
          clipRule="evenodd"
        />

        <path d="M 30.210 10.233 L 15.056 19.291 L 15.056 26.097 L 27.611 33.490 L 27.611 42.402 L 27.120 42.304 L 17.753 36.869 L 17.704 34.568 L 15.105 33.099 L 15.056 38.387 L 30.161 47.249 L 30.210 32.022 L 17.704 24.628 L 17.704 20.613 L 27.366 14.885 L 27.611 14.983 L 27.611 20.809 L 30.210 19.144 Z" fill="#ffffff" />

        <path d="M 33.447 9.939 L 33.398 47.788 L 36.144 46.172 L 36.144 33.784 L 45.609 28.398 L 45.805 28.447 L 45.805 40.296 L 48.601 38.632 L 48.601 19.144 L 45.805 17.529 L 45.805 25.412 L 36.193 30.749 L 36.144 11.604 Z" fill="#ffffff" />

        {highlight && (
          <g clipPath={`url(#${clipId})`}>
            <rect
              className={styles.highlight}
              width="100%"
              height="100%"
            />
          </g>
        )}
      </svg>
    );
  }
);

Monogram.displayName = 'Monogram';
