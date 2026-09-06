const commands = [
  { label: "Setup", value: "deepstack setup" },
  { label: "Connect server", value: "deepstack connect server production --host server.example.com --user ubuntu --identity ~/.ssh/id_ed25519" },
  { label: "Connect AWS", value: "deepstack connect aws production --profile readonly --region eu-central-1" },
  { label: "Targets", value: "deepstack targets" },
  { label: "Status", value: "deepstack status production" },
  { label: "Audit", value: "deepstack audit production" },
  { label: "Ask", value: 'deepstack ask production "What should I fix first?"' },
  { label: "Investigate", value: 'deepstack investigate production "Why is SSH insecure?"' },
  { label: "Plan", value: "deepstack plan inv_ssh_policy" },
  { label: "Demo", value: "deepstack demo" },
];

const capabilities = [
  { index: "01", title: "See the whole system", text: "Correlate AWS identity, network paths, storage, compute and the live Linux host into one evidence graph.", tags: ["AWS", "Ubuntu", "Exposure"] },
  { index: "02", title: "Investigate like an engineer", text: "Move from symptoms to a grounded root cause while keeping verified facts separate from inference and unknowns.", tags: ["Root cause", "Evidence", "Confidence"] },
  { index: "03", title: "Plan bounded changes", text: "Translate findings into typed operations with prerequisites, impact, permissions, verification and rollback.", tags: ["Policy", "Diff", "Rollback"] },
  { index: "04", title: "Keep control", text: "Plan only catalogued actions, expose approval requirements, and never turn AI output into an unrestricted shell command.", tags: ["Plan only", "Policy", "Guardrails"] },
];

const flow = [
  ["01", "Connect", "Named targets keep Linux and AWS connection references together—never secret values."],
  ["02", "Discover", "Bounded collectors gather fresh AWS and Linux evidence."],
  ["03", "Assess", "Deterministic rules surface health, findings, and effective exposure."],
  ["04", "Ask", "The AI Engineer answers from redacted real-target evidence."],
  ["05", "Investigate", "Verified, inferred, and unknown claims stay visibly separated."],
  ["06", "Plan", "Bounded plans show prerequisites, verification, rollback, and blockers."],
];

const capabilityStatus = [
  ["Linux discovery", "Available"],
  ["Linux security, listener, and SSH analysis", "Available"],
  ["AWS discovery, IAM, and Security Group analysis", "Available"],
  ["AI questions grounded in real evidence", "Available"],
  ["Target-aware investigation", "Available"],
  ["Remediation planning", "Experimental"],
  ["Approval-gated execution", "Experimental · supported actions only"],
  ["Automatic rollback", "Only where explicitly supported"],
  ["Telegram, WhatsApp, and web dashboard", "Not yet available"],
];

const evidenceSources = {
  Linux: ["Hostname, distro, kernel, architecture, uptime", "CPU, memory, swap, filesystems, disk pressure", "Bounded top processes and TCP/UDP listeners", "systemd services, Docker state, containers and ports", "UFW, nftables, iptables and SSH effective configuration", "Package update count where reliable"],
  AWS: ["STS identity and account context", "IAM users, attached policies and inline policies", "EC2, VPCs, subnets and route tables", "Internet Gateways and Network ACLs", "Security Groups and public ingress rules", "S3 plus provider-independent evidence and findings"],
};

function Logo({ height = 28, className = "" }: { height?: number; className?: string }) {
  return (
    <img
      src="/deepstack-logo-white.png"
      alt="DeepStack"
      height={height}
      className={`brand-logo ${className}`.trim()}
    />
  );
}

function Mark({ compact = false }: { compact?: boolean }) {
  return (
    <img
      src="/deepstack-icon-white.png"
      alt=""
      width={compact ? 22 : 28}
      height={compact ? 22 : 28}
      className={compact ? "brand-icon compact" : "brand-icon"}
    />
  );
}

