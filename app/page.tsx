const commands = [
  { label: "Connect", value: "nivra target add production --aws-profile readonly --region eu-central-1 --host 10.0.1.5 --user nivra --identity ~/.ssh/nivra" },
  { label: "Audit", value: "nivra audit exposure --target production" },
  { label: "Investigate", value: 'nivra investigate production "Why is SSH insecure?"' },
  { label: "Plan", value: "nivra plan inv_ssh_policy" },
];

const capabilities = [
  { index: "01", title: "See the whole system", text: "Correlate AWS identity, network paths, storage, compute and the live Linux host into one evidence graph.", tags: ["AWS", "Ubuntu", "Exposure"] },
  { index: "02", title: "Investigate like an engineer", text: "Move from symptoms to a grounded root cause while keeping verified facts separate from inference and unknowns.", tags: ["Root cause", "Evidence", "Confidence"] },
  { index: "03", title: "Plan bounded changes", text: "Translate findings into typed operations with prerequisites, impact, permissions, verification and rollback.", tags: ["Policy", "Diff", "Rollback"] },
  { index: "04", title: "Operate under control", text: "Execute only catalogued actions after policy checks and explicit approval—never an unrestricted shell command.", tags: ["Approval", "Audit log", "Guardrails"] },
];

const flow = [
  ["01", "Connect", "Named targets reference credentials; NIVRA never stores secret values."],
  ["02", "Discover", "Bounded collectors gather fresh AWS and Linux evidence."],
  ["03", "Understand", "Rules and correlation build findings and effective exposure."],
  ["04", "Investigate", "The AI receives only redacted, labeled infrastructure context."],
  ["05", "Plan", "Deterministic mappings select a supported safe action."],
  ["06", "Approve", "Policy, risk and human authorization decide whether to proceed."],
  ["07", "Execute", "A narrow adapter performs the exact typed operation."],
  ["08", "Verify", "NIVRA checks actual state and rolls back on failure."],
];

function Mark({ compact = false }: { compact?: boolean }) {
  return <span className={compact ? "mark compact" : "mark"} aria-label="NIVRA"><i>N</i></span>;
}

