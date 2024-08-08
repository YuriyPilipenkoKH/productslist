'use client'
import styled from '@emotion/styled'
import isPropValid from '@emotion/is-prop-valid';
import { css } from '@emotion/react';

interface PicWrapperProps {
    imgUrl: string;
}

const PicWrapperStyles = css`
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border-radius: 5px;
`


export const PicWrapper = styled("div", {
    shouldForwardProp: (prop: string) =>
      isPropValid(prop) && !["imgUrl"].includes(prop),
    })<PicWrapperProps>(
        ({ imgUrl }) => css`
					background-image: ${imgUrl ? `url(${imgUrl})` : 'none'};
					background-size: cover ;
					background-position: center;
					${PicWrapperStyles}
        `
    );
