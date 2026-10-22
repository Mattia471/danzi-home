export function SectionHeading({ eyebrow, title, text, align = 'left' }: { eyebrow?: string; title: string; text?: string; align?: 'left' | 'center' }) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="section-title mt-4">{title}</h2>
      {text && <p className="mt-6 max-w-2xl text-base leading-8 text-ink/60">{text}</p>}
    </div>
  );
}
