export default function IconLogo({
  backgroundColor = 'transparent',
  foregroundColor = 'var(--accents-1)',
  ...props
}) {
  return (
    <img
      src={
        'data:image/png;base64,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'
      }
      height={55}
    />
  );
}