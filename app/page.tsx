const commands = [
  { label: "Setup", value: "deepstack setup" },
  { label: "Connect server", value: "deepstack connect server production --host server.example.com --user ubuntu --identity ~/.ssh/id_ed25519" },
  { label: "Connect Windows", value: "deepstack connect windows windows-prod --host windows.example.com --user Administrator --identity ~/.ssh/windows_ed25519" },
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
  { index: "01", title: "Infrastructure discovery", text: "Understand operating systems, cloud resources, services, processes, ports, identity, and network configuration.", tags: ["Linux", "Windows", "AWS"] },
  { index: "02", title: "Security analysis", text: "Detect risky SSH and RDP settings, disabled firewalls, public cloud ingress, IAM risks, and operational weaknesses.", tags: ["Deterministic", "Security", "Health"] },
  { index: "03", title: "Network intelligence", text: "Correlate listeners, routes, gateways, Security Groups, firewalls, and addresses before making exposure claims.", tags: ["Exposure", "Evidence", "Confidence"] },
  { index: "04", title: "Incident investigation", text: "Move from symptoms to evidence-grounded root cause while separating verified facts, inference, and unknowns.", tags: ["Root cause", "Context", "AI"] },
  { index: "05", title: "AI engineer", text: "Ask infrastructure-specific questions using fresh, redacted context collected from the selected target.", tags: ["Grounded Q&A", "Targets", "Redaction"] },
  { index: "06", title: "Safe remediation planning", text: "Build bounded plans with prechecks, risk, approval, verification, and rollback requirements—without unrestricted shell access.", tags: ["Plan only", "Policy", "Approval"] },
];

const flow = [
  ["01", "Connect", "Save provider-specific connection references—never secret values."],
  ["02", "Discover", "Run predefined, read-only provider operations."],
  ["03", "Collect evidence", "Normalize and redact fresh infrastructure facts."],
  ["04", "Understand", "Build one target context across connected providers."],
  ["05", "Investigate", "Separate verified, inferred, and unknown claims."],
  ["06", "Generate plan", "Describe typed actions, prechecks, and blockers."],
  ["07", "Policy + risk", "Reject unsupported or unsafe operations."],
  ["08", "User approval", "Keep high-risk and critical actions gated."],
  ["09", "Execute", "Limited to explicitly supported approved actions."],
  ["10", "Verify", "Check intended state after a supported change."],
  ["11", "Rollback", "Require a supported recovery path where critical."],
];

const capabilityStatus = [
  ["Linux discovery", "Available"],
  ["Linux security, listener, and SSH analysis", "Available"],
  ["AWS discovery, IAM, and Security Group analysis", "Available"],
  ["Windows Server discovery and deterministic security analysis", "Available"],
  ["AWS/Linux effective exposure correlation", "Available"],
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
  "Windows Server": ["System, OS, CPU, memory and disks", "Services and bounded process inventory", "TCP/UDP listeners, adapters and DNS", "Windows Firewall profiles and RDP/NLA state", "Local administrative access", "Installed roles including IIS, DNS, DHCP, Hyper-V and AD DS where available"],
};

const providers = [
  { name: "Linux Servers", transport: "Bounded SSH discovery", items: ["Ubuntu / Debian-oriented discovery", "CPU, memory, disk and processes", "Services, listeners and Docker", "SSH, firewall and updates"] },
  { name: "Windows Server", transport: "PowerShell Remoting over SSH", items: ["System, CPU, memory and disk", "Services, processes and listeners", "Adapters, DNS and Windows Firewall", "RDP, administrators and installed roles"] },
  { name: "AWS", transport: "Read-only cloud API discovery", items: ["Identity, IAM, EC2 and S3", "VPCs, subnets and Security Groups", "Routes, gateways and NACL evidence", "AWS/Linux exposure correlation"] },
];

const architectureLayers = [
  ["AI ENGINEER", "Grounded questions + investigation"],
  ["SECURITY · NETWORK · INCIDENT", "Deterministic engines + evidence reasoning"],
  ["POLICY ENGINE", "Typed operations + risk gates"],
  ["EXECUTION ENGINE", "Limited, approval-gated foundations"],
  ["CLOUD APIs · SERVER ACCESS", "AWS · Linux · Windows Server"],
];

