# .fylle Format Specification

**Version:** 0.1.0
**Status:** Draft
**License:** Apache 2.0

---

## 1. Overview

A `.fylle` file is a ZIP archive with the `.fylle` extension that contains a complete, portable AI agent definition. The format is designed to be:

- **Declarative** — describes what an agent IS, not how to execute it
- **Runtime-agnostic** — any platform can interpret and run a .fylle agent
- **Human-readable** — YAML and Markdown, inspectable without tools
- **Extensible** — unknown fields are ignored, not rejected

## 2. Package structure

```
my-agent.fylle (ZIP archive)
├── manifest.yaml          # REQUIRED — agent identity and configuration
├── agent.md               # REQUIRED — system prompt / agent instructions
├── skills/                # OPTIONAL — modular skill definitions
│   ├── skill-name.yaml
│   └── ...
├── guardrails.yaml        # OPTIONAL — rules, constraints, limits
├── memory-schema.yaml     # OPTIONAL — memory structure declaration
└── README.md              # OPTIONAL — human documentation (not parsed)
```

### 2.1 Required files

| File | Purpose |
|---|---|
| `manifest.yaml` | Agent identity, model requirements, inputs, outputs, tool declarations |
| `agent.md` | The agent's system prompt — its complete behavioral instructions |

### 2.2 Optional files

| File | Purpose |
|---|---|
| `skills/*.yaml` | Modular capabilities the agent can perform |
| `guardrails.yaml` | Behavioral rules, content policies, operational limits |
| `memory-schema.yaml` | Declaration of what the agent should remember across sessions |
| `README.md` | Human-readable documentation (ignored by parsers) |

## 3. manifest.yaml — Complete schema

```yaml
# ============================================================
# .fylle manifest — version 0.1.0
# ============================================================

fylle_format: "0.1.0"          # REQUIRED — format version (semver)

agent:
  # ── IDENTITY (required) ──────────────────────────────────
  name: "string"               # REQUIRED — display name, max 100 chars
  version: "string"            # REQUIRED — agent version, semver (e.g. "1.0.0")
  description: "string"        # REQUIRED — one-line description, max 500 chars
  role: "string"               # OPTIONAL — agent's role/persona (e.g. "Research Specialist")

  # ── AUTHORSHIP (required) ────────────────────────────────
  author:
    name: "string"             # REQUIRED — author or organization name
    url: "string"              # OPTIONAL — website URL
    email: "string"            # OPTIONAL — contact email
  license: "string"            # REQUIRED — SPDX identifier (e.g. "MIT", "Apache-2.0")

  # ── MODEL REQUIREMENTS (required) ───────────────────────
  model:
    preferred: "string"        # REQUIRED — preferred model ID (e.g. "claude-sonnet-4-5")
    minimum_capability:        # OPTIONAL — list of required capabilities
      - "tool-use"             #   Can use tools/function calling
      - "long-context"         #   Needs >32K context window
      - "vision"               #   Can process images
      - "code-execution"       #   Can execute code
    settings:                  # OPTIONAL — default model settings
      temperature: 0.7         #   Sampling temperature (0.0–2.0)
      max_tokens: 4000         #   Max tokens per response

  # ── SYSTEM PROMPT (required) ─────────────────────────────
  prompt_file: "agent.md"      # REQUIRED — path to system prompt file
  tone: "string"               # OPTIONAL — comma-separated tone descriptors
  language:                    # OPTIONAL — supported languages (ISO 639-1)
    - "en"
    - "it"

  # ── INPUTS (optional but recommended) ────────────────────
  # Declares what the agent expects to receive from the runtime.
  # This enables composability: runtimes know what to inject.
  inputs:
    - name: "string"           # Input identifier (snake_case)
      type: "string"           # One of: "text", "json", "file", "image"
      required: true           # Whether the agent needs this to function
      description: "string"    # Human-readable description of this input

  # ── OUTPUT (optional) ────────────────────────────────────
  output:
    format: "string"           # Expected output format:
                               #   "markdown", "json", "text", "html",
                               #   "structured_report", "free"

  # ── TOOLS (optional) ────────────────────────────────────
  # Declares external tools/services the agent needs.
  # The runtime maps these to actual implementations.
  tools:
    required:                  # Agent won't work without these
      - name: "string"        #   Tool identifier (e.g. "web_search")
        protocol: "string"    #   "mcp", "function", "api"
        description: "string" #   Why this tool is needed
        server: "string"      #   OPTIONAL — specific server (e.g. "perplexity")
    optional:                  # Agent works but with reduced capabilities
      - name: "string"
        protocol: "string"
        description: "string"
        server: "string"

  # ── SKILLS (optional) ────────────────────────────────────
  skills:
    - ref: "skills/skill-name.yaml"   # Relative path to skill file

  # ── GUARDRAILS (optional) ────────────────────────────────
  guardrails:
    file: "guardrails.yaml"    # Path to guardrails file
    max_autonomy: "string"     # One of:
                               #   "full" — agent executes without approval
                               #   "draft-only" — agent creates drafts, human publishes
                               #   "human-approval" — agent proposes, human approves each step
    limits:                    # OPTIONAL — inline limits (override guardrails.yaml)
      max_iterations: 50       #   Max tool/action iterations per run
      max_tokens_per_response: 4000

  # ── MEMORY (optional) ───────────────────────────────────
  memory:
    schema_file: "memory-schema.yaml"  # Path to memory schema
    persistence: "host-managed"        # Always "host-managed" — runtime decides storage

  # ── METADATA (optional) ─────────────────────────────────
  tags:                        # Searchable tags
    - "marketing"
    - "content"
  category: "string"           # Primary category
  homepage: "string"           # URL to project page
  repository: "string"         # URL to source code

  # ── RUNTIME EXTENSIONS (optional) ───────────────────────
  # Any runtime can add its own configuration block here.
  # Unknown extensions are ignored by other runtimes (graceful degradation).
  extensions:
    fylle:                     # Fylle-specific extensions
      original_agent_name: "string"    # Agent name in Fylle pack
      original_pack_id: "string"       # Pack ID in Fylle platform
      feedback_loop:
        enabled: true
        metrics:
          - "content_engagement"
          - "approval_rate"
          - "revision_count"
      context_sources:
        - type: "brand"
        - type: "audience"
        - type: "compliance"
    # Other runtimes can add their own:
    # langchain:
    #   agent_type: "react"
    # crewai:
    #   allow_delegation: true
```

