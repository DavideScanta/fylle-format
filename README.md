<p align="center">
  <h1 align="center">.fylle</h1>
  <p align="center"><strong>The portable format for AI agents.</strong></p>
  <p align="center">Package, share, and deploy AI agents anywhere.</p>
</p>

<p align="center">
  <a href="spec/SPECIFICATION.md">Specification</a> &middot;
  <a href="examples/">Examples</a> &middot;
  <a href="sdk/python/">Python SDK</a> &middot;
  <a href="#quickstart">Quickstart</a>
</p>

---

## What is .fylle?

A `.fylle` file is a **portable AI agent package** — a single file that contains everything needed to run an AI agent on any platform.

Think of it as the **Dockerfile for AI agents**: a standard way to define, share, and deploy intelligent agents across different runtimes and frameworks.

```
my-agent.fylle (ZIP archive)
├── manifest.yaml      # Identity, model requirements, inputs/outputs
├── agent.md           # System prompt — the agent's brain
├── skills/            # Modular capabilities (YAML)
├── guardrails.yaml    # Rules, limits, constraints
├── memory-schema.yaml # What the agent remembers
└── README.md          # Human documentation
```

## Why .fylle?

Today, AI agents are **trapped inside frameworks**. An agent built for LangChain can't run on CrewAI. An OpenAI Assistant can't move to Claude. Every platform has its own format, its own lock-in.

`.fylle` solves this:

| Problem | .fylle solution |
|---|---|
| Agents are code, not data | `.fylle` is a **declarative format** — YAML + Markdown, no code |
| Agents are locked to one framework | `.fylle` is **runtime-agnostic** — works on any platform |
| Agents can't be shared | `.fylle` is a **single file** you can upload, download, git-version |
| No standard for agent capabilities | `.fylle` declares **inputs, tools, skills, guardrails** explicitly |
| Agents are black boxes | `.fylle` is **human-readable** — open the ZIP, read the YAML |

## How it works

### 1. An agent declares what it IS (not how to run it)

```yaml
# manifest.yaml
fylle_format: "0.1.0"

agent:
  name: "Content Curator"
  version: "1.0.0"
  description: "Finds and curates relevant content for newsletters"
  role: "Research Specialist"

  model:
    preferred: "claude-sonnet-4-5"
    minimum_capability:
      - "tool-use"
    settings:
      temperature: 0.7

  prompt_file: "agent.md"

  inputs:
    - name: "topic"
      type: "text"
      required: true
      description: "What to research"
    - name: "brand_context"
      type: "text"
      required: false
      description: "Brand voice and guidelines"

  output:
    format: "markdown"

  tools:
    required:
      - name: "web_search"
        protocol: "mcp"
        description: "Search the web for current information"
```

### 2. Any runtime can load it

```python
# Python
from fylle_format import parse_fylle_package

agent = parse_fylle_package("content-curator.fylle")
print(agent.manifest.agent.name)        # "Content Curator"
print(agent.personality)                 # Full system prompt from agent.md
print(agent.manifest.agent.inputs)       # What the agent expects
print(agent.manifest.agent.tools)        # What tools it needs
```

### 3. Each runtime maps it to its own execution model

The `.fylle` format is **declarative** — it says WHAT the agent needs, not HOW to execute it. Each runtime interprets the same `.fylle` file differently:

| Runtime | How it maps .fylle |
|---|---|
| **Fylle** | Native execution with feedback loops and context layer |
| **LangChain** | `create_agent(model=..., system_prompt=agent.md, tools=...)` |
| **CrewAI** | `Agent(role=..., goal=..., backstory=agent.md, tools=...)` |
| **OpenAI** | `POST /v1/assistants { instructions: agent.md, tools: [...] }` |
| **AutoGen** | `AssistantAgent(name=..., system_message=agent.md, tools=...)` |
| **Your framework** | Read the manifest, use what you need, ignore the rest |

## Two formats, two levels

| | `.fylle` | `.fyllepack` |
|---|---|---|
| **What** | A single AI agent | A multi-agent workflow |
| **Analogy** | A Docker image | A Docker Compose file |
| **Contains** | manifest + prompt + skills | manifest + pipeline + N × .fylle agents |
| **Portable?** | Yes — any runtime | Yes — any orchestrator |
| **Use case** | "I need a content curator" | "I need a full newsletter production pipeline" |

