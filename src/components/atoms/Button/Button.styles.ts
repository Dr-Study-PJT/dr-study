// import styled from 'styled-components';
// import { variant, space, layout, color } from 'styled-system';
// import { ButtonProps } from './Button.types';

// const buttonVariants = {
//   contained: {
//     bg: 'primary.nmai',
//     color: 'primary.contrastText',
//     '&:hover': {
//       bg: 'primary.hover',
//     },
//     '&:active': {
//       bg: 'primary.active',
//     },
//     '&:disabled': {
//       bg: 'primary.disabled',
//     },
//   },
//   outlined: {
//     bg: 'transparent',
//     color: 'primary.main',
//     border: '1px solid',
//     borderColor: 'primary.main',
//     '&:hover': {
//       borderColor: 'primary.hover',
//       color: 'primary.hover',
//     },
//     '&:active': {
//       borderColor: 'primary.active',
//       color: 'primary.active',
//     },
//     '&:disabled': {
//       borderColor: 'primary.disabled',
//       color: 'primary.disabled',
//     },
//   },
//   text: {
//     bg: 'transparent',
//     color: 'primary.main',
//     '&:hover': {
//       bg: 'primary.hover',
//       color: 'primary.contrastText',
//     },
//     '&:active': {
//       bg: 'primary.active',
//       color: 'primary.contrastText',
//     },
//     '&:disabled': {
//       color: 'primary.disabled',
//     },
//   },
// };

// export const BasicButton = styled('button')<ButtonProps>(
//   {
//     boxSizing: 'border-box',
//     borderRadius: '4px',
//     fontSize: '1rem',
//     fontWeight: '500',
//     transition: 'all 100ms ease',
//     userSelect: 'none',
//     cursor: 'pointer',
//     '&:disabled': {
//       cursor: 'default',
//     },
//   },
//   space,
//   layout,
//   color,
//   variant({ variants: buttonVariants }),
//   (props) => props.fullwidth !== 'false' && { width: '100%' },
// );
