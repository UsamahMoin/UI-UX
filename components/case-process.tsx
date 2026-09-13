import { projectProcess } from '@/lib/project-process';

export function CaseProcess({ slug }: { slug: string }) {
  const process = projectProcess[slug];
  if (!process) return null;
  return <section className="case-story case-process" aria-labelledby={`process-${slug}`}>
    <div><span>DESIGN PROCESS</span><h2 id={`process-${slug}`}>{process.focus}</h2><p className="case-story-summary">Self-initiated concept. The outline below separates working assumptions, the implemented prototype, and research still to do.</p></div>
    <div className="case-rationale">
      <article><h3>01 / AUDIENCE + WORKING HYPOTHESIS</h3><p>{process.audience}</p><p>{process.hypothesis}</p></article>
      <article><h3>02 / {process.artifact.kind}</h3><h4>{process.artifact.title}</h4><p>{process.artifact.body}</p><ol className="case-process-steps">{process.artifact.steps.map(step => <li key={step}>{step}</li>)}</ol></article>
      <article><h3>03 / DESIGN DECISION + CURRENT EVIDENCE</h3><p>{process.decision}</p><p>{process.evidence}</p></article>
      <article><h3>04 / NEXT STUDY — PROPOSED</h3><h4>{process.method}</h4><p>{process.plan}</p></article>
    </div>
  </section>;
}
