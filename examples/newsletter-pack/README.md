# Newsletter Creator Pack

A 3-agent pipeline that produces complete newsletters: research, write, and review.

## Pipeline

```
curator → writer → reviewer
```

1. **Curator** — researches the topic, finds relevant sources and trends
2. **Writer** — creates newsletter copy based on curator's research
3. **Reviewer** — checks content for compliance and brand alignment

## How to use

Each agent inside `agents/` is a complete `.fylle` package. You can:

- **Run the full pipeline** with any .fyllepack-compatible runtime
- **Extract a single agent** (e.g., `agents/curator.fylle`) and use it standalone
- **Swap an agent** — replace `writer.fylle` with your own custom writer

## Brief questions

Before execution, the user answers:

| Question | Type | Required |
|---|---|---|
| Main topic | Text | Yes |
| Target audience | Select | Yes |
| Tone | Select | No (default: Professional) |
| Length | Select | No (default: Medium) |

## Agents

| Agent | Tools | Output |
|---|---|---|
| `curator.fylle` | web_search (required) | Markdown research brief |
| `writer.fylle` | None | Markdown newsletter |
| `reviewer.fylle` | None | JSON compliance report |