## 4. agent.md — System prompt

The `agent.md` file contains the agent's complete behavioral instructions in Markdown format. This is the "brain" of the agent — the system prompt that defines how it thinks, responds, and acts.

### Guidelines

- Write in the imperative: "You are a...", "Your goal is...", "When asked to..."
- Use Markdown headers to organize sections
- Include examples where helpful
- Reference inputs by name: "Use the `brand_context` input to..."
- Reference skills: "When the user asks to write content, use the Content Writing skill"
- Keep it focused — one agent, one clear purpose

### Example

```markdown
# Content Curator

You are a content curation specialist. Your job is to find, evaluate,
and organize relevant content for marketing newsletters.

## Your approach

1. Analyze the `topic` input to understand what to research
2. Use web search to find current, relevant sources
3. If `brand_context` is provided, align findings with brand voice
4. Synthesize findings into a structured, actionable brief

## Output format

Always structure your output as:
- **Key findings** (3-5 bullet points)
- **Recommended sources** (with links)
- **Suggested angles** for content creation

## Rules

- Never fabricate sources or statistics
- Prefer recent content (last 30 days)
- Always cite your sources
```

## 5. skills/skill-name.yaml — Skill schema

Skills are modular capabilities that an agent can perform. Each skill is a YAML file in the `skills/` directory.

```yaml
skill:
  # ── IDENTITY (required) ──────────────────────────────────
  name: "string"               # Display name
  version: "string"            # Semver
  description: "string"        # What this skill does (multiline OK)

  # ── TRIGGERS (optional) ──────────────────────────────────
  triggers:                    # Natural language phrases that activate this skill
    - "write content"
    - "create a post"
    - "draft an article"

  # ── INSTRUCTIONS (required) ──────────────────────────────
  instructions: |              # Detailed instructions for the LLM
    When asked to create content:
    1. Check brand_guidelines in memory
    2. Identify target platform and audience
    3. Draft content matching brand tone
    4. Include required disclaimers

  # ── TOOLS USED (optional) ────────────────────────────────
  tools_used:                  # Which tools this skill needs
    - "web_search"
    - "save_notes"

  # ── OUTPUT (optional) ───────────────────────────────────
  output_format: "string"      # Expected output: "markdown", "json", "text", "free"

  # ── INPUT SCHEMA (optional) ─────────────────────────────
  # For structured invocation — declares expected parameters
  input_schema:
    type: "object"
    properties:
      topic:
        type: "string"
        description: "Content topic"
      platform:
        type: "string"
        enum: ["linkedin", "twitter", "blog", "newsletter"]
        description: "Target platform"
    required: ["topic"]
```

## 6. guardrails.yaml — Rules and constraints