function CodeBlock({ children, title = "terminal" }: { children: React.ReactNode; title?: string }) {
  return <div className="code-block"><div className="code-head"><span className="dots"><i /><i /><i /></span><span>{title}</span><span className="code-status">● grounded</span></div><pre>{children}</pre></div>;
}

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="DeepStack Home">
          <Logo height={28} />
          <b>AI INFRASTRUCTURE ENGINEER</b>
        </a>
        <nav aria-label="Primary navigation"><a href="#product">Product</a><a href="#architecture">Architecture</a><a href="#docs">Docs</a><a href="#security">Security</a></nav>
        <a className="nav-cta" href="#quickstart">Start building <span>↗</span></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" /><div className="orb orb-one" aria-hidden="true" /><div className="orb orb-two" aria-hidden="true" />
        <div className="hero-copy">
          <div className="eyebrow"><span>●</span> PRIVATE ALPHA · AWS + LINUX</div>
          <h1>Your infrastructure.<br /><em>Understood.</em> Assessed.<br />Planned.</h1>
          <p>DeepStack is the AI Infrastructure Engineer that discovers your cloud, explains infrastructure health, investigates root causes, and prepares bounded remediation plans—grounded in evidence and controlled by policy.</p>
          <div className="hero-actions"><a className="primary" href="#quickstart">Explore the quickstart <span>→</span></a><a className="secondary" href="#architecture">How DeepStack works</a></div>
          <div className="trust-line"><span>NO UNRESTRICTED SHELL</span><span>REAL TARGET EVIDENCE</span><span>BOUNDED PLANS</span></div>
        </div>
        <div className="hero-console" aria-label="DeepStack investigation example">
          <div className="console-bar"><div><i /><i /><i /></div><span>deepstack / production</span><b>LIVE EVIDENCE</b></div>
          <div className="console-body">
            <p><span className="prompt">$</span> deepstack investigate production <span className="string">&quot;Why is SSH insecure?&quot;</span></p>
            <div className="scan-line"><span /><b>Discovery complete</b><em>8.4s</em></div>
            <div className="result-card"><div className="result-top"><span className="high">HIGH CONFIDENCE</span><span>inv_ssh_policy</span></div><h3>SSH authentication policy permits high-risk access methods</h3><div className="evidence-row"><span>VERIFIED</span><code>PasswordAuthentication=yes</code></div><div className="evidence-row"><span>VERIFIED</span><code>PermitRootLogin=yes</code></div><div className="evidence-row muted"><span>UNKNOWN</span><code>Host firewall state</code></div></div>
            <p><span className="prompt">$</span> deepstack plan inv_ssh_policy</p>
            <div className="plan-line"><span>PLAN</span><b>2 actions · blocked until access prerequisites are verified</b><em>→</em></div><div className="support-line">DeepStack support: Plan only</div><div className="cursor">_</div>
          </div>
        </div>
      </section>

      <section className="signal-strip" aria-label="Supported capabilities"><span>IAM</span><i /> <span>EC2</span><i /> <span>VPC</span><i /> <span>SECURITY GROUPS</span><i /> <span>S3</span><i /> <span>SYSTEMD</span><i /> <span>DOCKER</span><i /> <span>SSH</span></section>

      <section className="section capabilities" id="product">
        <div className="section-intro"><span className="section-kicker">THE OPERATING LAYER</span><h2>One system from signal<br />to safe action.</h2><p>Tools tell you what happened. DeepStack connects what happened, why it matters, and what can safely happen next.</p></div>
        <div className="cap-grid">{capabilities.map((item) => <article className="cap-card" key={item.index}><span className="card-index">{item.index}</span><div className="mini-visual"><i /><i /><i /><b /></div><h3>{item.title}</h3><p>{item.text}</p><div className="tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div></article>)}</div>
      </section>

      <section className="section architecture" id="architecture">
        <div className="section-intro horizontal"><div><span className="section-kicker">ARCHITECTURE</span><h2>Evidence in.<br />Controlled action out.</h2></div><p>The model never talks directly to your infrastructure. Every stage creates a typed, auditable artifact consumed by the next guardrail.</p></div>
        <div className="flow-grid">{flow.map(([number, title, text], index) => <article className="flow-step" key={number}><div><span>{number}</span>{index < flow.length - 1 && <i />}</div><h3>{title}</h3><p>{text}</p></article>)}</div>
        <div className="architecture-note"><span>DESIGN PRINCIPLE</span><p><strong>Infrastructure evidence is untrusted data.</strong> Model output is also untrusted. Planning never changes infrastructure, and unsupported execution is never presented as available.</p></div>
      </section>

      <section className="docs-shell" id="docs">
        <aside><div className="docs-logo"><Mark compact /><span>Documentation</span></div><nav aria-label="Documentation sections"><b>GET STARTED</b><a href="#quickstart" className="active">Quickstart</a><a href="#mental-model">Command map</a><b>CORE WORKFLOWS</b><a href="#targets">Connect targets</a><a href="#audit">Status &amp; audit</a><a href="#investigate">Ask &amp; investigate</a><a href="#remediate">Plan</a><b>REFERENCE</b><a href="#capability-status">Capability status</a><a href="#evidence">Evidence sources</a><b>TRUST</b><a href="#security">Safety model</a><a href="#modes">Operating boundary</a></nav><div className="version"><span>v0.1.0</span><em>Private alpha</em></div></aside>
        <article className="docs-content">
          <div className="docs-breadcrumb">DOCS <span>/</span> GET STARTED <span>/</span> QUICKSTART</div>
          <section id="quickstart"><h2>Quickstart</h2><p className="lead">Save connection details once, collect fresh evidence, and ask DeepStack what deserves attention—without giving an AI unrestricted access to your systems.</p><div className="callout"><b>Prerequisites</b><span>Node.js 20+, an AWS profile and/or SSH access to a Linux host. AI configuration is optional for deterministic audits.</span></div><h3>1. Install and set up</h3><CodeBlock><span className="comment"># Clone and install DeepStack</span>{"\n"}<span className="cmd">npm install</span>{"\n"}<span className="cmd">npm run build</span>{"\n\n"}<span className="cmd">deepstack setup</span></CodeBlock></section>
          <section id="targets"><h3>2. Connect infrastructure</h3><p>A named target can contain a Linux server, an AWS account and region, or both. DeepStack stores references such as an identity path or profile name—not passwords, API keys, AWS secret keys, or private-key contents.</p><CodeBlock><span className="comment"># Linux server</span>{"\n"}<span className="cmd">deepstack connect server production</span> \{"\n"}  --host server.example.com \{"\n"}  --user ubuntu \{"\n"}  --identity ~/.ssh/id_ed25519{"\n\n"}<span className="comment"># Optional AWS context on the same target</span>{"\n"}<span className="cmd">deepstack connect aws production</span> \{"\n"}  --profile readonly \{"\n"}  --region eu-central-1{"\n\n"}<span className="cmd">deepstack targets</span></CodeBlock><div className="doc-note"><span>i</span><p>Use <code>--json</code> for machine-readable output and <code>--verbose</code> for collector and diagnostic detail.</p></div></section>
          <section id="audit"><h3>3. Check health and audit</h3><p><code>status</code> gives a compact health view. <code>audit</code> resolves the target and runs the appropriate Linux, AWS, or combined discovery engines.</p><CodeBlock><span className="cmd">deepstack status production</span>{"\n"}<span className="cmd">deepstack audit production</span></CodeBlock></section>
          <section id="investigate"><h3>4. Ask and investigate</h3><p>AI commands use current, redacted evidence from the named target. Investigations label every claim as <strong>VERIFIED</strong>, <strong>INFERRED</strong>, or <strong>UNKNOWN</strong>.</p><CodeBlock><span className="cmd">deepstack ask production</span> &quot;What should I fix first?&quot;{"\n"}<span className="cmd">deepstack investigate production</span> &quot;Why is SSH insecure?&quot;</CodeBlock></section>
          <section id="remediate"><h3>5. Generate a remediation plan</h3><p>A plan describes risk, goal, pre-checks, typed actions, approval requirements, verification, rollback, and any blocker. <strong>Running <code>deepstack plan</code> never changes infrastructure.</strong></p><CodeBlock><span className="cmd">deepstack plan inv_xxxxx</span>{"\n\n"}<span className="comment"># DeepStack support: Plan only</span></CodeBlock></section>
          <section id="mental-model"><h3>Command map</h3><div className="command-list">{commands.map(command => <div key={command.label}><b>{command.label}</b><code>{command.value}</code></div>)}</div></section>
          <section id="capability-status"><h3>Current capability status</h3><p>Product availability is explicit. Experimental capabilities are not presented as production-ready.</p><div className="status-list">{capabilityStatus.map(([capability, status]) => <div key={capability}><span>{capability}</span><b className={status.startsWith("Available") ? "available" : status.startsWith("Not") ? "unavailable" : "experimental"}>{status}</b></div>)}</div></section>
          <section id="evidence"><h3>What DeepStack can analyze</h3><p>Collectors are bounded and provider-aware. Secrets are redacted before evidence reaches the AI provider.</p><div className="evidence-grid">{Object.entries(evidenceSources).map(([provider, items]) => <article key={provider}><h4>{provider}</h4><ul>{items.map(item => <li key={item}>{item}</li>)}</ul></article>)}</div></section>
        </article>
        <aside className="on-page"><b>ON THIS PAGE</b><a href="#quickstart">Quickstart</a><a href="#targets">Connect</a><a href="#audit">Status &amp; audit</a><a href="#investigate">Ask &amp; investigate</a><a href="#remediate">Plan</a><a href="#capability-status">Capabilities</a><a href="#evidence">Evidence</a></aside>
      </section>

      <section className="section safety" id="security"><div className="shield" aria-hidden="true"><span>POLICY</span><b>✓</b><i>BOUNDED</i></div><div className="safety-copy"><span className="section-kicker">SECURITY BY ARCHITECTURE</span><h2>Insight without<br />surrendering control.</h2><p>DeepStack is designed around the assumption that infrastructure changes are dangerous. Access is bounded, evidence is redacted, and remote content is treated as untrusted infrastructure data—not instructions.</p><div className="safety-points"><div><b>Bounded registries</b><span>No arbitrary shell strings in public commands.</span></div><div><b>Policy owns authorization</b><span>AI output cannot directly become execution.</span></div><div><b>Planning is non-mutating</b><span>SSH hardening plans block when safe access prerequisites are unknown.</span></div><div><b>Honest support status</b><span>Verification and rollback are claimed only where explicitly implemented.</span></div></div></div></section>

      <section className="modes section" id="modes"><div className="section-intro horizontal"><div><span className="section-kicker">OPERATING BOUNDARY</span><h2>Start with evidence.</h2></div><p>DeepStack&apos;s product surface clearly separates what is available today from experimental execution capabilities.</p></div><div className="mode-grid"><article><span>AVAILABLE</span><h3>OBSERVE</h3><p>Read-only discovery, status, deterministic audit, and structured JSON.</p></article><article className="selected"><span>AVAILABLE · DEFAULT</span><h3>ASSIST</h3><p>Grounded questions, investigations, and non-mutating plans.</p></article><article><span>EXPERIMENTAL</span><h3>APPROVE</h3><p>Approval-gated execution only for explicitly supported actions.</p></article><article><span>NOT YET AVAILABLE</span><h3>AUTOPILOT</h3><p>No broad autonomous execution and no unrestricted shell access.</p></article></div></section>

      <section className="final-cta"><div className="cta-grid" aria-hidden="true" /><span>START WITH A NAMED TARGET</span><h2>Understand production<br />before changing it.</h2><p>Connect once, audit real evidence, investigate the root cause, and generate a bounded plan.</p><a href="#quickstart">Run the quickstart <b>→</b></a></section>
      <footer>
        <a className="brand" href="#top" aria-label="DeepStack Home">
          <Logo height={26} />
        </a>
        <p>AI Infrastructure Engineer · Evidence-driven. Policy-controlled.</p>
        <div><a href="#docs">Docs</a><a href="#security">Security</a><a href="#product">Product</a></div>
        <span>© 2026 DeepStack</span>
      </footer>
    </main>
  );
}