function Logo({ height = 34, className = "" }: { height?: number; className?: string }) {
  return (
    <Image
      src="/deepstack-logo-white.png"
      alt="DeepStack"
      width={Math.round(height * 5.95)}
      height={height}
      className={`brand-logo ${className}`.trim()}
    />
  );
}

function Mark({ compact = false }: { compact?: boolean }) {
  return (
    <Image
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
          <Logo height={34} />
          <b>AI INFRASTRUCTURE ENGINEER</b>
        </a>
        <nav aria-label="Primary navigation"><a href="#product">Capabilities</a><a href="#providers">Infrastructure</a><a href="#architecture">Architecture</a><a href="#cli">CLI</a><a href="#security">Security</a><a href="#roadmap">Status</a></nav>
        <a className="nav-cta" href="#quickstart">Get started <span>↗</span></a>
        <details className="mobile-menu"><summary aria-label="Open navigation">Menu</summary><nav aria-label="Mobile navigation"><a href="#product">Capabilities</a><a href="#providers">Infrastructure</a><a href="#architecture">Architecture</a><a href="#cli">CLI</a><a href="#security">Security</a></nav></details>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" /><div className="orb orb-one" aria-hidden="true" /><div className="orb orb-two" aria-hidden="true" />
        <div className="hero-copy">
          <div className="eyebrow"><span>●</span> CURRENT · LINUX + WINDOWS SERVER + AWS</div>
          <h1>Understand your infrastructure <em>before you touch it.</em></h1>
          <p>Connect your infrastructure. DeepStack discovers it, collects bounded evidence, detects problems, investigates root causes, and helps you improve it safely.</p>
          <div className="hero-actions"><a className="primary" href="#quickstart">Get started <span>→</span></a><a className="secondary" href="#cli">View CLI</a></div>
          <div className="trust-line"><span>NO UNRESTRICTED SHELL</span><span>REAL TARGET EVIDENCE</span><span>BOUNDED PLANS</span></div>
        </div>
        <div className="hero-console" aria-label="DeepStack investigation example">
          <div className="console-bar"><div><i /><i /><i /></div><span>deepstack / production</span><b>LIVE EVIDENCE</b></div>
          <div className="console-body">
            <p><span className="prompt">$</span> deepstack audit production</p>
            <div className="scan-line"><span /><b>Infrastructure discovered</b><em>bounded</em></div>
            <div className="result-card"><div className="result-top"><span className="high">HEALTH 72 / 100</span><span>production</span></div><h3>Security posture needs attention</h3><div className="evidence-row"><span>HIGH</span><code>SSH password authentication enabled</code></div><div className="evidence-row"><span>HIGH</span><code>Direct SSH root login enabled</code></div><div className="evidence-row muted"><span>UNKNOWN</span><code>Host firewall state</code></div></div>
            <p><span className="prompt">$</span> deepstack ask production <span className="string">&quot;What should I fix first?&quot;</span></p>
            <div className="plan-line"><span>ANSWER</span><b>Grounded in current target evidence</b><em>→</em></div><div className="support-line">DeepStack support: investigate + plan</div><div className="cursor">_</div>
          </div>
        </div>
      </section>

      <section className="signal-strip" aria-label="Supported capabilities"><span>LINUX</span><i /><span>WINDOWS SERVER</span><i /><span>AWS</span><i /><span>SSH</span><i /><span>RDP</span><i /><span>IAM</span><i /><span>VPC</span><i /><span>DOCKER</span></section>

      <section className="section capabilities" id="product">
        <div className="section-intro"><span className="section-kicker">THE OPERATING LAYER</span><h2>One system from signal<br />to safe action.</h2><p>Tools tell you what happened. DeepStack connects what happened, why it matters, and what can safely happen next.</p></div>
        <div className="cap-grid">{capabilities.map((item) => <article className="cap-card" key={item.index}><span className="card-index">{item.index}</span><div className="mini-visual"><i /><i /><i /><b /></div><h3>{item.title}</h3><p>{item.text}</p><div className="tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div></article>)}</div>
      </section>

      <section className="section providers" id="providers"><div className="section-intro horizontal"><div><span className="section-kicker">SUPPORTED INFRASTRUCTURE</span><h2>Three providers.<br />One target context.</h2></div><p>DeepStack collects provider-native facts, normalizes them into common evidence, and keeps unrelated providers out of completeness scoring.</p></div><div className="provider-grid">{providers.map((provider) => <article key={provider.name}><div className="provider-head"><span>CURRENT</span><b>●</b></div><h3>{provider.name}</h3><p>{provider.transport}</p><ul>{provider.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div></section>

      <section className="section architecture" id="architecture">
        <div className="section-intro horizontal"><div><span className="section-kicker">ARCHITECTURE</span><h2>Evidence in.<br />Controlled action out.</h2></div><p>The model never talks directly to your infrastructure. Every stage creates a typed, auditable artifact consumed by the next guardrail.</p></div>
        <div className="flow-grid">{flow.map(([number, title, text], index) => <article className="flow-step" key={number}><div><span>{number}</span>{index < flow.length - 1 && <i />}</div><h3>{title}</h3><p>{text}</p></article>)}</div>
        <div className="architecture-stack" aria-label="DeepStack system architecture">{architectureLayers.map(([name, detail], index) => <div key={name} className={index === 0 ? "active" : ""}><b>{name}</b><span>{detail}</span></div>)}</div>
        <div className="architecture-note"><span>DESIGN PRINCIPLE</span><p><strong>Infrastructure evidence is untrusted data.</strong> Model output is also untrusted. Planning never changes infrastructure, and unsupported execution is never presented as available.</p></div>
      </section>

      <section className="exposure section" id="exposure"><div className="section-intro horizontal"><div><span className="section-kicker">EFFECTIVE EXPOSURE</span><h2>A wildcard listener is not proof of internet exposure.</h2></div><p>DeepStack correlates host listeners and firewalls with addresses, Security Groups, routes, and Internet Gateways. It makes the strongest claim supported by the complete network path—no stronger.</p></div><div className="exposure-states"><span>NOT EXPOSED</span><span>CONFIGURATION RISK</span><span>POSSIBLY EXPOSED</span><span>EFFECTIVELY EXPOSED</span></div><p className="exposure-note">Windows RDP wildcard bindings remain configuration risks until equivalent network-path correlation evidence exists.</p></section>

      <section className="docs-shell" id="cli">
        <aside><div className="docs-logo"><Mark compact /><span>Documentation</span></div><nav aria-label="Documentation sections"><b>GET STARTED</b><a href="#quickstart" className="active">Quickstart</a><a href="#mental-model">Command map</a><b>CORE WORKFLOWS</b><a href="#targets">Connect targets</a><a href="#audit">Status &amp; audit</a><a href="#investigate">Ask &amp; investigate</a><a href="#remediate">Plan</a><b>REFERENCE</b><a href="#capability-status">Capability status</a><a href="#evidence">Evidence sources</a><b>TRUST</b><a href="#security">Safety model</a><a href="#modes">Operating boundary</a></nav><div className="version"><span>v0.1.0</span><em>Private alpha</em></div></aside>
        <article className="docs-content">
          <div className="docs-breadcrumb">DOCS <span>/</span> GET STARTED <span>/</span> QUICKSTART</div>
          <section id="quickstart"><h2>CLI quickstart</h2><p className="lead">Save connection details once, collect fresh evidence, and ask DeepStack what deserves attention—without giving an AI unrestricted access to your systems.</p><div className="callout"><b>Prerequisites</b><span>Node.js 20+ and access to at least one Linux, Windows Server, or AWS environment. AI configuration is optional for deterministic audits.</span></div><h3>1. Install and set up</h3><CodeBlock><span className="comment"># Clone and install DeepStack</span>{"\n"}<span className="cmd">npm install</span>{"\n"}<span className="cmd">npm run build</span>{"\n\n"}<span className="cmd">deepstack setup</span></CodeBlock></section>
          <section id="targets"><h3>2. Connect infrastructure</h3><p>A named target can contain Linux, Windows Server, AWS, or a supported combination. DeepStack stores connection references—not passwords, cloud secret keys, or private-key contents.</p><CodeBlock><span className="comment"># Linux</span>{"\n"}<span className="cmd">deepstack connect server production</span> \{"\n"}  --host server.example.com \{"\n"}  --user ubuntu \{"\n"}  --identity ~/.ssh/id_ed25519{"\n\n"}<span className="comment"># Windows Server</span>{"\n"}<span className="cmd">deepstack connect windows windows-prod</span> \{"\n"}  --host windows.example.com \{"\n"}  --user Administrator \{"\n"}  --identity ~/.ssh/windows_ed25519{"\n\n"}<span className="comment"># AWS</span>{"\n"}<span className="cmd">deepstack connect aws production</span> \{"\n"}  --profile readonly \{"\n"}  --region eu-central-1{"\n\n"}<span className="cmd">deepstack targets</span></CodeBlock><div className="doc-note"><span>i</span><p>Identity paths and profile names are references. Secret contents are not placed in target context, and collected values are redacted before AI use.</p></div></section>
          <section id="audit"><h3>3. Check health and audit</h3><p><code>status</code> gives a compact health view. Named audits resolve the connected providers and use the common context, finding, and health pipeline.</p><CodeBlock><span className="cmd">deepstack status production</span>{"\n"}<span className="cmd">deepstack audit production</span>{"\n\n"}<span className="comment"># Provider-specific audit surfaces</span>{"\n"}<span className="cmd">deepstack audit aws --help</span>{"\n"}<span className="cmd">deepstack audit linux --help</span>{"\n"}<span className="cmd">deepstack audit windows --help</span>{"\n"}<span className="cmd">deepstack audit exposure --help</span></CodeBlock></section>
          <section id="investigate"><h3>4. Ask and investigate</h3><p>AI commands use current, redacted evidence from the named target. Investigations label every claim as <strong>VERIFIED</strong>, <strong>INFERRED</strong>, or <strong>UNKNOWN</strong>.</p><CodeBlock><span className="cmd">deepstack ask production</span> &quot;What should I fix first?&quot;{"\n"}<span className="cmd">deepstack investigate production</span> &quot;Why is SSH insecure?&quot;</CodeBlock></section>
          <section id="remediate"><h3>5. Generate a remediation plan</h3><p>A plan describes risk, goal, pre-checks, typed actions, approval requirements, verification, rollback, and any blocker. <strong>Running <code>deepstack plan</code> never changes infrastructure.</strong></p><CodeBlock><span className="cmd">deepstack plan inv_xxxxx</span>{"\n\n"}<span className="comment"># DeepStack support: Plan only</span></CodeBlock></section>
          <section id="mental-model"><h3>Command map</h3><div className="command-list">{commands.map(command => <div key={command.label}><b>{command.label}</b><code>{command.value}</code></div>)}</div></section>
          <section id="capability-status"><h3>Current capability status</h3><p>Product availability is explicit. Experimental capabilities are not presented as production-ready.</p><div className="status-list">{capabilityStatus.map(([capability, status]) => <div key={capability}><span>{capability}</span><b className={status.startsWith("Available") ? "available" : status.startsWith("Not") ? "unavailable" : "experimental"}>{status}</b></div>)}</div></section>
          <section id="evidence"><h3>What DeepStack can analyze</h3><p>Collectors are bounded and provider-aware. Secrets are redacted before evidence reaches the AI provider.</p><div className="evidence-grid">{Object.entries(evidenceSources).map(([provider, items]) => <article key={provider}><h4>{provider}</h4><ul>{items.map(item => <li key={item}>{item}</li>)}</ul></article>)}</div></section>
        </article>
        <aside className="on-page"><b>ON THIS PAGE</b><a href="#quickstart">Quickstart</a><a href="#targets">Connect</a><a href="#audit">Status &amp; audit</a><a href="#investigate">Ask &amp; investigate</a><a href="#remediate">Plan</a><a href="#capability-status">Capabilities</a><a href="#evidence">Evidence</a></aside>
      </section>

      <section className="section safety" id="security"><div className="shield" aria-hidden="true"><span>POLICY</span><b>✓</b><i>BOUNDED</i></div><div className="safety-copy"><span className="section-kicker">SECURITY BY ARCHITECTURE</span><h2>AI should never receive unrestricted root shell access.</h2><p>DeepStack observes before it proposes. Access is bounded, evidence is redacted, and remote content is treated as untrusted infrastructure data—not instructions.</p><div className="safety-points"><div><b>Bounded operations</b><span>Predefined provider operations replace arbitrary shell access.</span></div><div><b>Evidence first</b><span>Fresh facts and unknowns come before recommendations.</span></div><div><b>Policy engine</b><span>AI output cannot directly become execution.</span></div><div><b>Approval gates</b><span>High-risk and critical changes require explicit approval.</span></div><div><b>Verification</b><span>Supported changes must prove the intended state afterward.</span></div><div><b>Rollback</b><span>Critical changes require a supported recovery path.</span></div></div></div></section>

      <section className="modes section" id="modes"><div className="section-intro horizontal"><div><span className="section-kicker">AUTONOMY LEVELS</span><h2>Understanding first.<br />Safe automation second.</h2></div><p>DeepStack v0.1 defaults to OBSERVE and ASSIST. Infrastructure-changing execution is deliberately safety-gated.</p></div><div className="mode-grid"><article><span>AVAILABLE</span><h3>OBSERVE</h3><p>Read and analyze only: discovery, status, deterministic audit, and structured evidence.</p></article><article className="selected"><span>AVAILABLE · DEFAULT</span><h3>ASSIST</h3><p>Investigate, answer infrastructure questions, recommend, and generate non-mutating plans.</p></article><article><span>FOUNDATIONS</span><h3>OPERATE</h3><p>Execute only explicitly supported plans after policy checks and user approval.</p></article><article><span>NOT YET AVAILABLE</span><h3>AUTOPILOT</h3><p>Only pre-authorized low-risk actions; critical actions always remain approval-gated.</p></article></div></section>

      <section className="roadmap section" id="roadmap"><div className="section-intro horizontal"><div><span className="section-kicker">STATUS + ROADMAP</span><h2>Current is explicit.<br />Future stays labeled.</h2></div><p>Today&apos;s strongest surfaces are discovery, audit, grounded questions, investigation, exposure analysis, and planning foundations.</p></div><div className="roadmap-grid"><article><span>CURRENT</span><h3>Available now</h3><p>AWS, Linux, Windows Server, deterministic security analysis, AWS/Linux exposure correlation, grounded Q&amp;A, investigation, and remediation planning foundations.</p></article><article><span>NEXT</span><h3>In development</h3><p>Safe execution, verification, rollback, monitoring, incident improvements, deployment intelligence, a local/server agent, dashboard, and production SaaS.</p></article><article><span>ROADMAP</span><h3>Expanded providers</h3><p>Azure, GCP, Hetzner, DigitalOcean, Kubernetes, and broader on-prem infrastructure support.</p></article></div></section>

      <section className="final-cta"><div className="cta-grid" aria-hidden="true" /><span>START WITH A NAMED TARGET</span><h2>Connect your infrastructure.<br />Let DeepStack figure out what matters.</h2><p>Audit real evidence, investigate the root cause, and generate a bounded plan.</p><div className="cta-actions"><a href="#quickstart">Get started <b>→</b></a><a className="secondary" href="#cli">Explore CLI</a></div></section>
      <footer>
        <a className="brand" href="#top" aria-label="DeepStack Home">
          <Logo height={28} />
        </a>
        <p>AI Infrastructure Engineer · Evidence-driven. Policy-controlled.</p>
        <div><a href="#product">Product</a><a href="#cli">CLI</a><a href="#architecture">Architecture</a><a href="#security">Security</a></div>
        <span>© 2026 DeepStack</span>
      </footer>
    </main>
  );
}
import Image from "next/image";