function CodeBlock({ children, title = "terminal" }: { children: React.ReactNode; title?: string }) {
  return <div className="code-block"><div className="code-head"><span className="dots"><i /><i /><i /></span><span>{title}</span><span className="code-status">● grounded</span></div><pre>{children}</pre></div>;
}

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top"><Mark compact /><span>NIVRA</span><b>AI INFRASTRUCTURE ENGINEER</b></a>
        <nav aria-label="Primary navigation"><a href="#product">Product</a><a href="#architecture">Architecture</a><a href="#docs">Docs</a><a href="#security">Security</a></nav>
        <a className="nav-cta" href="#quickstart">Start building <span>↗</span></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" /><div className="orb orb-one" aria-hidden="true" /><div className="orb orb-two" aria-hidden="true" />
        <div className="hero-copy">
          <div className="eyebrow"><span>●</span> PRIVATE ALPHA · AWS + LINUX</div>
          <h1>Your infrastructure.<br /><em>Understood.</em> Secured.<br />Operated.</h1>
          <p>NIVRA is the AI Infrastructure Engineer that discovers your cloud, investigates root causes, and executes safe remediation—grounded in evidence and controlled by policy.</p>
          <div className="hero-actions"><a className="primary" href="#quickstart">Explore the quickstart <span>→</span></a><a className="secondary" href="#architecture">How NIVRA works</a></div>
          <div className="trust-line"><span>NO UNRESTRICTED SHELL</span><span>HUMAN APPROVAL</span><span>VERIFIED OUTCOMES</span></div>
        </div>
        <div className="hero-console" aria-label="NIVRA investigation example">
          <div className="console-bar"><div><i /><i /><i /></div><span>nivra / production</span><b>LIVE EVIDENCE</b></div>
          <div className="console-body">
            <p><span className="prompt">$</span> nivra investigate production <span className="string">&quot;Why is SSH insecure?&quot;</span></p>
            <div className="scan-line"><span /><b>Discovery complete</b><em>8.4s</em></div>
            <div className="result-card"><div className="result-top"><span className="high">HIGH CONFIDENCE</span><span>inv_ssh_policy</span></div><h3>SSH authentication policy permits high-risk access methods</h3><div className="evidence-row"><span>VERIFIED</span><code>PasswordAuthentication=yes</code></div><div className="evidence-row"><span>VERIFIED</span><code>PermitRootLogin=yes</code></div><div className="evidence-row muted"><span>UNKNOWN</span><code>Host firewall state</code></div></div>
            <p><span className="prompt">$</span> nivra plan inv_ssh_policy</p>
            <div className="plan-line"><span>PLAN</span><b>2 actions · approval required</b><em>→</em></div><div className="cursor">_</div>
          </div>
        </div>
      </section>

      <section className="signal-strip" aria-label="Supported capabilities"><span>IAM</span><i /> <span>EC2</span><i /> <span>VPC</span><i /> <span>SECURITY GROUPS</span><i /> <span>S3</span><i /> <span>SYSTEMD</span><i /> <span>DOCKER</span><i /> <span>SSH</span></section>

      <section className="section capabilities" id="product">
        <div className="section-intro"><span className="section-kicker">THE OPERATING LAYER</span><h2>One system from signal<br />to safe action.</h2><p>Tools tell you what happened. NIVRA connects what happened, why it matters, and what can safely happen next.</p></div>
        <div className="cap-grid">{capabilities.map((item) => <article className="cap-card" key={item.index}><span className="card-index">{item.index}</span><div className="mini-visual"><i /><i /><i /><b /></div><h3>{item.title}</h3><p>{item.text}</p><div className="tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div></article>)}</div>
      </section>

      <section className="section architecture" id="architecture">
        <div className="section-intro horizontal"><div><span className="section-kicker">ARCHITECTURE</span><h2>Evidence in.<br />Controlled action out.</h2></div><p>The model never talks directly to your infrastructure. Every stage creates a typed, auditable artifact consumed by the next guardrail.</p></div>
        <div className="flow-grid">{flow.map(([number, title, text], index) => <article className="flow-step" key={number}><div><span>{number}</span>{index < flow.length - 1 && <i />}</div><h3>{title}</h3><p>{text}</p></article>)}</div>
        <div className="architecture-note"><span>DESIGN PRINCIPLE</span><p><strong>Infrastructure evidence is untrusted data.</strong> Model output is also untrusted. Only schema-valid operations that pass policy may reach an execution adapter.</p></div>
      </section>

      <section className="docs-shell" id="docs">
        <aside><div className="docs-logo"><Mark compact /><span>Documentation</span></div><nav aria-label="Documentation sections"><b>GET STARTED</b><a href="#quickstart" className="active">Quickstart</a><a href="#mental-model">Mental model</a><b>CORE WORKFLOWS</b><a href="#targets">Targets</a><a href="#audit">Audit</a><a href="#investigate">Investigate</a><a href="#remediate">Remediate</a><b>TRUST</b><a href="#security">Safety model</a><a href="#modes">Operating modes</a></nav><div className="version"><span>v0.1.0</span><em>Private alpha</em></div></aside>
        <article className="docs-content">
          <div className="docs-breadcrumb">DOCS <span>/</span> GET STARTED <span>/</span> QUICKSTART</div>
          <section id="quickstart"><h2>Quickstart</h2><p className="lead">Connect a named target, collect fresh evidence, and ask NIVRA what deserves attention—without giving an AI unrestricted access to your systems.</p><div className="callout"><b>Prerequisites</b><span>Node.js 20+, an AWS read-only profile and/or SSH access to an Ubuntu host.</span></div><h3>1. Install and build</h3><CodeBlock><span className="comment"># Clone and install NIVRA</span>{"\n"}<span className="cmd">npm install</span>{"\n"}<span className="cmd">npm run build</span></CodeBlock></section>
          <section id="targets"><h3>2. Add a named target</h3><p>Targets contain connection references and operating mode—not passwords, tokens, or private-key contents.</p><CodeBlock>{commands[0].value}</CodeBlock><div className="doc-note"><span>i</span><p>The default <code>ASSIST</code> mode allows audits and plans, but prohibits infrastructure changes.</p></div></section>
          <section id="audit"><h3>3. Run a correlated audit</h3><p>Discover AWS and Linux in parallel, then calculate effective exposure from the complete network path.</p><CodeBlock><span className="cmd">nivra audit exposure</span> \{"\n"}  --profile readonly \{"\n"}  --region eu-central-1 \{"\n"}  --host 10.0.1.5 \{"\n"}  --user nivra \{"\n"}  --identity ~/.ssh/nivra \{"\n"}  --instance-id i-0123456789abcdef0</CodeBlock></section>
          <section id="investigate"><h3>4. Investigate a problem</h3><p>Investigations rebuild current evidence and label every claim as <strong>VERIFIED</strong>, <strong>INFERRED</strong>, or <strong>UNKNOWN</strong>.</p><CodeBlock>{commands[2].value}</CodeBlock></section>
          <section id="remediate"><h3>5. Plan remediation</h3><p>A plan describes typed actions, impact, required permissions, preconditions, verification, and rollback. Planning never changes infrastructure.</p><CodeBlock>{commands[3].value}</CodeBlock></section>
          <section id="mental-model"><h3>Command map</h3><div className="command-list">{commands.map(command => <div key={command.label}><b>{command.label}</b><code>{command.value}</code></div>)}</div></section>
        </article>
        <aside className="on-page"><b>ON THIS PAGE</b><a href="#quickstart">Quickstart</a><a href="#targets">Named targets</a><a href="#audit">Audit</a><a href="#investigate">Investigate</a><a href="#remediate">Remediation</a></aside>
      </section>

      <section className="section safety" id="security"><div className="shield" aria-hidden="true"><span>POLICY</span><b>✓</b><i>VERIFIED</i></div><div className="safety-copy"><span className="section-kicker">SECURITY BY ARCHITECTURE</span><h2>Autonomy without<br />surrendering control.</h2><p>NIVRA is designed around the assumption that infrastructure changes are dangerous. Access is bounded. Evidence is redacted. Every action is explainable and reviewable.</p><div className="safety-points"><div><b>Typed actions only</b><span>No arbitrary shell generated by a model.</span></div><div><b>State fingerprints</b><span>Stale plans stop before execution.</span></div><div><b>Verify or rollback</b><span>API success is never proof of success.</span></div><div><b>Complete history</b><span>Redacted evidence and outcomes stay auditable.</span></div></div></div></section>

      <section className="modes section" id="modes"><div className="section-intro horizontal"><div><span className="section-kicker">OPERATING MODES</span><h2>Choose the boundary.</h2></div><p>Start with visibility. Increase autonomy only when your organization and action catalog are ready.</p></div><div className="mode-grid"><article><span>01</span><h3>OBSERVE</h3><p>Read-only discovery and deterministic analysis.</p></article><article className="selected"><span>02 · DEFAULT</span><h3>ASSIST</h3><p>Investigations and plans. No execution.</p></article><article><span>03</span><h3>OPERATE</h3><p>Execution only after explicit human approval.</p></article><article><span>04</span><h3>AUTOPILOT</h3><p>Allowlisted low-risk actions within policy.</p></article></div></section>

      <section className="final-cta"><div className="cta-grid" aria-hidden="true" /><span>THE NEXT LAYER OF INFRASTRUCTURE OPERATIONS</span><h2>Build a team that<br />never loses context.</h2><p>Give one operator the reach of an infrastructure team—without giving an AI the keys to everything.</p><a href="#quickstart">Read the documentation <b>→</b></a></section>
      <footer><a className="brand" href="#top"><Mark compact /><span>NIVRA</span></a><p>AI Infrastructure Engineer · Evidence-driven. Policy-controlled.</p><div><a href="#docs">Docs</a><a href="#security">Security</a><a href="#product">Product</a></div><span>© 2026 NIVRA</span></footer>
    </main>
  );
}