```
newsletter-creator.fyllepack
├── manifest.yaml                  # Pipeline: curator → writer → reviewer
├── agents/
│   ├── curator.fylle              # Independent, portable agent
│   ├── writer.fylle               # Can be swapped with a different writer
│   └── reviewer.fylle             # Can be used standalone in LangChain
├── brief_schema.yaml              # Questions before execution
└── README.md
```

Each `.fylle` agent inside a `.fyllepack` is **independently valid** — you can extract it and use it alone on any platform.

## Key design principles

1. **Declarative, not imperative** — describes what the agent IS, not how to run it
2. **Human-readable** — YAML and Markdown, inspectable without tools
3. **Graceful degradation** — unknown fields are ignored, not rejected
4. **Inputs/outputs are first-class** — agents declare what they expect and produce
5. **Extensions are welcome** — any runtime can add its own block under `extensions:`
6. **Security by default** — guardrails, autonomy limits, and validation built in

## Quickstart

### Install the Python SDK

```bash
pip install fylle-format
```

### Parse a .fylle package

```python
from fylle_format import parse_fylle_package, validate

agent = parse_fylle_package("my-agent.fylle")

# Validate
result = validate(agent)
print(result.valid)      # True
print(result.warnings)   # ["Optional: memory-schema.yaml not found"]

# Inspect
print(agent.manifest.agent.name)
print(agent.manifest.agent.inputs)
print(agent.personality)  # Full system prompt
```

### Create a .fylle package

```python
from fylle_format import create_fylle_from_scratch, build_fylle_package

agent = create_fylle_from_scratch(
    name="My Agent",
    description="Does amazing things",
    personality="You are a helpful assistant specialized in...",
    version="1.0.0",
    author_name="Your Name",
)

build_fylle_package(agent, "my-agent.fylle")
```

### Validate with CLI

```bash
fylle validate my-agent.fylle
# ✓ Manifest valid
# ✓ agent.md found (2.3 KB)
# ✓ 2 skills found
# ⚠ Optional: memory-schema.yaml not found
# ✓ Package valid

fylle inspect my-agent.fylle
# Agent: My Agent v1.0.0
# Author: Your Name
# Model: claude-sonnet-4-5 (requires: tool-use)
# Inputs: topic (required), brand_context (optional)
# Tools: web_search (mcp, required)
# Skills: research, analysis
# Guardrails: draft-only, 3 rules
```

## Specification

The complete format specification is in [`spec/SPECIFICATION.md`](spec/SPECIFICATION.md).

## Examples

### Single agents (.fylle)
- [`examples/content-curator/`](examples/content-curator/) — A research agent that finds and curates content
- [`examples/compliance-checker/`](examples/compliance-checker/) — A compliance review agent with strict guardrails

### Workflow packs (.fyllepack)
- [`examples/newsletter-pack/`](examples/newsletter-pack/) — A 3-agent pipeline: research → write → review

## Project structure

```
fylle-format/
├── spec/
│   └── SPECIFICATION.md          # Complete format specification
├── examples/
│   ├── content-curator/          # Example: single agent (.fylle)
│   ├── compliance-checker/       # Example: single agent with guardrails (.fylle)
│   └── newsletter-pack/          # Example: multi-agent workflow (.fyllepack)
├── sdk/
│   └── python/                   # Python SDK (parse, validate, build)
│       └── fylle_format/
├── cli/                          # CLI tool (planned)
├── LICENSE                       # Apache 2.0
└── CONTRIBUTING.md
```

## Relationship to other standards

`.fylle` is complementary to existing standards:

| Standard | Layer | Relationship to .fylle |
|---|---|---|
| **MCP** (Anthropic) | Tool access | `.fylle` declares which MCP servers an agent needs |
| **A2A** (Google) | Agent communication | `.fylle` agents can be A2A participants |
| **ADL** (Next Moca) | Agent schema | `.fylle` is a superset — adds packaging, skills, I/O |
| **AGENTS.md** (OpenAI) | Project config | `.fylle` is structured and machine-readable |

## Status

> **Early development** — the format is evolving. Feedback and contributions welcome.

- [x] Format specification v0.1.0 (.fylle + .fyllepack)
- [x] Python SDK (parse, validate, build)
- [ ] .fyllepack SDK support (parse, validate, build packs)
- [ ] CLI tool (`fylle validate`, `fylle pack`, `fylle inspect`)
- [ ] LangChain adapter
- [ ] CrewAI adapter
- [ ] npm SDK
- [ ] Fylle Hub (marketplace)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

Apache 2.0 — see [LICENSE](LICENSE) for details.

---

<p align="center">
  Built by <a href="https://www.fylle.ai">Fylle</a> — AI-powered marketing automation.
</p>