```yaml
guardrails:
  # ── BEHAVIORAL RULES ─────────────────────────────────────
  rules:
    - id: "string"            # Rule identifier (kebab-case)
      description: "string"   # What this rule enforces
      severity: "string"      # One of:
                               #   "block" — hard stop, prevent action
                               #   "warn" — flag for review
                               #   "log" — track silently
      condition: "string"     # Natural language condition description

  # ── CONTENT POLICIES ─────────────────────────────────────
  content_policies:
    prohibited_topics: []      # Topics the agent must never discuss
    required_disclaimers: []   # Disclaimers to always include
    tone_boundaries: "string"  # What tone is NOT acceptable

  # ── OPERATIONAL LIMITS ───────────────────────────────────
  limits:
    max_tokens_per_response: 4000
    max_iterations: 50
    require_human_review: false    # Override: always require review
```

## 7. memory-schema.yaml — Memory declaration

Declares what the agent wants to remember. The runtime decides HOW to store it.

```yaml
memory:
  entities:
    - name: "string"           # Entity identifier (snake_case)
      type: "string"           # One of:
                               #   "document" — static reference material
                               #   "feed" — streaming/updating data
                               #   "log" — append-only history
                               #   "profile" — evolving user/context data
                               #   "index" — searchable knowledge base
      description: "string"   # Human-readable description
      retention: "string"     # One of:
                               #   "permanent"
                               #   "rolling_30_days"
                               #   "rolling_90_days"
                               #   "rolling_1_year"
                               #   "session"
```

How different runtimes interpret memory:

| Runtime | Implementation |
|---|---|
| Fylle | Structured DB with feedback loops and versioning |
| LangChain | Vector store entries or checkpointer state |
| Local runtime | Markdown files in workspace directory |
| Claude Agent SDK | Filesystem-based (CLAUDE.md pattern) |

## 8. Validation rules

A valid `.fylle` package MUST satisfy:

### Required
1. `manifest.yaml` exists and is valid YAML
2. `manifest.yaml` contains `fylle_format` version field
3. `manifest.yaml` contains `agent.name`, `agent.version`, `agent.description`
4. `manifest.yaml` contains `agent.author.name` and `agent.license`
5. `manifest.yaml` contains `agent.model.preferred`
6. `manifest.yaml` contains `agent.prompt_file` pointing to an existing file
7. The file referenced by `agent.prompt_file` exists and is non-empty
8. `agent.version` is valid semver
9. `fylle_format` is valid semver

### Recommended (warnings if missing)
1. At least one input declared
2. Output format specified
3. At least one skill defined

### Security
1. No path traversal in file paths (no `../`)
2. Package size must not exceed 10MB
3. Only allowed file types: `.yaml`, `.yml`, `.md`
4. No executable files
5. SHA-256 hash should be computed for integrity verification

## 9. Versioning

The `fylle_format` field declares which version of this specification the package targets.

- **Patch** (0.1.x): Bug fixes in spec wording, no schema changes
- **Minor** (0.x.0): New optional fields added (backward compatible)
- **Major** (x.0.0): Breaking changes to required fields

Runtimes SHOULD:
- Accept packages with a compatible `fylle_format` version
- Warn on unknown fields (don't reject)
- Reject packages with an incompatible major version

## 10. Extension mechanism

The `extensions` block in the manifest allows any runtime to add its own configuration. Extensions MUST:

1. Be namespaced under a unique key (e.g., `fylle`, `langchain`, `crewai`)
2. Be ignored by runtimes that don't recognize them
3. Never be required for the agent to function at a basic level

```yaml
extensions:
  fylle:
    feedback_loop:
      enabled: true
  langchain:
    agent_type: "react"
    memory_type: "buffer"
  crewai:
    allow_delegation: true
    reasoning: true
```

## 11. MIME type and file association

- **File extension:** `.fylle`
- **MIME type:** `application/vnd.fylle+zip`
- **Magic bytes:** Standard ZIP header (`PK\x03\x04`)

---

## Appendix A: Complete example

See [`examples/content-curator/`](../examples/content-curator/) for a complete, valid `.fylle` package.

## Appendix B: Comparison with existing formats

| Feature | .fylle | ADL | AGENTS.md | OpenAI Assistants |
|---|---|---|---|---|
| Format | ZIP (YAML+MD) | JSON/YAML | Markdown | JSON API |
| Packaging | Yes (single file) | No | No | No (API only) |
| System prompt | Separate .md file | Inline | Inline | Inline |
| Tool declaration | Declarative | Declarative | No | JSON Schema |
| Input/Output schema | Yes | No | No | Partial |
| Skills/capabilities | Yes | No | No | No |
| Guardrails | Yes | Permissions | No | No |
| Memory schema | Yes | No | No | No |
| Extensions | Yes | No | No | Metadata only |
| Human-readable | Yes | Yes | Yes | No |
| Runtime-agnostic | Yes | Yes | Partial | No (OpenAI only) |
