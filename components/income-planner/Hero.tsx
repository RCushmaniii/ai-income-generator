export default function Hero() {
  return (
    <section className="border-b border-muted-strong/20 bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-4 py-16 max-w-4xl text-center">
        {/* CushLabs branding dot */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-2 h-2 rounded-full bg-accent"></div>
          <span className="text-xs font-semibold tracking-widest text-muted-strong">CUSHLABS.AI</span>
        </div>

        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight leading-tight">
          <span className="text-accent">Plan your income</span> like a pro.{' '}
          <span className="text-accent">In minutes.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-8">
          Adjust your rate, hours, and taxes to see what you can realistically earn per year — in MXN or USD.
        </p>
        
        <p className="text-sm text-muted-strong">
          Hi, I&apos;m Robert — I build practical AI & software tools like this one.
        </p>
      </div>
    </section>
  )
}
