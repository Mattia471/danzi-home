import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
export function NotFoundPage(){ return <section className="py-28 text-center"><Container><p className="eyebrow">404</p><h1 className="mt-3 font-display text-6xl font-semibold">Questa stanza non c’è.</h1><p className="mt-4 text-ink/60">Torniamo in salotto.</p><Button to="/" className="mt-7">Vai alla home</Button></Container></section> }
