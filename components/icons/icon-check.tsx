import { IconCheckProps } from '@lib/types';

export default function IconCheck({ color, size }: IconCheckProps) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size}>
      <g fill={color || '#111111'}>
        <path
          fill={color || '#111111'}
          d="M8,0C3.6,0,0,3.6,0,8s3.6,8,8,8s8-3.6,8-8S12.4,0,8,0z M7,11.4L3.6,8L5,6.6l2,2l4-4L12.4,6L7,11.4z"
        />
      </g>
    </svg>
  );
}
